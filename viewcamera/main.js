import { initScene, resetScene, animate } from "./scene/sceneSetup.js";
import { makeGui } from "./scene/guiSetup.js";

const main = () => {
    initScene(document.getElementById("three-container"));
    resetScene();
    makeGui();
    animate();
};

main();
