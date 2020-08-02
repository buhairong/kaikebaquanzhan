import React, {Component} from "react";
//import { Prompt } from 'react-router'
import Prompt from '../k-react-router-dom/Prompt'

export default class UserPage extends Component {
  render() {
    return (
      <div>
        <h1>用户中心</h1>
        <Prompt
          message="Are you sure you want to leave?"
        />
      </div>      
    );
  }
}
