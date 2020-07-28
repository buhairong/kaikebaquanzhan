import React, {Component} from "react";
//import {createForm} from "rc-form";
import createForm from "../components/my-rc-form";
import Input from "../components/Input";

const nameRules = {required: true, message: "请输入姓名！"};
const passworRules = {required: true, message: "请输入密码！"};

@createForm
class MyRCForm extends Component {
  constructor(props) {
    super(props)   
    this.state = {
      msgs: {}
    } 
  }

  componentDidMount() {
    this.props.form.setFieldsValue({username: "default"})
  }

  submit = () => {    
    const {getFieldsValue, validateFields} = this.props.form
    console.log('submit', getFieldsValue())

    validateFields((err, val) => {
      if(err) {
        console.log('err', err)
        this.setState({
          msgs: err
        })
      }else {
        console.log('success', val);
      }
    })
  }

  render() {
    console.log('props', this.props)
    const {getFieldDecorator} = this.props.form
    const {msgs} = this.state
    console.log('msgs', msgs)
    console.log('msgs', msgs["username"])
    return (
      <div>
        <h3>MyRCForm</h3>
        {getFieldDecorator("username", {rules: [nameRules]})(<Input placeholder="Username" />)}
        <span>{msgs["username"] && this.msgs["username"][0]}</span>
        {getFieldDecorator("password", {rules: [passworRules]})(<Input placeholder="Password" />)}
        <span>{msgs["password"] && this.msgs["password"][0]}</span>
        <button onClick={this.submit}>submit</button>
      </div>
    );
  }
}

export default MyRCForm