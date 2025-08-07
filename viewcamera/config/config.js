/**
 * Initial Configurations.
 */

export const LAYERS = {
    teapot: 1,
};

export const CONFIG = {
    worldCamera: {
        x: 26,
        y: 24,
        z: -16,
        fov: 75,
        near: 0.1,
        far: 1000,
    },

    teapot: {
        x: 0,
        y: 16,
        z: 0,
        size: 3.5,
        segments: 4,
        rotate: false,
    },

    perspective: {
        near: 10,
        far: 20,
        fov: 40,
        aspect: 800 / 600,
        x: 0,
        y: 25,
        z: 15,
        eyeX: 0,
        eyeY: 15,
        eyeZ: 0,
        upX: 0,
        upY: 1,
        upZ: 0,
    },
};
