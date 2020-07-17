<template>
  <!-- 以下部分为作业内容：  you can you up -->
  <div id="app">
    <input type="text" v-model="username" placeholder="请输入用户名">
    <span>{{username}}</span>
    <span>{{msg}}</span>
    <button @click="submit">提交用户名</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

function validate(target: any, name: string, descriptor: PropertyDescriptor) {
      const fn = descriptor.value
      descriptor.value = function(e: KeyboardEvent) {
        console.log(this)
        if(this.username && this.username.trim()) {
          let reg = /^[a-zA-Z0-9_]{6,10}$/
          let value = this.username.trim()
          if(value && !reg.test(value)) {
             fn.call(this, '用户名请输入6至10位的字母数字以及下划线')
          }  
        }             
      }    
}

export default class App extends Vue {
  username:string =  ''  
  msg:string =  '' 

  constructor() {
    super()
    this.submit = this.submit.bind(this)     
  }

  @validate
  submit(msg: string) {    
    console.log(this)
    this.msg = 'abcdef'
  }  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
