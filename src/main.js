import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";

import {
  ambientLight,
  light,
  directionalLight,
  spotLight,
  spotLight2,
} from "./components/lights";
import {
  floor,
  crackers,
  addShelfProducts,
  Loader3D,
} from "./components/objects";
import { sizes, camera, camera2, cameraAnim } from "./components/camera";
import { controls, controls2 } from "./components/controls";
import { overlay } from "./components/loader";
import { loadingManager } from "./components/loader";

// Scene
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.Fog(0x87ceeb, 0, 750);

//Objects
scene.add(floor);
scene.add(crackers);

/**
 * Lights
 */
scene.add(ambientLight);
scene.add(directionalLight);
scene.add(spotLight);
scene.add(spotLight2);
scene.add(light);

/**
 * Camera
 */

export let scene2 = false;

if (scene2) {
  scene.add(camera2);
  scene.remove(camera);
} else {
  scene.add(camera);
  scene.remove(camera2);
}

//Loader

let isLoading = true;

// Shelf Products

addShelfProducts("crack", "/textures/Sharp-Os.png", 13.7, 8.5, Math.PI / 1, 5);
addShelfProducts("crack", "/textures/Sharp-Os.png", 12.7, 8.5, Math.PI / 1, 6);
addShelfProducts("crack", "/textures/Sharp-Os.png", 11.7, 8.5, Math.PI / 1, 6);
addShelfProducts("crack", "/textures/Sharp-Os.png", 10.7, 8.5, Math.PI / 1, 6);
addShelfProducts("crack", "/textures/Sharp-Os.png", 13.7, 9.5, Math.PI / 11, 6);
addShelfProducts("crack", "/textures/Sharp-Os.png", 12.7, 9.5, Math.PI / 11, 6);
addShelfProducts("crack", "/textures/Sharp-Os.png", 11.7, 9.5, Math.PI / 11, 6);
addShelfProducts("crack", "/textures/Sharp-Os.png", 10.7, 9.5, Math.PI / 11, 6);

addShelfProducts("crack", "/textures/Sharp-Os.png", 13.7, 2, Math.PI / 1, 6);
addShelfProducts("crack", "/textures/Sharp-Os.png", 12.7, 2, Math.PI / 1, 6);
addShelfProducts("crack", "/textures/Sharp-Os.png", 11.7, 2, Math.PI / 1, 6);
addShelfProducts("crack", "/textures/Sharp-Os.png", 10.7, 2, Math.PI / 1, 6);

addShelfProducts("crack", "/textures/Sharp-Os.png", 13.7, 3.5, Math.PI / 11, 6);
addShelfProducts("crack", "/textures/Sharp-Os.png", 12.7, 3.5, Math.PI / 11, 6);
addShelfProducts("crack", "/textures/Sharp-Os.png", 11.7, 3.5, Math.PI / 11, 6);
addShelfProducts("crack", "/textures/Sharp-Os.png", 10.7, 3.5, Math.PI / 11, 6);

// Controls

let isCameraTravelling = false;
let isCameraTravelling2 = false;
let step1 = false;
let step2 = false;

function cameraSceneAnimation() {
  if (isCameraTravelling === true) {
    return false;
  }
  isCameraTravelling = true;
  setTimeout(function () {
    isCameraTravelling = false;
  }, 8000);

  if (!step1) {
    cameraAnim(camera.position, 2, 0, 15, 15, 7, "none");

    setTimeout(() => {
      step1 = true;
      scene2 = true;
    }, 2000);
    if (isCameraTravelling) {
      cameraAnim(camera2.rotation, 2, 2, 0, 0, 0, "none");
      cameraAnim(camera2.position, 2, 2, 5, 17, 23, "none");
      cameraAnim(camera2.position, 2, 4, 5, 17, 15, "none");
      cameraAnim(camera2.position, 2, 6, 5, 17, 0, "none");
      cameraAnim(camera2.position, 2, 6, 0, 17, -8, "none");
      cameraAnim(camera2.rotation, 2, 6, 0, -2.5, 0, "none");
    }
  } else if (step1 && !step2 && scene2) {
    cameraAnim(camera2.position, 2, 0, -1, 16, 10, "none");
    cameraAnim(camera2.position, 4, 2, 3, 15, 4.6, "none");
    cameraAnim(camera2.rotation, 4, 2, 0, -2.5, 0, "none");
    cameraAnim(camera2.position, 4, 4, 6, 12, 4.6, "none");
    cameraAnim(camera2.rotation, 4, 4, 0, -3, 0, "none");

    setTimeout(() => {
      step2 = true;
    }, 2000);
  }
}

const onKeyDown = function (event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      cameraSceneAnimation();
      break;
  }
};

window.addEventListener("click", () => {});

document.addEventListener("keydown", onKeyDown);

const nextBtn = document.getElementById("next-btn");
nextBtn.addEventListener("click", nextStep);

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startScene);

function startScene() {
  cameraSceneAnimation();
}

