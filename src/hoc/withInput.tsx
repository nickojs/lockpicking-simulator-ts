/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react';

export default (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const [key, setKey] = useState<string>('');
  const container = useRef<HTMLDivElement | null>(null);

  const keyHandler = (e: React.KeyboardEvent) => {
    const key = e.nativeEvent.code;
    setKey(key);
  };

  const mouseHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    container.current?.focus();
  };

  return (
    <div
      onKeyDown={keyHandler}
      ref={(ref) => container.current = ref}
    >
      <WrappedComponent
        {...props}
        testKey={key}
        onMouseDown={mouseHandler}
      />
    </div>
  );
};
