import * as THREE from "three";
import { getState } from "../scene/state.js";

const state = getState();

const dummyCamState = state.dummyCamState;



export const dummyCam = new THREE.PerspectiveCamera(
    dummyCamState.fov,
    dummyCamState.aspect,
    dummyCamState.near,
    dummyCamState.far,
);

export const reset = (defaultCfg) => {
    Object.keys(defaultCfg).forEach((key) => {
        dummyCamState[key] = defaultCfg[key];
    });
};

export const update = () => {
    dummyCam.position.set(dummyCamState.x, dummyCamState.y, dummyCamState.z);
    dummyCam.up.set(dummyCamState.upX, dummyCamState.upY, dummyCamState.upZ);
    dummyCam.lookAt(dummyCamState.eyeX, dummyCamState.eyeY, dummyCamState.eyeZ);

    dummyCam.fov = dummyCamState.fov;
    dummyCam.aspect = dummyCamState.aspect;
    dummyCam.near = dummyCamState.near;
    dummyCam.far = dummyCamState.far;

    dummyCam.updateProjectionMatrix();
    dummyCam.updateMatrixWorld();
};
