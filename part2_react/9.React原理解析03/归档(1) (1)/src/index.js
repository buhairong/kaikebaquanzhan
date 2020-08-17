import React, { useState, useMemo, useCallback, PureComponent } from "react";
import ReactDOM from "react-dom";

function UseCallbackPage(props) {
  const [count, setCount] = useState(0);

  //  尼日利亚
  const addClick = useCallback(() => {
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
  }, [count]);

  //  尼日利亚
  const expensive = useMemo(() => {    
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
    
  }, [count]);

  const [value, setValue] = useState("");

  return (
    <div>
      <h3>UseCallbackPage</h3>
      <p>expensive:{expensive}</p>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <input value={value} onChange={event => setValue(event.target.value)} />
      <Child addClick={addClick} />
    </div>
  );
}


class Child extends PureComponent {
  render() {
    console.log("child render");
    const { addClick } = this.props;
    return (
      <div>
        <h3>Child</h3>
        <button onClick={() => console.log(addClick())}>add</button>
      </div>
    );
  }
}




// import React from "./kreact/index";
// import ReactDOM, {useState} from "./kreact/react-dom";
// import Component from "./kreact/Component";

// // import React, {Component, useState, useCallback, PureComponent, useMemo} from "react";
// // import ReactDOM from "react-dom";
// import "./index.css";

// class ClassComponent extends Component {
//   static defaultProps = {
//     color: "pink"
//   };
//   render() {
//     return (
//       <div className="border">
//         class组件-{this.props.name}
//         <p className={this.props.color}>omg</p>
//       </div>
//     );
//   }
// }

// function FunctionComponent(props) {
//   const [count, setCount] = useState(0);

//   const addClick = () => {
//     let sum = 0;
//     for (let i = 0; i < count; i++) {
//      sum += i;
//    }
//     return sum;
//   }

//   return (
//     <div className="border">
//       函数组件-{props.name}
//       <button onClick={() => setCount(count + 1)}>{count} </button>
//       {count % 2 ? <button>click</button> : <span>omg</span>}
//       <Child addClick={addClick} />
//     </div>
//   );
// }

// class Child extends Component {
//  render() {
//   console.log("child render");
//   const {addClick} = this.props;
//   return (
//    <div>
//     <h3>Child</h3>
//     <button onClick={() => console.log(addClick())}>add</button>
//    </div>
//  );
// }
// }

const jsx = (
  <div className="border">
    <p>全栈</p>
    <a href="https://www.kaikeba.com/">开课吧</a>
    <UseCallbackPage name="function" />    
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
// // 文本节点
// // html元素节点
// // 类组件
// // 函数组件
// // 数组
// // Fragment
// // 补充：<></>与Fragment的区别
