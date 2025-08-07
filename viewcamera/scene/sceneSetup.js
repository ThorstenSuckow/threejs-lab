import * as THREE from "three";
import { getState, initCamera, updateWorldCameraState } from "./state.js";
import {
    makeTransformControls as makeTeapotTransformControls,
    update as updateTeapot,
    reset as resetTeapot,
    teapot,
} from "../objects/teapot.js";
import {
    dummyCam,
    update as updateDummyCam,
    reset as resetDummyCam,
} from "../objects/dummyCam.js";
import { CONFIG as defaultCfg, LAYERS as layerCfg } from "../config/config.js";

const  state = getState();


export const initScene = (renderContainer) => {

    state.container = renderContainer;

    const { scene, renderer, container } = state;

    scene.background = new THREE.Color(0x000000);
    initCamera();

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Hilfslinien
    const axesHelper = new THREE.AxesHelper(100);
    axesHelper.position.y = 0.001;
    axesHelper.material.depthTest = false;
    axesHelper.renderOrder = 1;
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(200, 40, 0x888888, 0x444444);
    scene.add(gridHelper);

    // Teapot
    scene.add(teapot);
    teapot.layers.set(layerCfg.teapot);

    // TransformControls für Teapot
    !state.teapotTransformControls && (()=>{state.teapotTransformControls = makeTeapotTransformControls(
        state.camera,
        renderer,
    )})();
    state.teapotTransformControls.addEventListener("dragging-changed", (e) => {
        state.controls.enabled = !e.value;
    });
    scene.add(state.teapotTransformControls.getHelper());

    // DummyCam Helper
    state.camHelper = new THREE.CameraHelper(dummyCam);
    scene.add(state.camHelper);

    // Initial Camera Position
    updateWorldCameraState();

    state.camera.layers.enableAll();

    // Resize Event
    window.addEventListener("resize", onWindowResize);

};

export const updateScene = () => {
    updateDummyCam();
    updateTeapot();

    state.camHelper.update();
};

export const resetScene = () => {
    const worldCamera = defaultCfg.worldCamera;
    const teapotCfg = defaultCfg.teapot;

    resetTeapot(defaultCfg.teapot);
    resetDummyCam(defaultCfg.perspective);

    state.camera.position.set(worldCamera.x, worldCamera.y, -worldCamera.x);
    state.controls.target.set(teapotCfg.x, teapotCfg.y, teapotCfg.z);

    updateScene();
};

export const animate = () => {
    requestAnimationFrame(animate);

    state.controls.update();
    state.camHelper.update();
    state.renderer.render(state.scene, state.camera);
    state.dummyRenderer.render(state.scene, dummyCam);

    updateWorldCameraState();
};


const onWindowResize = () => {
    const { camera, renderer, container } = state;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
};
