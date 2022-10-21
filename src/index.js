import { createRoot } from "react-dom/client";

import App from "./App";
import { AppContextProvider } from "./context/appContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
