## malkeet-otp-react_2

A fully customizable, one-time password input component for the web built with React.

### Install

Install using `npm install malkeet-otp-react_2`

### Usage

`import {OTP} from 'malkeet-otp-react_2'`

#### Basic usage:

```jsx
import { OTP } from "malkeet-otp-react_2";
function App() {
  const onOTPChangeHandler = (otp) => {
    console.log({ otp });
  };
  return (
    <div className="App">
      <OTP
        length={6}
        className="otpInput"
        onOTPChangeHandler={onOTPChangeHandler}
      />
    </div>
  );

```

#### OTP props

| Name               | Type     | Description                          |
| ------------------ | -------- | ------------------------------------ |
| length             | number   | Number of OTP inputs to be rendered. |
| className          | string   | className                            |
| onOTPChangeHandler | function | Returns OTP code typed in inputs.    |
