import * as THREE from "three";

let lightColor = "#b9d5ff";

// Debug

// Lights


// Ambient light
export const ambientLight = new THREE.AmbientLight(lightColor, 0.5);

// Directional light
export const directionalLight = new THREE.DirectionalLight(lightColor, 0.5);
directionalLight.position.set(4, 5, -2);



export const spotLight = new THREE.SpotLight("#fff", 5, 50, 22);
spotLight.position.set(-17, 26, -6);

export const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
light.position.set(0.5, 1, 0.75);