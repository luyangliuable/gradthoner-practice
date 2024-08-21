import BackButton from "./BackButton";
import { Outlet } from "react-router-dom";
import { SettingOutlined, GithubOutlined } from "@ant-design/icons";

function FeaturePageLayout(): JSX.Element {
  return (
    <div className="h-screen w-screen overflow-auto">
      <div
        id="header"
        className="sticky flex top-0 h-12 z-50 pt-3 pb-3 pl-5 pr-5 bg-white"
      >
        <BackButton />
        <div className="ml-auto flex gap-4">
          <div className="flex gap-1 items-center">
            <GithubOutlined />
            {globalThis.useEnterpriseServer ? (
              <span>Using GitHub Enterprise Server</span>
            ) : (
              <span>Using GitHub Cloud</span>
            )}
          </div>
          <div className="flex gap-1 items-center">
            <SettingOutlined />
            {globalThis.useConfig ? (
              <span>Using Config</span>
            ) : (
              <span>Using Environment Variable</span>
            )}
          </div>
        </div>
      </div>
      <main id="main" className="flex justify-center pt-1 pb-5 pl-16 pr-16">
        <div className="flex w-full max-w-screen-2xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default FeaturePageLayout;
