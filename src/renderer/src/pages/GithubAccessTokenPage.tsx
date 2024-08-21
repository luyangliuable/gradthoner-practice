import { Button, Input, List, Empty, Popconfirm } from "antd";
import Title from "antd/es/typography/Title";
import React, { createRef, RefObject, useEffect, useRef, useState } from "react";
import classNames from 'classnames';
import type { PopconfirmProps } from 'antd';
import { DeleteOutlined, EyeOutlined, EditOutlined, CheckOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from '@ant-design/icons';
import type { NotificationArgsProps } from 'antd';
import { notification } from 'antd';
import Context from "@renderer/store/context";
import _default from "vite-tsconfig-paths";

function GithubAccessTokenPage(): JSX.Element {
  const heading = "Github Access Token" as const;

  const keyInputRef: RefObject<any> = useRef(null);
  const valueInputRef: RefObject<any> = useRef(null);
  const [api, contextHolder] = notification.useNotification();
  const { invoke } = window.electron.ipcRenderer;

  type NotificationPlacement = NotificationArgsProps['placement'];

  const openNotification = (placement: NotificationPlacement, heading: string, message: string) => {
    api.info({
      message: heading,
      description: <Context.Consumer>{() => message}</Context.Consumer>,
      placement,
    });
  };

  const openError = (placement: NotificationPlacement, heading: string, message: string) => {
    api.error({
      message: heading,
      description: <Context.Consumer>{() => message}</Context.Consumer>,
      placement,
    });
  };

  const [tokenKeys, setTokenKeys] = useState<Record<string, string>>({});
  const [tokenBlurredList, setTokenBlurredList] = useState<boolean[]>([]);
  const [tokenEditableList, setTokenEditableList] = useState<boolean[]>([]);
  const [tokenValueRefList, setTokenValueRefList] = useState<RefObject<HTMLSpanElement>[]>([]);

  const encryptStoreGetAll = () => {
    invoke('encryptStoreGetAll').then((res: Record<string, string>) => {
      setTokenKeys(res);
      setTokenBlurredList(Object.keys(res).map(_ => true));
      setTokenEditableList(Object.keys(res).map(_ => false));
      setTokenValueRefList(Object.keys(res).map(_ => createRef()));
    });
  }

  const encryptStoreDelete = (key: string) => {
    invoke('encryptStoreDelete', key).then((res) => {
      encryptStoreGetAll();
    });
  }

  useEffect(() => {
    encryptStoreGetAll();
  }, []);

  const saveOneToken = (key: string, value: string) => {
    const args = { key: key, value: value };
    invoke('encryptStoreSet', args).then(() => {
      encryptStoreGetAll();
      openNotification("bottomRight", "Token Saved", "The token has successfully been saved.");
    })
  }

  const saveToken = () => {
    const { value: keyInputKey } = keyInputRef.current.input;
    const { value: keyInputValue } = valueInputRef.current.input;
    if (!validateKeyAndValue(keyInputKey, keyInputValue)) {
      openError("bottomRight", "Token String Error", "Please enter a valid token.");
    } else {
      saveOneToken(keyInputKey, keyInputValue);
    }
  }

  const validateKeyAndValue = (key: string, val: string): boolean => {
    const trimmedVal = val.trim();
    if (key.trim() === "" || trimmedVal === "" || trimmedVal.length < 5) {
      return false;
    }
    return true;
  }

  const keys = Object.keys(tokenKeys);

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
  };

  return (
    <main className="flex flex-col gap-10 justify-start w-full h-50 mt-10">
      {contextHolder}
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
      {keys.length > 0 ?
        <List header={<Title level={3}>List of Tokens</Title>} bordered>
          {
            keys.map((item, idx) => (
              <List.Item key={idx} className="">
                <div className="flex flex-row w-full justify-between">
                  <span className="flex flex-row items-center" contentEditable={true}>{item}</span>
                  <div className="flex flex-row items-center gap-2">
                    <span
                      contentEditable={tokenEditableList[idx]}
                      ref={tokenValueRefList[idx]}
                      className={
                        classNames("transition-[filter] duration-[0.1s] ease-[ease-in-out]", {
                          "blur-md": tokenBlurredList[idx] && !tokenEditableList[idx]
                        })
                      }>
                      {tokenBlurredList[idx] && !tokenEditableList[idx] ? "asdasdasdsadsad" : tokenKeys[item]}
                    </span>
                    <div className="flex flex-row items-center justify-end min-w-[80px] gap-2">
                      {item !== "githubCloud" && item !== "githubEnterpriseServer" &&
                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => encryptStoreDelete(item)}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                      }
                    </div>
                    <Button
                      onClick={() => setTokenBlurredList(prev => {
                        return prev.map((item, idx2) => {
                          if (idx === idx2) return !item;
                          return item;
                        });
                      })}
                      icon={tokenBlurredList[idx] ? <EyeOutlined /> : <EyeInvisibleOutlined />} />
                    <Button
                      onClick={() => {
                        if (tokenEditableList[idx]) {
                          saveOneToken(item, tokenValueRefList[idx].current!.innerHTML);
                        } else {
                          setTokenEditableList(prev => {
                            return prev.map((item, idx2) => {
                              if (idx === idx2) return !item;
                              return item;
                            });
                          })
                        }
                      }
                      }
                      icon={tokenEditableList[idx] ? <CheckOutlined /> : <EditOutlined />}
                    />
                  </div>
                </div>
              </List.Item>
            ))
          }
        </List> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    </main>
  );
}

export default GithubAccessTokenPage;
