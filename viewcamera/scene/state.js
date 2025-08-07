import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CONFIG as defaultCfg } from "../config/config.js";


let state = null;

export const getState = () => {

    if (!state) {
        state = {
            container: document.getElementById("three-container"),
            scene: new THREE.Scene(),
            renderer: new THREE.WebGLRenderer({ antialias: true }),
            dummyRenderer: new THREE.WebGLRenderer({ antialias: true }),
            camera: null,
            controls: null,
            camHelper: null,
            teapotTransformControls: null,
            worldCameraState: { x: 0, y: 0, z: 0 },
            dummyCamState: {},
            teapotState: {},
        };
    }

    return state;
}


export const initCamera = () => {
    const { container } = state;
    const cfg = defaultCfg.worldCamera;

    state.camera = new THREE.PerspectiveCamera(
        cfg.fov,
        container.clientWidth / container.clientHeight,
        cfg.near,
        cfg.far,
    );
    state.controls = new OrbitControls(state.camera, state.renderer.domElement);
    state.controls.enableDamping = true;
};

export const updateWorldCameraState = () => {
    const { camera, worldCameraState } = state;
    worldCameraState.x = camera.position.x.toFixed(2);
    worldCameraState.y = camera.position.y.toFixed(2);
    worldCameraState.z = camera.position.z.toFixed(2);
};
