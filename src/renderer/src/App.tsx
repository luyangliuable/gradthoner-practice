import * as A from "@shared/types";
import { Button, Flex } from "antd";

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");

  return (
    <main className="h-[100vh] w-[100vw] position-relative flex flex-col justify-evenly items-center">
      <h1 className="text-5xl text-[var(--ev-c-text-6)] font-extrabold">Batch Git Repo Tool</h1>
      <Flex gap="middle" className="w-full" justify="center" wrap>
        <Button className="bg-[var(--color-button)] rounded-2xl p-5" type="primary">Github Access Token</Button>
        <Button className="bg-[var(--color-button)] rounded-2xl p-5" type="primary">List Repositories</Button>
        <Button className="bg-[var(--color-button)] rounded-2xl p-5" type="primary">Add Files</Button>
        <Button className="bg-[var(--color-button)] rounded-2xl p-5" type="primary">Add Team</Button>
      </Flex>
      <Flex className="w-[50%] text-center" gap="middle" justify="center" align="center" vertical>
        <span>
          This tool aims to provide a graphical interface with ghe-tools.go and the Github REST API to process multiple repositories in batch which can be a time-consuming task.
        </span>
        <span>
          For contribution and adding features to this app - repository
        </span>
      </Flex>
    </main>
  );
}

export default App;
