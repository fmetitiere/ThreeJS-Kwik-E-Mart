import "./style.css";
import * as THREE from "three";
import { floor } from "./components/objects";
import {
  ambientLight,
  light,
  directionalLight,
  spotLight,
} from "./components/lights";
import { sizes, camera, camera2 } from "./components/camera";
import { controls, controls2 } from "./components/controls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { overlay } from "./components/loader";
import { loadingManager } from "./components/loader";

import { crackers, Loader3D } from "./components/objects";
import gsap from "gsap";

import * as dat from "dat.gui";




// Scene
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.Fog(0x87ceeb, 0, 750);

//Objects
scene.add(floor);
scene.add(crackers);

//Loader

scene.add(overlay)

const textureLoader = new THREE.TextureLoader(loadingManager);
const crowdColorTexture = textureLoader.load("/textures/crackers.png");

for (let i = 0; i < 5; i++) {
  const crowd = new THREE.Mesh(
    new THREE.PlaneGeometry(17, 17, 1, 1),
    new THREE.MeshStandardMaterial({
      map: crowdColorTexture,
      transparent: true,
    })
  );

  const x = i * 20 - 30;

  crowd.castShadow = true;
  crowd.rotation.y = Math.PI * 0.5;
  crowd.position.set(x, -5, 0);

  crowd.material.roughness = 0.6;
  crowd.material.metalness = 0.2;

  //scene.add(crowd);
}

/**
 * Lights
 */
scene.add(ambientLight);
scene.add(directionalLight);
scene.add(spotLight);
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

// Controls

let moveDoors = false;
let isCameraTravelling = false;
let step1 = false;
let step2 = false;
let step3 = false;

const onKeyDown = function (event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      console.log(moveDoors);
      isCameraTravelling = true;
      if (!step1) {
        gsap.to(camera.position, {
          duration: 2,
          delay: 0,
          x: 15,
          y: 15,
          z: 7,
          ease: "none",
        });

        setTimeout(() => {
          step1 = true;
          scene2 = true;
          moveDoors = true;
        }, 2000);
        gsap.to(camera2.position, {
          duration: 2,
          delay: 2,
          x: 15,
          y: 17,
          z: 15,
          ease: "none",
        });
        gsap.to(camera2.rotation, {
          duration: 2,
          delay: 2,
          x: 0,
          y: 0,
          z: 0,
          ease: "none",
        });
        gsap.to(camera2.position, {
          duration: 2,
          delay: 2,
          x: 10,
          y: 17,
          z: 15,
          ease: "none",
        });
        gsap.to(camera2.position, {
          duration: 2,
          delay: 4,
          x: 5,
          y: 17,
          z: 15,
          ease: "none",
        });
        gsap.to(camera2.position, {
          duration: 2,
          delay: 6,
          x: 5,
          y: 17,
          z: 0,
          ease: "none",
        });
        gsap.to(camera2.position, {
          duration: 2,
          delay: 6,
          x: 0,
          y: 15,
          z: -8,
          ease: "none",
        });
        gsap.to(camera2.rotation, {
          duration: 2,
          delay: 6,
          x: 0,
          y: -2.5,
          z: 0,
          ease: "none",
        });
      } else if (step1 && !step2 && scene2) {
        gsap.to(camera2.position, {
          duration: 2,
          delay: 0,
          x: 0,
          y: 15,
          z: -22,
        });

        setTimeout(() => {
          step2 = true;
        }, 2000);
      }

      break;
  }
};

window.addEventListener("click", () => {});

document.addEventListener("keydown", onKeyDown);

const element = document.getElementById("reset-btn");
element.addEventListener("click", myFunction);

function myFunction() {
  scene2 = false;
  step1 = false;
  isCameraTravelling = false;
  camera.position.x = 38;
  camera.position.y = 15;
  camera.position.z = 7;
  camera.rotation.y = Math.PI / 2;
  camera2.position.x = 15;
  camera2.position.y = 15;
  camera2.position.z = 7;
  camera2.rotation.y = Math.PI / 2;
}

// Market

let mixer = null;

const market = new GLTFLoader(loadingManager);

market.load("/models/kwik-e-model/scene.gltf", (gltf) => {
  console.log(gltf);
  scene.add(gltf.scene);
  gltf.scene.scale.set(3, 3, 3);
  gltf.scene.position.set(10, 10, 5);
  gltf.scene.rotation.set(0, Math.PI * 0.5, 0);
  gltf.scene.castShadow = true;

  mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[0]);
  action.play();
});

Loader3D("rack-1", "/models/market_racks/model.gltf", 0.5, 5, 10, 5, 0);
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
document.body.appendChild(renderer.domElement);

/**
 * Object Interaction
 */
console.log(document.fullscreenEnabled);

window.addEventListener("click", () => {
  var elem = document.getElementById("my_div");

  if (currentIntersect) {
    if (currentIntersect.object === crackers) {
      console.log("crackers");
      elem.style.display = "block";

      console.log(document.fullscreenEnabled);
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
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  if (mixer !== null) {
    mixer.update(deltaTime);
  }
  // Update Orbital Controls

  var btnReset = document.getElementById("reset-btn");
  if (scene2) {
    btnReset.style.display = "block";

    controls2.update(0);
    controls.unlock();
  } else {
    btnReset.style.display = "none";
  }
  // Cast a ray
  const rayDirection = new THREE.Vector3(100, 0, 0);
  rayDirection.normalize();

  if (scene2) {
    raycaster.setFromCamera(mouse, camera2);
  } else {
    raycaster.setFromCamera(mouse, camera);
  }

  const objectsToTest = [crackers];
  const intersects = raycaster.intersectObjects(objectsToTest);

  if (intersects.length) {
    if (!currentIntersect) {
      crackers.material.color.set("#b35f45");
      console.log("mouse enter");
    }

    currentIntersect = intersects[0];
  } else {
    if (currentIntersect) {
      crackers.material.color.set("#fff");
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
