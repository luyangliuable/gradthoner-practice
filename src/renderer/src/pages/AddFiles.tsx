import React, { useEffect, useState } from "react";
import { Button, Flex, Input, Modal, Select, Steps } from "antd";
import Form from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { ImportOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Repo } from "@shared/repo/data";
import RepoTable from "@renderer/components/RepoTable";
import ImportReposButton from "@renderer/components/ImportReposButton";
import { useLocation } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { addTeamToRepos } from "@renderer/lib/addTeamToRepos";
import ExportReposButton from "@renderer/components/ExportReposButton";
import { CommitFile } from "@shared/commit/data";

interface FormData {
  org: string;
  teamSlug: string;
  permission: string;
  file: string;
  title: string;
  commit: string;
}

function AddFiles(): JSX.Element {
  const location = useLocation();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const hasSelected = selectedRowKeys.length > 0;

  useEffect(() => {
    if (location.state?.repos != null) {
      onLoadedRepos(location.state.repos);
    }
  }, [location]);

  const selectFiles = async (): Promise<void> => {
    try {
      const files = await window.api.selectFilesUnderDirectories();
      console.log(files);
    } catch (error) {
      console.error("Error opening dialog:", error);
    }
  };

  const onLoadedRepos = (repos: Repo[]): void => {
    setSelectedRowKeys([]);
    setRepos(repos);
    setHasData(true);
    setLoading(false);
    setSelectedRowKeys([...Array(repos.length).keys()]);
    setCurrentStep(1);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const getSelectedRepos = (): Repo[] => {
    return repos.filter((i) => selectedRowKeys.includes(i.key));
  };

  const handleSubmitForm = async (data: FormData): Promise<void> => {
    console.log(
      `Submit form with org = ${data.org}, teamSlug = ${data.teamSlug}`,
    );
    setCurrentStep(2);
    setLoading(true);
    try {
      await addTeamToRepos(
        data.org,
        data.teamSlug,
        data.permission,
        getSelectedRepos(),
      );
      setLoading(false);
      success();
    } catch (err) {
      console.log("Error.");
    }
  };

  const success = (): void => {
    Modal.success({
      content: "Success",
    });
  };

  return (
    <div className="flex w-full justify-center">
      <div id="section-left" className="w-[600px] pr-10">
        <Flex justify="end" gap={10} className="mb-5">
          <span className="text-sm self-center">
            {hasSelected ? `Selected ${selectedRowKeys.length}` : null}
          </span>
          <ExportReposButton
            repos={getSelectedRepos()}
            disabled={!hasSelected}
          />
          <Button>
            Import txt
            <ImportOutlined />
          </Button>
          <ImportReposButton />
        </Flex>
        <RepoTable
          repos={repos}
          hasData={hasData}
          selectedRowKeys={selectedRowKeys}
          onSelectChange={onSelectChange}
          loading={loading}
        />
        <div></div>
      </div>
      <div id="section-right" className="pl-10">
        <Title level={2}>Add Files to Repositories</Title>
        <div id="steps" className="mt-5 mb-10">
          <Steps
            direction="vertical"
            size="small"
            current={currentStep}
            items={[
              {
                title: "Import repositories",
                description: "Use Import to specify target repos",
              },
              {
                title: "Select file",
                description: "Use select file to find the required file",
              },
              {
                title: "Title",
                description: "Title to use for the generated pull requests",
              },
              {
                title: "Commit message",
                description:
                  "Custom commit description to use for the generated commits",
              },
              {
                title: "Submit",
                description: "Press Submit to add file to target repositories",
              },
            ]}
          />
        </div>
        <div id="form">
          <Form
            name="parameters"
            layout="vertical"
            colon={false}
            onFinish={handleSubmitForm}
            disabled={loading}
          >
            <FormItem<FormData>
              label="File"
              name="file"
              rules={[{ required: true }]}
              tooltip={{
                title:
                  "Choose the file in your local system that you want to add to the repositories",
                icon: <InfoCircleOutlined />,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  className="max-w-60"
                  value={"implement this"}
                  style={{ marginRight: "10px" }}
                />
                <Button type="primary" onClick={selectFiles}>
                  Select file
                </Button>
              </div>
            </FormItem>

            <FormItem<FormData>
              label="Title"
              name="title"
              rules={[{ required: true }]}
              tooltip={{
                title: "Choose a title for the Pull Request",
                icon: <InfoCircleOutlined />,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input className="max-w-60" style={{ marginRight: "10px" }} />
              </div>
            </FormItem>

            <FormItem<FormData>
              label="Commit message"
              name="commit"
              rules={[{ required: true }]}
              tooltip={{
                title: "Choose a commit message",
                icon: <InfoCircleOutlined />,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input className="max-w-60" style={{ marginRight: "10px" }} />
              </div>
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit" disabled={!hasSelected}>
                Submit
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddFiles;
