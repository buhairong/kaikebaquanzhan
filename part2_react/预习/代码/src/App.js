import React, {Component} from "react";
import {Button, Card} from "antd";
// import "antd/dist/antd.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        app
        <Button type="primary">click</Button>
        <a href="https://www.kaikeba.com/">开课吧</a>
        <Card title="" extra={<a href="#">More</a>}>
          <p></p>
        </Card>
      </div>
    );
  }
}
export default App;
