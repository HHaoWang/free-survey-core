// rollup.config.js
import { dts } from "rollup-plugin-dts";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import removeUlidDefaultFactoryUsing from "./src/scripts/rollup-plugin-remove-ulid-default-factory-using.js";
export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve({ browser: true }),
      typescript({ tsconfigOverride: { compilerOptions: { declaration: false, declarationMap: false } } }),
      removeUlidDefaultFactoryUsing(),
    ],
  },
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [dts()],
  },
];
