import BackButton from "@renderer/components/BackButton";
import { Button, Input, List } from "antd";
import Title from "antd/es/typography/Title";
import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from '@ant-design/icons';
import type { NotificationArgsProps } from 'antd';
import { notification } from 'antd';
import Context from "@renderer/store/context";

type IToken = {
  value: string,
  key: string
}

function BlankPage(): JSX.Element {
  const heading = "Github Access Token" as const;

  const keyInputRef: RefObject<any> = useRef(null);
  const valueInputRef: RefObject<any> = useRef(null);
  const [api, contextHolder] = notification.useNotification();

  type NotificationPlacement = NotificationArgsProps['placement'];

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
      placement,
    });
  };

  const [tokenKeys, setTokenKeys] = useState<Record<string, string>[]>([]);

  const encryptStoreGetAll = () => {
    const { ipcRenderer } = window.electron;
    ipcRenderer.invoke('encryptStoreGetAll').then((res) => {
      setTokenKeys(res);
    });
  }

  useEffect(() => {
    openNotification("topLeft");
    encryptStoreGetAll();
  }, []);

  const saveToken = () => {
    openNotification("topLeft");
    openNotification("topLeft");
    openNotification("topLeft");
    openNotification("topLeft");
    const { ipcRenderer } = window.electron;
    ipcRenderer.invoke('addToken', { key: keyInputRef.current.input.value, value: valueInputRef.current.input.value }).then((result: string) => {
      encryptStoreGetAll();
    })
  }

  return (
    <main className="flex flex-col gap-10 justify-start w-full h-50 mt-10">
      <div className="flex gap-2 flex-col">
        <Title level={2}>{heading}</Title>
        <Input type="text" ref={keyInputRef} placeholder="name" />
        <Input type="text" ref={valueInputRef} placeholder="token" />
        <Button
          className="bg-[var(--color-button)] rounded-2xl p-5"
          type="primary"
          onClick={() => saveToken()} >
          Save Token
        </Button>
      </div>
      <List header={<Title level={3}>List of Tokens</Title>} bordered>
        {
          Object.keys(tokenKeys).map((item, idx) => (
            <List.Item key={idx}>
              <div className="flex w-full justify-between">
                <span>{item}</span>
                <span>{tokenKeys[item]}</span>
              </div>
            </List.Item>
          ))
        }
      </List>
    </main>
  );
}

export default BlankPage;
