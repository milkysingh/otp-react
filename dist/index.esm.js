import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React, { useRef, useEffect, memo, useLayoutEffect, useState, useCallback } from 'react';
import _extends from '@babel/runtime/helpers/extends';

var BACKSPACE = "Backspace";
var DELETE = "Delete";
var ARROW_LEFT = "ArrowLeft";
var ARROW_RIGHT = "ArrowRight";

var usePrevious = function usePrevious(value) {
  var ref = useRef(); // Store current value in ref

  useEffect(function () {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)

  return ref.current;
};

var _excluded$1 = ["focus"];

var Input = function Input(props) {
  var focus = props.focus,
      rest = _objectWithoutProperties(props, _excluded$1);

  var inputRef = useRef(null);
  var prevFocus = usePrevious(focus);
  useLayoutEffect(function () {
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
  return /*#__PURE__*/React.createElement("input", _extends({
    ref: inputRef
  }, rest));
};

var Input$1 = /*#__PURE__*/memo(Input);

var checkInput = function checkInput(s) {
  var val = s;

  if (s) {
    return Number(val) >= 0 ? val : '';
  } else {
    return s;
  }
};

var _excluded = ["length", "onOTPChangeHandler", "inputStyle", "disabled", "className"];

var OTP = function OTP(_ref) {
  var _ref$length = _ref.length,
      length = _ref$length === void 0 ? 6 : _ref$length,
      onOTPChangeHandler = _ref.onOTPChangeHandler,
      inputStyle = _ref.inputStyle,
      disabled = _ref.disabled,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, _excluded);

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      currentInput = _useState2[0],
      setCurrentInput = _useState2[1];

  var _useState3 = useState(new Array(length).fill("")),
      _useState4 = _slicedToArray(_useState3, 2),
      values = _useState4[0],
      setValues = _useState4[1];

  var handleOtpChange = useCallback(function (value) {
    var otpValue = value.join("");
    onOTPChangeHandler && onOTPChangeHandler(otpValue);
  }, [onOTPChangeHandler]); // Focus `inputIndex` input

  var onFocusHandler = useCallback(function (index) {
    var selectedIndex = Math.max(Math.min(length - 1, index), 0);
    setCurrentInput(selectedIndex);
  }, [length]); // Change OTP value at focussing input

  var changeCodeAtFocus = useCallback(function (str) {
    var updatedOTPValues = _toConsumableArray(values);

    if (currentInput === length - 1) {
      updatedOTPValues[currentInput] = str !== "" ? String(Number(str) % 10) : "";
    } else {
      updatedOTPValues[currentInput] = str !== "" ? String(Number(str) % 10) : "";
    }

    setValues(updatedOTPValues);
    handleOtpChange(updatedOTPValues);
  }, [currentInput, values, handleOtpChange, length]);
  var previousFocusHandler = useCallback(function () {
    onFocusHandler(currentInput - 1);
  }, [currentInput, onFocusHandler]);
  var nextFocusHandler = useCallback(function () {
    onFocusHandler(currentInput + 1);
  }, [currentInput, onFocusHandler]);
  var handleOnFocus = useCallback(function (index) {
    return function () {
      onFocusHandler(index);
    };
  }, [onFocusHandler]);
  var onBlur = useCallback(function () {
    setCurrentInput(-1);
  }, []); // Handle onKeyDown input

  var handleOnKeyDown = useCallback(function (e) {
    var key = e.key;

    switch (key) {
      case BACKSPACE:
      case DELETE:
        {
          e.preventDefault();

          if (values[currentInput]) {
            changeCodeAtFocus("");
          } else {
            previousFocusHandler();
          }

          break;
        }

      case ARROW_LEFT:
        {
          e.preventDefault();
          previousFocusHandler();
          break;
        }

      case ARROW_RIGHT:
        {
          e.preventDefault();
          nextFocusHandler();
          break;
        }

      default:
        {
          if (key.match(/^[^a-zA-Z0-9]$/)) {
            e.preventDefault();
          }

          break;
        }
    }
  }, [values, currentInput, changeCodeAtFocus, previousFocusHandler, nextFocusHandler]);
  var handleOnChange = useCallback(function (e) {
    var val = checkInput(e.currentTarget.value);

    if (!val) {
      e.preventDefault();
      return;
    }

    changeCodeAtFocus(val);
    nextFocusHandler();
  }, [nextFocusHandler, changeCodeAtFocus]);
  var handleOnPaste = useCallback(function (e) {
    e.preventDefault();
    var pastedData = e.clipboardData.getData("text/plain").trim().slice(0, length - currentInput).split("");

    if (pastedData) {
      var nextFocusIndex = 0;

      var updatedOTPValues = _toConsumableArray(values);

      updatedOTPValues.forEach(function (val, index) {
        if (index >= currentInput) {
          var changedValue = checkInput(pastedData.shift() || val);

          if (changedValue) {
            updatedOTPValues[index] = changedValue;
            nextFocusIndex = index;
          }
        }
      });
      values(updatedOTPValues);
      setCurrentInput(Math.min(nextFocusIndex + 1, length - 1));
    }
  }, [currentInput, length, values]);
  return /*#__PURE__*/React.createElement("div", rest, Array(length).fill("").map(function (_, index) {
    return /*#__PURE__*/React.createElement(Input$1, {
      key: "SingleInput-".concat(index),
      focus: currentInput === index,
      value: values[index],
      onFocus: handleOnFocus(index),
      onChange: handleOnChange,
      onKeyDown: handleOnKeyDown,
      onBlur: onBlur,
      onPaste: handleOnPaste,
      style: inputStyle,
      className: className,
      disabled: disabled
    });
  }));
};

var returnLibrary = function returnLibrary() {
  return {
    OTP: OTP // you can add here other components that you want to export

  };
};

var index = returnLibrary();

export { index as default };
