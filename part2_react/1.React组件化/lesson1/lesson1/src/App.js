import React from "react";
import ContextPage from "./pages/ContextPage";
import AntdFormPage from "./pages/AntdFormPage";
//import MyRCFieldForm from "./pages/MyRCFieldForm";
import MyRCFieldForm from "./pages/MyRCForm";

export default function App(props) {
  return (
    <div>
      {/* <ContextPage /> */}
      {/* <AntdFormPage /> */}
      <MyRCFieldForm />
    </div>
  );
}
