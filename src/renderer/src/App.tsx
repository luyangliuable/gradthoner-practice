import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GithubAccessTokenPage from "./pages/GithubAccessTokenPage";
import AnotherBlankPage from "./pages/AnotherBlankPage";
import ListTeamReposPage from "./pages/ListTeamReposPage";
import FeaturePageLayout from "./components/FeaturePageLayout";
import AddTeamToReposPage from "./pages/AddTeamToReposPage";

import React, { useMemo } from 'react';
import Context from "./store/context";
import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from '@ant-design/icons';

function App(): JSX.Element {
  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  return (
    <Context.Provider value={contextValue}>
      <HashRouter>
        <div id="container" className="h-screen w-screen flex">
          <Routes>
            <Route index element={<HomePage />} />
            <Route element={<FeaturePageLayout />}>
              <Route path="/blank-page" element={<GithubAccessTokenPage />} />
              <Route path="/another-blank-page" element={<AnotherBlankPage />} />
              <Route path="/list-team-repos" element={<ListTeamReposPage />} />
              <Route path="/add-team-to-repos" element={<AddTeamToReposPage />} />
            </Route>
          </Routes>
        </div>
      </HashRouter>
    </Context.Provider>
  );
}

export default App;
