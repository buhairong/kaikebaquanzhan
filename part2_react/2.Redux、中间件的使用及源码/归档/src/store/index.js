//import {createStore, applyMiddleware, combineReducers} from "redux";
import {createStore, applyMiddleware} from "redux";
// import thunk from "redux-thunk";
//import logger from "redux-logger";
//import promise from "redux-promise";
//import {createStore, applyMiddleware} from "../kredux";

import isPromise from "is-promise";

function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}


// 以下部分为作业内容 毛里塔尼亚
const store = createStore(
  combineReducers({countReducer}),
  applyMiddleware(thunk, logger, promise)
);

function combineReducers (reducers) {
  return function combination(state = {}, action) {
    let nextState = {}
    let hasChanged = false

    for(let key in reducers) {
      const reducer = reducers[key]
      nextState[key] = reducer(state[key], action)
      hasChanged = hasChanged || reducer(state[key], action) !== state[key]
    }

    hasChanged = 
      hasChanged || Object.keys(nextState).length !== Object.keys(state).length
    return hasChanged ? nextState : state
  }
}

export default store;

function logger({getState}) {
  return next => action => {
    console.log("*******************************"); //sy-log

    console.log(action.type + "执行了！"); //sy-log

    let prevState = getState();
    console.log("prev state", prevState); //sy-log

    const returnValue = next(action);
    let nextState = getState();
    console.log("next state", nextState); //sy-log

    console.log("*******************************"); //sy-log
    return returnValue;
  };
}

// !next就是聚合函数

function thunk({dispatch, getState}) {
  return next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

function promise({dispatch}) {
  return next => action => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}
