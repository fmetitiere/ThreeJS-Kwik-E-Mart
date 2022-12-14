import * as THREE from "three";
import * as dat from "dat.gui";
import gsap from "gsap";

const gui = new dat.GUI();
dat.GUI.toggleHide();

/**
 * Sizes
 */
export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  direction.normalize(); // this ensures consistent movements in all directions

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Base camera
export const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  2000
);
camera.position.x = 38;
camera.position.y = 15;
camera.position.z = 7;
camera.rotation.y = (Math.PI / 2);


export const camera2 = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);
camera2.position.x = 15;
camera2.position.y = 15;
camera2.position.z = 7;
camera2.rotation.y = (Math.PI / 2);


export function cameraAnim(type, duration, delay, x, y, z, ease) {
  return gsap.to(type, {
    duration: duration,
    delay: delay,
    x: x,
    y: y,
    z: z,
    ease: ease,
  });
}