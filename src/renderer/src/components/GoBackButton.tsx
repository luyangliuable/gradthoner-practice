import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function GoBackButton(): JSX.Element {
  const navigate = useNavigate();
  return <Button onClick={() => navigate(-1)}>Go Back</Button>;
}

export default GoBackButton;
