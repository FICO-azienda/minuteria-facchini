import next from "eslint-config-next";

const config = [
  ...next,
  { ignores: [".next/**", "out/**", "assets-source/**", "node_modules/**"] },
];

export default config;
