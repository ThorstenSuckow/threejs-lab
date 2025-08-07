import React, { useEffect, useRef } from "react";
import { initScene, resetScene, animate } from "../scene/sceneSetup.js";
import {makeGui} from "../scene/guiSetup";

export default function ViewCamera() {
    const mountRef = useRef(null);
    const guiRef = useRef(null);

    useEffect(() => {

        initScene(mountRef.current);
        resetScene();
        makeGui(guiRef.current);
        animate();

        return () => {
            if (mountRef.current && mountRef.current.firstChild) {
                mountRef.current.removeChild(mountRef.current.firstChild);
            }
        };
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <div ref={mountRef} style={{ width: "100%", height: "800px" }} />
            <div
                ref={guiRef}
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0
                }}
            />
        </div>
    );
}