import React, { useCallback, useState } from "react";
import { ARROW_LEFT, ARROW_RIGHT, BACKSPACE, DELETE } from "../constants";
import Input from "./Input.jsx";
import { checkInput } from "./utils";

const OTP = ({
  length = 6,
  onOTPChangeHandler,
  inputStyle,
  disabled,
  className,
  ...rest
}) => {
  const [currentInput, setCurrentInput] = useState(0);
  const [values, setValues] = useState(new Array(length).fill(""));

  const handleOtpChange = useCallback(
    (value) => {
      const otpValue = value.join("");
      onOTPChangeHandler && onOTPChangeHandler(otpValue);
    },
    [onOTPChangeHandler]
  );
  // Focus `inputIndex` input
  const onFocusHandler = useCallback(
    (index) => {
      const selectedIndex = Math.max(Math.min(length - 1, index), 0);
      setCurrentInput(selectedIndex);
    },
    [length]
  );

  // Change OTP value at focussing input
  const changeCodeAtFocus = useCallback(
    (str) => {
      const updatedOTPValues = [...values];
      if (currentInput === length - 1) {
        updatedOTPValues[currentInput] =
          str !== "" ? String(Number(str) % 10) : "";
      } else {
        updatedOTPValues[currentInput] =
          str !== "" ? String(Number(str) % 10) : "";
      }
      setValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [currentInput, values, handleOtpChange, length]
  );

  const previousFocusHandler = useCallback(() => {
    onFocusHandler(currentInput - 1);
  }, [currentInput, onFocusHandler]);

  const nextFocusHandler = useCallback(() => {
    onFocusHandler(currentInput + 1);
  }, [currentInput, onFocusHandler]);
  const handleOnFocus = useCallback(
    (index) => () => {
      onFocusHandler(index);
    },
    [onFocusHandler]
  );
  const onBlur = useCallback(() => {
    setCurrentInput(-1);
  }, []);

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e) => {
      const key = e.key;

      switch (key) {
        case BACKSPACE:
        case DELETE: {
          e.preventDefault();
          if (values[currentInput]) {
            changeCodeAtFocus("");
          } else {
            previousFocusHandler();
          }
          break;
        }
        case ARROW_LEFT: {
          e.preventDefault();
          previousFocusHandler();
          break;
        }
        case ARROW_RIGHT: {
          e.preventDefault();
          nextFocusHandler();
          break;
        }
        default: {
          if (key.match(/^[^a-zA-Z0-9]$/)) {
            e.preventDefault();
          }

          break;
        }
      }
    },
    [
      values,
      currentInput,
      changeCodeAtFocus,
      previousFocusHandler,
      nextFocusHandler,
    ]
  );

  const handleOnChange = useCallback(
    (e) => {
      const val = checkInput(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(val);
      nextFocusHandler();
    },
    [nextFocusHandler, changeCodeAtFocus]
  );

  const handleOnPaste = useCallback(
    (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text/plain")
        .trim()
        .slice(0, length - currentInput)
        .split("");
      if (pastedData) {
        let nextFocusIndex = 0;
        const updatedOTPValues = [...values];
        updatedOTPValues.forEach((val, index) => {
          if (index >= currentInput) {
            const changedValue = checkInput(pastedData.shift() || val);
            if (changedValue) {
              updatedOTPValues[index] = changedValue;
              nextFocusIndex = index;
            }
          }
        });
        values(updatedOTPValues);
        setCurrentInput(Math.min(nextFocusIndex + 1, length - 1));
      }
    },
    [currentInput, length, values]
  );

  return (
    <div {...rest}>
      {Array(length)
        .fill("")
        .map((_, index) => (
          <Input
            key={`SingleInput-${index}`}
            focus={currentInput === index}
            value={values[index]}
            onFocus={handleOnFocus(index)}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            onBlur={onBlur}
            onPaste={handleOnPaste}
            style={inputStyle}
            className={className}
            disabled={disabled}
          />
        ))}
    </div>
  );
};

export default OTP;
