// rollup.config.js
import { dts } from "rollup-plugin-dts";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
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
