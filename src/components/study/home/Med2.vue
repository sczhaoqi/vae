<template>
    <div>
        <button @click="emitHeader()">广播数据</button>
    </div>
</template>

<script>
import VueEvent from '../../common/vueEvent'
export default {
    data(){
        return {
            location: "模块2"
        }
    },methods:{
        emitHeader(){
            VueEvent.$emit('body-to-header',this.location)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
