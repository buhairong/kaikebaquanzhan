// 以下是作业内容： 西撒哈拉
import React, {Component, useEffect} from "react";
import {Field} from "../components/my-rc-field-form/";
import Input from "../components/Input";

const FormContext = React.createContext();

class createForm extends Component {
  constructor(props) {
      super(props)
      this.options = {}
  }

  getControled = (field, option) => {
    this.options[field] = option
    // return React.cloneElement(InputCmp, {
    //   name: field,
    //   value: this.state[field] || "",
    //   onChange: this.handleChange
    // })
  };

  setFieldsValue = newStore => {
      this.setState(newStore)
  }

  getFieldsValue = () => {
      return this.state
  }


  // 西撒哈拉
  validateFields = callback => {
      let err = []

      for(let field in this.options) {
          if(this.state[field] === undefined) {
              err.push({
                  [field]: "err"
              })
          }
      }

      if(err.length === 0) {
          callback(null, this.state)
      }else{
          callback(err, this.state)
      }
  }
}

@createForm
class MyRCForm extends Component {
  constructor(props) {
    super(props)
    this.children = props.children
  }

  componentDidMount() {
    this.props.form.setFieldsValue({username: "default"})
  }

  submit = () => {
    const {getFieldsValue, validateFields} = this.props.form

    validateFields((err, val) => {
      if(err) {
        console.log('err', err)
      }else {
        console.log('success', val);
      }
    })
  }

  render() {
    return (
      <form
          onSubmit={e => {
              e.preventDefault();
              this.submit();
          }}>
          <FormContext.Provider>
              {this.children}
          </FormContext.Provider>
      </form>
    );
  }
}

const nameRules = {required: true, message: "请输入姓名！"};
const passworRules = {required: true, message: "请输入密码！"};

export default function MyRCFieldForm(props) {
  const onFinish = val => {
    console.log("onFinish", val); //sy-log
  };

  // 表单校验失败执行
  const onFinishFailed = val => {
    console.log("onFinishFailed", val); //sy-log
  };

  return (
    <div>
      <h3>MyRCFieldForm</h3>
      <MyRCForm onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" rules={[nameRules]}>
          <Input placeholder="input UR Username" />
        </Field>
        <Field name="password" rules={[passworRules]}>
          <Input placeholder="input UR Password" />
        </Field>
        <button>Submit</button>
      </MyRCForm>
    </div>
  );
}

