import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "./../main";
import { loadingManager } from "./loader";
import gsap from "gsap";

const textureLoader = new THREE.TextureLoader(loadingManager);

// Floor
export const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(2000, 2000, 100, 100),
  new THREE.MeshStandardMaterial({
    color: "black",
    roughness: 0.9,
    metalness: 0.5,
  })
);

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;

// Laundry
const crackersColorTexture = textureLoader.load("/textures/Sharp-Os.png");

export const crackers = new THREE.Mesh(
  new THREE.PlaneGeometry(17, 17, 1, 1),
  new THREE.MeshStandardMaterial({
    map: crackersColorTexture,
    transparent: true,
  })
);

crackers.castShadow = true;
crackers.rotation.y = Math.PI * 1;
crackers.scale.set(0.04, 0.05, 0.04);

crackers.material.roughness = 0.1;
crackers.material.metalness = 0.2;

// 3D Objects

export function Loader3D(
  name,
  url,
  scale,
  positionX,
  positionY,
  positionZ,
  rotationY,
  hasAnimation,
  duration,
  delay,
  animX,
  animY,
  animZ
) {
  const obj = new GLTFLoader(loadingManager);
  name = obj;

  scale = scale;
  positionX = positionX;
  positionY = positionY;
  positionZ = positionZ;
  rotationY = rotationY;

  duration = duration;
  delay = delay;
  animX = animX;
  animY = animY;
  animZ = animZ;

  return name.load(url, (gltf) => {
    console.log(gltf);
    scene.add(gltf.scene);
    gltf.scene.scale.set(scale, scale, scale);
    gltf.scene.position.set(positionX, positionY, positionZ);
    gltf.scene.rotation.set(0, rotationY, 0);
    gltf.scene.castShadow = true;
    if (hasAnimation) {
      gsap.to(gltf.scene.position, {
        duration: duration,
        delay: delay,
        x: animX,
        y: animY,
        z: animZ,
      });
    }
  });
}
