import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "./../main";
import gsap from "gsap";

const textureLoader = new THREE.TextureLoader();

// Floor
export const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(2000, 2000, 100, 100),
  new THREE.MeshStandardMaterial({})
);

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;

// Laundry
const crackersColorTexture = textureLoader.load("/textures/crackers.png");

export const crackers = new THREE.Mesh(
  new THREE.PlaneGeometry(17, 17, 1, 1),
  new THREE.MeshStandardMaterial({
    map: crackersColorTexture,
    transparent: true,
  })
);

crackers.castShadow = true;
crackers.rotation.y = Math.PI * 1;
crackers.position.set(0, 13, 0);
crackers.scale.set(0.07, 0.1, 0.07);

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
  const obj = new GLTFLoader();
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
