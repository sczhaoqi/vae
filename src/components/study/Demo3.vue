<template>
  <div>

    <button @click="getData()">获取数据</button>
    <button @click="clearData()">清除数据</button>
    <hr>
    <ul>
        path 传值
        <ol v-for="(good,key) in goods" :key="'demo3_ol_'+key">
          <router-link :to="'/study/details/'+key">{{good.name}} | {{good.price}}</router-link>
        </ol>
        Get 传值
         <li v-for="(good,key) in goods" :key="'demo3_li_'+key">
          <router-link :to="'/study/details?gid='+key">{{good.name}} | {{good.price}}</router-link>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      title: "demo2",
      desc: "resource 用法",
      goods: [{name:"g1",price:123},{name:"g2",price:234},{name:"g3",price:456}],
    }
  },
  methods:{
    
    getData(){
    },
     clearData(){
      this.goods = []
    }
  },mounted(){
    this.getData();
  }
}
</script>

<style lang="scss" scoped>

</style>

