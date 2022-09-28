import { camera } from "./camera";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

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
  blocker.style.display = "block";
  instructions.style.display = "";
});
