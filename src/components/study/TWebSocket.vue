
<template>
    <div>
        <h2>{{title}}</h2>
        <hr>
        <div>
            {{content}}
        </div>
        <hr>
        <el-form>
            <el-form-item label="message">
                <el-input type="textarea" v-model="message"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即发送</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    components:{
    },
    data(){
        return {
            title: "WebSocket",
            message: "",
            content: "",
        }
    },
    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        customEmit: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)'+data)
        }
    },
    mounted(){
        console.log("lifecycle function")
        this.sockets.subscribe('EVENT_NAME', (data) => {
            this.content += data.message;
        });
        //this.sockets.unsubscribe('EVENT_NAME');
    },methods:{
        hello(data){
            alert("hello " + data)
        },
        onSubmit() {
            console.log('submit!'+ this.message);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


