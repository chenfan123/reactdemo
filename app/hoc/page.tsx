'use client';
import { useState, useEffect, type ComponentType } from 'react';
import { Button } from './components/button';
import { TextArea } from './components/textarea';

// 使用示例
const withAuth = <P extends { visible: boolean }>(
  TargetComponent: ComponentType<P>,
  fetAuthResult: () => Promise<boolean>,
) => {
  return function AuthenticatedComponent(props: Omit<P, 'visible'>) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      fetAuthResult().then((result) => {
        if (result) {
          setVisible(true);
        }
      });
    }, []);

    return <TargetComponent {...(props as P)} visible={visible} />;
  };
};

const fetAuthResult = () => Promise.resolve(true);

const AuthButton = withAuth(Button, fetAuthResult);
const AuthTextArea = withAuth(TextArea, fetAuthResult);

export default () => {
  return (
    <div>
      <AuthButton />
      <AuthTextArea />
    </div>
  );
};
