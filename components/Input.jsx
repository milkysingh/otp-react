/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useRef, useLayoutEffect } from "react";
import usePrevious from "../hooks/index.jsx";
const Input = (props) => {
  const { focus, ...rest } = props;
  const inputRef = useRef(null);
  const prevFocus = usePrevious(focus);
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus) {
        inputRef.current.focus();
      }
      if (focus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [focus, prevFocus]);

  return <input ref={inputRef} {...rest} />;
};

export default memo(Input);
