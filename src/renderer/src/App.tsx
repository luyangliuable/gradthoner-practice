import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlankPage from "./pages/BlankPage";
import AnotherBlankPage from "./pages/AnotherBlankPage";
import ListTeamReposPage from "./pages/ListTeamReposPage";
import FeaturePageLayout from "./components/FeaturePageLayout";
import AddTeamToReposPage from "./pages/AddTeamToReposPage";

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");
  return (
    <HashRouter>
      <div id="container" className="h-screen w-screen flex">
        <Routes>
          <Route index element={<HomePage />} />
          <Route element={<FeaturePageLayout />}>
            <Route path="/blank-page" element={<BlankPage />} />
            <Route path="/another-blank-page" element={<AnotherBlankPage />} />
            <Route path="/list-team-repos" element={<ListTeamReposPage />} />
            <Route path="/add-team-to-repos" element={<AddTeamToReposPage />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
