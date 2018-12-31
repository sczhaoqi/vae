<template>
  <div>

    <button @click="getData()">获取数据</button>
    <button @click="clearData()">清除数据</button>
    <hr>
    <ul>
        <li v-for="(good,key) in goods" :key="key">
          {{key}} | {{good.name}} | {{good.price}}
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      title: "details",
      desc: "resource 用法",
      goods: [],
    }
  },
  methods:{
    
    getData(id){
      var gid = id + 1
      var api ='https://sczhaoqi.com/api.php?n='+ gid;  
      console.log(api)
      this.$http.get(api).then((response) => {
        console.log(response.body)
        this.goods = response.body
      },function(err){
        console.log("获取数据失败"+err)
      })
    },
     clearData(){
      this.goods = []
    }
  },mounted(){
      // 获取 path 参数
    if(this.$route.params.gid){
        this.getData(this.$route.params.gid);
    }
    // 获取 get 参数
     if(this.$route.query.gid){
        this.getData(this.$route.query.gid);
     }
  }
}
</script>

<style lang="scss" scoped>

</style>

