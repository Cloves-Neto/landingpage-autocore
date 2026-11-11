/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly URL_CONNECTION_API?: string;
  readonly VITE_URL_CONNECTION_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
