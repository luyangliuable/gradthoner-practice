import { HashRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlankPage from "./pages/BlankPage";
import AnotherBlankPage from "./pages/AnotherBlankPage";

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");
  return (
    <HashRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/blank-page" element={<BlankPage />} />
        <Route path="/another-blank-page" element={<AnotherBlankPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