function nextStep() {
  if (isCameraTravelling2 === true) {
    return false;
  }
  isCameraTravelling2 = true;
  setTimeout(function () {
    isCameraTravelling2 = false;
  }, 8000);
  if (step1 && !step2 && scene2 && !isCameraTravelling && isCameraTravelling2) {
    cameraAnim(camera2.position, 2, 0, -1, 16, 10, "none");
    cameraAnim(camera2.position, 4, 2, 3, 15, 4.6, "none");
    cameraAnim(camera2.rotation, 4, 2, 0, -2.5, 0, "none");
    cameraAnim(camera2.position, 4, 4, 6, 12, 4.6, "none");
    cameraAnim(camera2.rotation, 4, 4, 0, -3, 0, "none");

    setTimeout(() => {
      step2 = true;
    }, 2000);
  }
}

// Market

let apuMixer = null;
let bartMixer = null;
let mixer = null;

const bart = new GLTFLoader(loadingManager);

bart.load("/models/bart/model.gltf", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.scale.set(3, 3, 3);
  gltf.scene.position.set(19, 22.5, 5);
  gltf.scene.rotation.set(0, Math.PI * 0.5, 0);
  gltf.scene.castShadow = true;

  bartMixer = new THREE.AnimationMixer(gltf.scene);
  const action = bartMixer.clipAction(gltf.animations[0]);
  action.play();
});

const apu = new GLTFLoader(loadingManager);

apu.load("/models/apu/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.scale.set(3, 3, 3);
  gltf.scene.position.set(13, 10, -5);
  gltf.scene.rotation.set(0, Math.PI * 0, 0);
  gltf.scene.castShadow = true;

  apuMixer = new THREE.AnimationMixer(gltf.scene);
  const action = apuMixer.clipAction(gltf.animations[0]);
  action.play();
});

const market = new GLTFLoader(loadingManager);

market.load("/models/kwik-e-model/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.scale.set(3, 3, 3);
  gltf.scene.position.set(10, 10, 5);
  gltf.scene.rotation.set(0, Math.PI * 0.5, 0);
  gltf.scene.receiveShadow = true;

  mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[0]);
  action.play();
});

Loader3D(
  "springfield",
  "/models/mapa_springfield/scene.gltf",
  4,
  10,
  10,
  -20,
  0
);

Loader3D("rack-1", "/models/market_racks/model.gltf", 0.5, 7, 10, 15, 0);
Loader3D("rack-2", "/models/market_racks/model-empty-1.gltf", 0.5, 7, 10, 8, 0);
Loader3D("rack-3", "/models/market_racks/model-empty-1.gltf", 0.5, 7, 10, 2, 0);

Loader3D("desktop", "/models/desktop.gltf", 0.45, 12, 10, -5, 0);
Loader3D(
  "door-1",
  "/models/doors/model.gltf",
  3,
  18,
  10,
  5,
  Math.PI * 0.5,
  true,
  2,
  3,
  18,
  10,
  2
);
Loader3D(
  "door-2",
  "/models/doors/model.gltf",
  3,
  18,
  10,
  7.9,
  Math.PI * 0.5,
  true,
  2,
  3,
  18,
  10,
  10.5
);

//

/**
 * Mouse Events
 */
const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

/**
 * Object Interaction
 */

window.addEventListener("click", () => {
  var elem = document.getElementById("ratzModal");

  if (currentIntersect) {
    if (currentIntersect.object === crackers) {
      elem.style.display = "block";
      document.getElementById("autoplay").play();
    } else {
    }
  }
});

/**
 * Animate
 */

const raycaster = new THREE.Raycaster();

const clock = new THREE.Clock();
let currentIntersect = null;

let previousTime = 0;

const tick = () => {
  if (isLoading) {
    scene.add(overlay);
    setTimeout(() => {
      isLoading = false;
    }, 2000);
  } else {
    scene.remove(overlay);
  }

  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  if (mixer !== null) {
    mixer.update(deltaTime);
  }
  if (apuMixer !== null) {
    apuMixer.update(deltaTime);
  }

  if (bartMixer !== null) {
    bartMixer.update(deltaTime);
  }
  // Update Orbital Controls

  if (scene2 && !isCameraTravelling) {
    nextBtn.style.display = "block";

    controls2.update(0);
    controls.unlock();
  } else {
    nextBtn.style.display = "none";
  }
  // Cast a ray
  const rayDirection = new THREE.Vector3(100, 0, 0);
  rayDirection.normalize();

  if (scene2) {
    raycaster.setFromCamera(mouse, camera2);
    startBtn.style.display = "none";
  } else {
    raycaster.setFromCamera(mouse, camera);
  }

  const objectsToTest = [crackers];
  const intersects = raycaster.intersectObjects(objectsToTest);

  if (intersects.length) {
    if (!currentIntersect) {
      crackers.material.color.set("#b35f45");
      gsap.to(crackers.position, {
        duration: 2,
        delay: 0,
        x: 9.3,
        y: 13.9,
        z: 8.4,
      });
      console.log("mouse enter");
    }

    currentIntersect = intersects[0];
  } else {
    if (currentIntersect) {
      crackers.material.color.set("#fff");
      gsap.to(crackers.position, {
        duration: 2,
        delay: 0,
        x: 9.3,
        y: 13.7,
        z: 8.4,
      });
      console.log("mouse leave");
    }

    currentIntersect = null;
  }
  // Render

  if (scene2) {
    renderer.render(scene, camera2);
  } else {
    renderer.render(scene, camera);
  }

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
