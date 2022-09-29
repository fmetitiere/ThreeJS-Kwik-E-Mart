import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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

