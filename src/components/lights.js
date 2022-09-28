import * as THREE from "three";
import * as dat from "dat.gui";

let lightColor = "#b9d5ff";

// Debug
const gui = new dat.GUI();

// Lights

const lights = gui.addFolder("Lights");

// Ambient light
export const ambientLight = new THREE.AmbientLight(lightColor, 0.5);
lights.add(ambientLight, "intensity").min(0).max(1).step(0.001);

// Directional light
export const directionalLight = new THREE.DirectionalLight(lightColor, 0.5);
directionalLight.position.set(4, 5, -2);
lights.add(directionalLight, "intensity").min(0).max(1).step(0.001);
lights.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
lights.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
lights.add(directionalLight.position, "z").min(-5).max(5).step(0.001);


export const spotLight = new THREE.SpotLight("#fff", 5, 50, 22);
spotLight.position.set(-17, 26, -6);

export const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
light.position.set(0.5, 1, 0.75);