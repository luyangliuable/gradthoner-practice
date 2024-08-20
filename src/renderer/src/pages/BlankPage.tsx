import BackButton from "@renderer/components/BackButton";
import { Button, Input, List } from "antd";
import Title from "antd/es/typography/Title";
import React, { RefObject, useRef, useState } from "react";

type IToken = {
  value: string,
  key: string
}

function BlankPage(): JSX.Element {
  const heading = "Github Access Token" as const;

  const keyInputRef: RefObject<any> = useRef(null);
  const valueInputRef: RefObject<any> = useRef(null);

  const token: IToken[] = [
    {
      key: "random key",
      value: "ja7we8ke"
    },
    {
      key: "random key1",
      value: "mu9xi1ju"
    },
    {
      key: "random key2",
      value: "random value"
    },
    {
      key: "random key3",
      value: "random value"
    },
    {
      key: "random key4",
      value: "random value"
    }
  ]

  return (
    <main className="flex flex-col gap-10 justify-start w-full h-50 mt-10">
      <div className="flex gap-2 flex-col lg:flex-row">
        <Title level={2}>{heading}</Title>
        <Input type="text" ref={keyInputRef} placeholder="name" />
        <Input type="text" ref={valueInputRef} placeholder="token" />
        <Button
          className="bg-[var(--color-button)] rounded-2xl p-5"
          type="primary"
          onClick={() => {
            const { ipcRenderer } = window.electron;
            ipcRenderer.invoke('addToken', { key: keyInputRef.current.input.value, value: valueInputRef.current.input.value }).then((result: string) => {
              console.log(result);
            })
          }}
        >
          Save Token
        </Button>
      </div>
      <List header={<Title level={3}>List of Tokens</Title>} bordered>
        {
          token.map((item, idx) => (
            <List.Item key={idx}>
              <div className="flex w-full justify-between">
                <span>{item.key}</span>
                <span>{item.value}</span>
              </div>
            </List.Item>
          ))
        }
      </List>
    </main>
  );
}

export default BlankPage;
