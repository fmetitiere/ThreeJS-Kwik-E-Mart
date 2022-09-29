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

import { crackers } from "./components/objects";
import gsap from "gsap";

import * as dat from "dat.gui";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.Fog(0x87ceeb, 0, 750);

//Objects
scene.add(floor);
scene.add(crackers);

const textureLoader = new THREE.TextureLoader();

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

let scene2 = false;

if (scene2) {
  scene.add(camera2);
  scene.remove(camera);
} else {
  scene.add(camera);
  scene.remove(camera2);
}

// Controls

let moveDoors = false;
let step1 = false;
let step2 = false;
let step3 = false;

const onKeyDown = function (event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      console.log(moveDoors);
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

    /*  case "ArrowLeft":
       case "KeyA":
      moveLeft = true;
      break;

    case "ArrowDown":
    case "KeyS":
      moveBackward = true;
      break;

    case "ArrowRight":
    case "KeyD":
      moveRight = true;
      break;

    case "Space":
      if (canJump === true) velocity.y += 350;
      canJump = false;
      break; */
  }
};
/* 
const onKeyUp = function (event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      moveForward = false;
      break;

    case "ArrowLeft":
    case "KeyA":
      moveLeft = false;
      break;

    case "ArrowDown":
    case "KeyS":
      moveBackward = false;
      break;

    case "ArrowRight":
    case "KeyD":
      moveRight = false;
      break;
  }
}; */

window.addEventListener("click", () => {});

document.addEventListener("keydown", onKeyDown);
/* document.addEventListener("keyup", onKeyUp); */

// Market

const market = new GLTFLoader();

market.load(
  "/models/kwik-e-model/scene.gltf",
  (gltf) => {
    console.log(gltf);
    scene.add(gltf.scene);
    gltf.scene.scale.set(3, 3, 3);
    gltf.scene.position.set(10, 10, 5);
    gltf.scene.rotation.set(0, Math.PI * 0.5, 0);
    gltf.scene.castShadow = true;
  },
  () => {
    console.log("progress");
  },
  () => {
    console.log("error");
  }
);

const racks = new GLTFLoader();

racks.load(
  "/models/market_racks/model.gltf",
  (gltf) => {
    console.log(gltf);
    scene.add(gltf.scene);
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    gltf.scene.position.set(5, 10, 5);
    gltf.scene.rotation.set(0, 0, 0);
    gltf.scene.castShadow = true;
  },
  () => {
    console.log("progress");
  },
  () => {
    console.log("error");
  }
);

const door = new GLTFLoader();

door.load(
  "/models/doors/model.gltf",
  (gltf) => {
    console.log(gltf);
    scene.add(gltf.scene);
    gltf.scene.scale.set(3, 3, 3);
    gltf.scene.position.set(18, 10, 5);
    gltf.scene.rotation.set(0, Math.PI * 0.5, 0);
    gltf.scene.castShadow = true;
    gsap.to(gltf.scene.position, {
      duration: 2,
      delay: 3,
      x: 18,
      y: 10,
      z: 2,
    });
    console.log(moveDoors);
  },
  () => {
    console.log("progress");
  },
  () => {
    console.log("error");
  }
);

const door2 = new GLTFLoader();

door2.load(
  "/models/doors/model.gltf",
  (gltf) => {
    console.log(gltf);
    scene.add(gltf.scene);
    gltf.scene.scale.set(3, 3, 3);
    gltf.scene.position.set(18, 10, 7.9);
    gltf.scene.rotation.set(0, Math.PI * 0.5, 0);
    gltf.scene.castShadow = true;
    gsap.to(gltf.scene.position, {
      duration: 2,
      delay: 3,
      x: 18,
      y: 10,
      z: 10.5,
    });
    console.log(moveDoors);
  },
  () => {
    console.log("progress");
  },
  () => {
    console.log("error");
  }
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

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Orbital Controls
  if (scene2) {
    controls2.update(0);
    controls.unlock();
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
