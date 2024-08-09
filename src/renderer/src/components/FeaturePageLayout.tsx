import BackButton from "./BackButton";
import { Outlet } from "react-router-dom";

function FeaturePageLayout(): JSX.Element {
  return (
    <div className="h-screen w-screen overflow-auto">
      <div
        id="header"
        className="sticky top-0 z-50 pt-3 pb-3 pl-5 pr-5 bg-white"
      >
        <BackButton />
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
