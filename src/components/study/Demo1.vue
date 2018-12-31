<template>
<!-- vue template root node-->
  <div id="home">
    <h2>{{msg}}</h2>
    <h3>{{user.name}}</h3>
    <!-- MVVM 双向绑定 只在表单中有效-->
    <input type="text" v-model="user.name">
    <button v-on:click="showName()">Show Name</button>
    <button v-on:click="changeName()">Change Name</button>
    <hr>
    <input type="password" ref="pwd">
    <button @click="showPwd()">Show PWD</button>
    <button @click="hiddenPwd()">Hidden PWD</button>
    <button @click="eventFun($event)">Event</button>
    <hr>
    <ul>
      <li v-for="item in list" :key="item">
        {{item}}
      </li>
    </ul>
    <ul>
      <li>bookName,bookPrice</li>
      <li v-for="(book,key) in books" :key="key" :class="{red_c:key===0,blue_c:key!=0}">
        {{book.name}},{{book.price}}
      </li>
    </ul>

    <ul v-bind:title="goods_title">
      <li v-for="(good,key) in goods" :key="key">
        {{good.cate}}
        <ol>
          <li>bookName,bookPrice</li>
          <li v-for="(categood,key) in good.list" :key="key">
            {{categood.name}},{{categood.price}}
          </li>
        </ol>
      </li>
    </ul>
    <div v-bind:class="{'ccc_b':true}">
      <img :src="baidu"/>
    </div>
    <div v-bind:class="{'blue_b':flag,'red_b':!flag}">
      <img :src="baidu"/>
    </div>
     <div v-bind:class="{'blue_b':!flag,'red_b':flag}">
      <img :src="baidu"/>
    </div>
    <div v-html="html_h2">
    </div>
    <div v-text="msg">
    </div>
  </div>
</template>

<script>
export default {
  data () { /* 业务数据 */
    return {
      event_state: true,
      msg: 'Welcome to Your Vue.js App',
      user:{
        name: "admin"
      },
      list:["1","2","3"],
      books:[
        {"name":"book1","price":"100"},
        {"name":"book2","price":"300"},
        {"name":"book3","price":"250"}
      ],
      flag: true,
      baidu: "http://logo.baidu.com/images/logo.png",
      goods_title:"商品列表",
      goods:[
        {
          "cate":"books",
          "list":[
            {"name":"book2","price":"300"},
            {"name":"book2","price":"250"}]
        },
         {
          "cate":"foods",
          "list":[
            {"name":"food1","price":"22"},
            {"name":"food2","price":"66"}]
        }
      ],
      html_h2: "<h2>ttt</h2>"
    }
  },methods:{
      showName(){
        alert('This is ' + this.user.name)
      },
      changeName(){
        this.user.name = "SuperAdmin"
      },
      showPwd(){
        // 获取 ref 定义的dom节点
        alert('pwd:'+this.$refs.pwd.value)
        this.$refs.pwd.type="text"
      },
      hiddenPwd(){
        this.$refs.pwd.type="password"
      },
      eventFun(e){
        console.log(e)
        if(this.event_state === true){
          e.toElement.style.background='red'
          this.event_state = false
        }else{
          e.toElement.style.background='blue'
          this.event_state = true
        }
      }
  }
}
</script>

<style lang="scss">
.ccc_b{
  background: #cccccc
}
.blue_b{
  background: blue
}
.red_b{
  background: red
}
.ccc_c{
  color: #cccccc
}
.blue_c{
  color: blue
}
.red_c{
  color: red
}
</style>
