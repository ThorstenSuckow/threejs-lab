import { TeapotGeometry } from "three/examples/jsm/geometries/TeapotGeometry";
import * as THREE from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { getState } from "../scene/state.js";

const teapotGeometry = new TeapotGeometry(2, 2);
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
});

const teapot = new THREE.Mesh(teapotGeometry, material);

const state = getState();
const teapotState = state.teapotState;

let teapotTransformControls;

const makeTransformControls = (camera, renderer) => {
    if (teapotTransformControls) {
        throw "teapotTransformControls already initialized";
    }
    teapotTransformControls = new TransformControls(
        camera,
        renderer.domElement,
    );

    teapotTransformControls.attach(teapot);
    teapotTransformControls.setMode("rotate");
    teapotTransformControls.setSize(1.5);

    return teapotTransformControls;
};

const update = () => {
    teapot.position.set(teapotState.x, teapotState.y, teapotState.z);

    teapot.geometry.dispose();

    teapot.geometry = new TeapotGeometry(
        teapotState.size,
        teapotState.segments,
    );

    teapotTransformControls.getHelper().visible = teapotState.rotate;
    teapotTransformControls.enabled = teapotState.rotate;
};

const reset = (teapotCfg) => {
    Object.keys(teapotCfg).forEach((key) => {
        teapotState[key] = teapotCfg[key];
    });
    if (!teapotState.rotate) {
        teapot.quaternion.identity();
    }
};

export { teapot, makeTransformControls, update, reset };
