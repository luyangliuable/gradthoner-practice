import { ExportOutlined } from "@ant-design/icons";
import { Repo } from "@shared/item/data";
import { Button } from "antd";

export interface Props {
  repos: Repo[];
  disabled: boolean;
}

export default function ExportReposButton(props: Props): JSX.Element {
  return (
    <Button disabled={props.disabled}>
      Export Selected
      <ExportOutlined />
    </Button>
  );
}
