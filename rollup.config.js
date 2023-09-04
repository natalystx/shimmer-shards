import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import generatePackageJson from "rollup-plugin-generate-package-json";

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        exports: "named",
        sourcemap: true,
      },
      {
        file: "dist/index.es.js",
        format: "esm",
        exports: "named",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
      }),
      commonjs({
        include: ["node_modules/**"],
      }),
      resolve(),
      terser(),
      external(["react", "react-dom"]),
      generatePackageJson({
        outputFolder: "dist",
        baseContents: (pkg) => ({
          name: pkg.name,
          main: pkg.main.replace("dist/", ""),
          module: pkg.module.replace("dist/", ""),
          dependencies: {
            uuid: "^9.0.0",
          },
        }),
      }),
    ],
  },
];
