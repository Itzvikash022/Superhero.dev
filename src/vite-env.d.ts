/// <reference types="vite/client" />

declare module "*.asset.json" {
  const value: {
    name: string;
    url: string;
  };
  export default value;
}
