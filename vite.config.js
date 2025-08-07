import { defineConfig } from "vite";

export default defineConfig({
    base: "./",
    root: "viewcamera",
    build: {
        outDir: "build",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: "viewcamera/index.html"
            }
        }
    }
});
