import { resolve } from 'path';

const isProduction = process.env.NODE_ENV === "production";
const assets = isProduction ?
      resolve(__dirname, ".") :
      resolve(__dirname, "../../build/dist");

export const paths = { assets };
export const files = { index: resolve(assets, "index.html") };
