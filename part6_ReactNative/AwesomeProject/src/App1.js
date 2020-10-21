import React from 'react';
import {Text,View,Alert} from 'react-native';
import WebView from 'react-native-webview';


// 技术为生活服务 
const uri="http://piao.mtime.com/onlineticket/1052_613163198/seat/"

const INJECT_JS = (window,document) =>{
  let submitBtn;
  function waitForBtnRender(){
    submitBtn = document.getElementById('submitSeat')

    if(!submitBtn){
      setTimeout(waitForBtnRender, 2000);
    } else {
      submitBtn.onclick = ()=>{
        const seats = [];
        document.querySelectorAll('.seat_selected').forEach(ele => {
          seats.push(ele.getAttribute('colname'))
        });

        window.ReactNativeWebView.postMessage(seats.join(', '))
      }
    }
  }
  waitForBtnRender()

}

export default function App(){
  return (
    <WebView
      source={{uri}}
      injectedJavaScript = {`(${INJECT_JS.toString()})(window,document)`}
      onMessage = {(e)=>{
        Alert.alert(`您选中的座位是:`+e.nativeEvent.data)
      }}
    />
   
  )
}




