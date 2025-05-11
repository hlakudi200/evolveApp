// types/global.d.ts or any file loaded globally

import type { MessageInstance } from "antd/es/message/interface";

declare global {
  // Ant Design message API instance (for global use)
  var messageApiAntd: MessageInstance | undefined;

  // Google Maps types
  interface Window {
    google: typeof google;
  }
}

export {}; // Ensures this file is treated as a module
