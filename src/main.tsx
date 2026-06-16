import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { RenderOnly } from "./render/RenderOnly";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing root element");
}

const renderJob = window.__AR_RENDER_JOB__;

createRoot(rootElement).render(
  <StrictMode>
    {renderJob ? <RenderOnly job={renderJob} /> : <App />}
  </StrictMode>,
);
