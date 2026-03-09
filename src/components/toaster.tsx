"use client";

import { GooeyToaster } from "goey-toast";
import "goey-toast/styles.css";

export function Toaster() {
  return <GooeyToaster position="top-center" preset="bouncy" theme="light" />;
}
