import {
  FileAddOutlined,
  GithubOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";

function HomePage(): JSX.Element {
  const buttons: { text: string; path: string; icon: ReactNode }[] = [
    {
      text: "Github Access Token",
      path: "/blank-page",
      icon: <GithubOutlined />,
    },
    {
      text: "List Team Repositories",
      path: "/list-team-repos",
      icon: <UnorderedListOutlined />,
    },
    {
      text: "Add Files",
      path: "/another-blank-page",
      icon: <FileAddOutlined />,
    },
    {
      text: "Add Team to Repositories",
      path: "/add-team-to-repos",
      icon: <TeamOutlined />,
    },
  ];

  const heading = "Batch Git Repo Tool" as const;
  const navigate = useNavigate();

  const handlePageBtnClick = (path: string): void => {
    console.log("Navigating to page: " + path);
    navigate(path);
  };

  return (
    <main className="h-[100vh] w-[100vw] position-relative flex flex-col justify-evenly items-center">
      <h1 className="text-5xl text-[var(--ev-c-text-6)] font-extrabold">
        {heading}
      </h1>
      <div className="flex gap-2 flex-col lg:flex-row">
        {buttons.map((buttonContent, idx) => (
          <Button
            key={idx}
            className="bg-[var(--color-button)] rounded-2xl p-5"
            type="primary"
            onClick={() => handlePageBtnClick(buttonContent.path)}
          >
            {buttonContent.icon}
            {buttonContent.text}
          </Button>
        ))}
      </div>
      <Flex
        className="w-[50%] text-gray-500 text-center"
        gap="middle"
        justify="center"
        align="center"
        vertical
      >
        <span>
          This tool aims to provide a graphical interface with ghe-tools.go and
          the Github REST API to process multiple repositories in batch which
          can be a time-consuming task.
        </span>
        <span>
          For contribution and adding features to this app -{" "}
          <a href="" target="_blank">
            repository
          </a>
        </span>
      </Flex>
    </main>
  );
}

export default HomePage;
