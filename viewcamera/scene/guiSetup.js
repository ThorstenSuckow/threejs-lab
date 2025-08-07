import GUI from "lil-gui";
import { getState } from "./state.js";
import { updateScene, resetScene } from "./sceneSetup.js";
import { LAYERS as layerCfg } from "../config/config.js";
import { dummyCam } from "../objects/dummyCam.js";

const state = getState();

export const makeGui = (targetContainer) => {
    const gui = new GUI(targetContainer ? {container : targetContainer} : undefined);

    // World Camera
    const worldCameraFolder = gui.addFolder("World Camera");
    worldCameraFolder.add(state.worldCameraState, "x").listen();
    worldCameraFolder.add(state.worldCameraState, "y").listen();
    worldCameraFolder.add(state.worldCameraState, "z").listen();
    worldCameraFolder.close();

    // Dummy Camera
    addFolder(
        gui,
        "lookAt - eye",
        ["eyeX", "eyeY", "eyeZ"],
        state.dummyCamState,
        -100,
        100,
        updateScene,
        false,
    );
    addFolder(
        gui,
        "lookAt - up",
        ["upX", "upY", "upZ"],
        state.dummyCamState,
        -10,
        10,
        updateScene,
        false,
    );

    // Teapot
    const teapotFolder = addFolder(
        gui,
        "Teapot",
        ["x", "y", "z"],
        state.teapotState,
        -100,
        100,
        updateScene,
        false
    );
    teapotFolder.add(state.teapotState, "size", 0, 20).onChange(updateScene).listen();
    teapotFolder.add(state.teapotState, "segments", 0, 20, 1)
        .onChange(updateScene)
        .listen();
    teapotFolder.add(state.teapotState, "rotate").onChange(updateScene).listen();

    // ... perspective
    addFolder(
        gui,
        "Camera Position",
        ["x", "y", "z"],
        state.dummyCamState,
        -100,
        100,
        updateScene,
    );
    addFolder(
        gui,
        "Perspective",
        ["fov", "aspect", "near", "far"],
        state.dummyCamState,
        1,
        50,
        updateScene,
    );

    // 2D Dummy View
    const image2d = gui.addFolder("2D Image");
    const camCont = image2d.domElement.firstChild.nextSibling;
    camCont.style.height = "200px";
    state.dummyRenderer.domElement.style.height = "200px";
    state.dummyRenderer.domElement.style.width = camCont.offsetWidth + "px";
    camCont.appendChild(state.dummyRenderer.domElement);

    dummyCam.layers.disableAll();
    dummyCam.layers.enable(layerCfg.teapot);

    gui.add({ reset: resetScene }, "reset");
};

const addFolder = (gui, name, keys, params, min, max, cb, close = true) => {
    const folder = gui.addFolder(name);
    keys.forEach((k) => folder.add(params, k, min, max).onChange(cb).listen());
    close && folder.close();
    return folder;
};
