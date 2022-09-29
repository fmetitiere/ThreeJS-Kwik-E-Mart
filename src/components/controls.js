import { camera, camera2 } from "./camera";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";
import { scene2 } from "../main";

export const controls = new PointerLockControls(camera, document.body);
controls.pointerSpeed = 0.3;
controls.minPolarAngle = 1;
controls.maxPolarAngle = 2;

const blocker = document.getElementById("blocker");
const instructions = document.getElementById("instructions");

instructions.addEventListener("click", function () {
  controls.lock();
});

controls.addEventListener("lock", function () {
  instructions.style.display = "none";
  blocker.style.display = "none";
});

controls.addEventListener("unlock", function () {
  if (!scene2) {
    blocker.style.display = "block";
    instructions.style.display = "";
  } else {
    instructions.style.display = "none";
    blocker.style.display = "none";
  }
});

export const controls2 = new FlyControls(camera2, document.body);
controls2.enableDamping = true;
controls2.movementSpeed = 0.5;
controls2.rollSpeed = 0.05;
controls2.autoForward = false;
controls2.dragToLook = false;
