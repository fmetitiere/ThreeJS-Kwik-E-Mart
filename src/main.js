import "./style.css";
import * as THREE from "three";
import { floor } from "./components/objects";
import {
  ambientLight,
  light,
  directionalLight,
  spotLight,
} from "./components/lights";
import { sizes, camera } from "./components/camera";
import { controls } from "./components/controls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { crackers } from "./components/objects";
import gsap from "gsap";

import * as dat from "dat.gui";

// Canvas
const canvas = document.querySelector("canvas.webgl");
const objects = [];

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
scene.add(camera);

// Controls

scene.add(controls.getObject());

let moveDoors = false;
let step1 = false;
let step2 = false;
let step3 = false;

const onKeyDown = function (event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      moveDoors = true;
      console.log(moveDoors);
      if (!step1) {
        gsap.to(camera.position, {
          duration: 2,
          delay: 0,
          x: 15,
          y: 15,
          z: 7,
        });

        setTimeout(() => {
          step1 = true;
        }, 2000);
      } else if (step1 && !step2) {
        gsap.to(camera.position, {
          duration: 2,
          delay: 0,
          x: 0,
          y: 15,
          z: -22,
        });

        setTimeout(() => {
          step2 = true;
        }, 2000);
      } else if (step1 && step2 && !step3) {
        gsap.to(camera.position, {
          duration: 2,
          delay: 0,
          x: -25,
          y: 15,
          z: -22,
        });

        setTimeout(() => {
          step3 = true;
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
      controls.lock();
    }
  }
});

/**
 * Animate
 */

const raycaster = new THREE.Raycaster();

let prevTime = performance.now();
const direction = new THREE.Vector3();
let currentIntersect = null;
raycaster.ray.origin.copy(camera.position);
camera.getWorldDirection(raycaster.ray.direction);
const animate = () => {
  window.requestAnimationFrame(animate);
  const time = performance.now();

  if (controls.isLocked === true) {
    raycaster.setFromCamera(mouse, camera);
    direction.normalize(); // this ensures consistent movements in all directions

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
  }

  // Render
  prevTime = time;
  renderer.render(scene, camera);
};

animate();
