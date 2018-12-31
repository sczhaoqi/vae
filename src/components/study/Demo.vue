
<template>
    <div>
        <v-med :title='title' :hello="hello"></v-med>
        <hr>
        <v-med2></v-med2>
        <hr>
    </div>
</template>

<script>
import Med from './home/Med.vue';
import Med2 from './home/Med2.vue';

export default {
    data(){
        return {
            title: "模块2"
        }
    },
    components:{
        'v-med': Med,
        'v-med2': Med2,
    },
    mounted(){
        console.log("lifecycle function")
    },methods:{
        hello(data){
            alert("hello " + data)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


