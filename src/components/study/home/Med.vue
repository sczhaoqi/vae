<template>
    <div>
        模块1
     <h2>{{title}}</h2>
     <input type="text" v-model="name">
     <button @click="hello(name)">hello</button>
     <textarea v-model="location"></textarea>
    </div>
</template>

<script>
import VueEvent from '../../common/vueEvent'
export default {
    data(){
        return{
            name:'',
            location: '模块1'
        }
    }, 
    // 父组件传递的 值 或 方法
    props: ['title','hello'],
    mounted(){
        var _this = this;
        VueEvent.$on('body-to-header',function(data){
            _this.location = data
            console.log(data)
        })
    }
}
</script>

<style lang="scss" scoped>

</style>
