<template>
    <div class="login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        
        <el-form-item label="账号" prop="username" >
          <el-input prefix-icon='iconfont icon-yonghu' v-model="ruleForm.username" autocomplete="on" @change="checkValid"></el-input>
        </el-form-item>
 
        <el-form-item label="密码" prop="password">
          <el-input prefix-icon='iconfont icon-suoding' type="password" v-model="ruleForm.password" autocomplete="on" @change="checkValid"></el-input>
        </el-form-item>
        <div>
            <el-checkbox v-model="checked" class="remember" >一周内自动登录</el-checkbox>
            <span class="forget-password" @click="clearCookie">忘记密码？</span>
        </div>
 
        <el-form-item>
          <el-button 
          type="primary" 
          class="submitBtn"
          @click.native.prevent="submitForm('ruleForm')"
          :disabled="!isValid"
          :loading="isLoging">登录</el-button>
        </el-form-item>
      </el-form>
      <hr>
      <p>还没有账号，马上去<span class="to" @click="toregin">注册</span></p>
    </div>
 
 
</template>
 
<script>
import * as types from '../stores/types'
import '../assets/icons/iconfont.css'
export default {
   components:{
   },
   data() {
      return {
        userIcon: require('../assets/img/yonghu.png'),
        pwdIcon: require('../assets/img/suoding.png'),
        ruleForm: {
          username: '',
          password:''
        },
        isLoging: false,
        isValid: false,
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
          ]
        },
        checked: false
      };
    },
    //页面加载调用获取cookie值
    mounted() {
        this.getCookie();
        this.checkValid();
    },
    methods: {
      submitForm(formName) {
        let _this = this
        this.$refs[formName].validate((valid) => {
         if (valid) {
            this.isLoging = true;
            const self = this;
            //判断复选框是否被勾选 勾选则调用配置cookie方法
            if (self.checked == true) {
                //传入账号名，密码，和保存天数3个参数
                self.setCookie(self.ruleForm.username, self.ruleForm.password, 7);
            } else {
              console.log("清空Cookie");
              //清空Cookie
              self.clearCookie();
            }

            _this.$api.login({username:self.ruleForm.username,password:self.ruleForm.password}).then((data) =>{
              if(data.code && data.code === 200){
                this.$store.commit(types.LOGIN, data.data)
                 this.$message({
                  type:'success',
                  message: '登陆成功' 
                })
              }else{
                this.$message({
                  type:'error',
                  message: data.msg 
                })
              }
              this.isLoging = false;
            }, () => {this.isLoging = false;}).then(() =>{
              let redirect = this.$route.query.redirect
              if(redirect && this.$route.query.redirect != ''){
                this.$router.replace({ path: this.$route.query.redirect,params:{user:self.ruleForm.username,pwd:self.ruleForm.password}});
              }else{
                this.$router.replace({ path: '/'});
              }
            })
          } else {
            console.log('error submit!!');
            this.isLoging = false;
            return false;
          }
        });
      },
      checkValid(){
        let uname = this.ruleForm.username.length
        let upwd = this.ruleForm.password.length
        if(uname >=5 && upwd>= 5 && uname <= 16 && upwd <= 16){
          this.isValid = true;
        }else{
          this.isValid = false;
        }
      },
      toregin () {
        this.$router.push('/regin')
      },
      //设置cookie
      setCookie(c_name, c_pwd, exdays) {
          var exdate = new Date(); //获取时间
          exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
          //字符串拼接cookie
          window.document.cookie = "username" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
          window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie: function() {
          if (document.cookie.length > 0) {
              var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
              for (var i = 0; i < arr.length; i++) {
                  var arr2 = arr[i].split('='); //再次切割
                  //判断查找相对应的值
                  if (arr2[0] == 'username') {
                    //  console.log(arr2[1])
                      this.ruleForm.username = arr2[1]; //保存到保存数据的地方
                  } else if (arr2[0] == 'password') {
                    // console.log(arr2[1])
                      this.ruleForm.password = arr2[1];
                  }
              }
               this.checked = true;
          }
      },
      //清除cookie
      clearCookie: function() {
          this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      }
    }
  }
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  margin: 20px auto;
  width: 310px;
  background: #fff;
  box-shadow: 0 0 35px #B4BCCC;
  padding: 30px 30px 0 30px;
  border-radius: 5px; 
}
.submitBtn {
  width: 100%;
}
.to {
  color: #67C23A;
  cursor: pointer;
}
.forget-password{
  float: right;
  cursor: pointer;
  color: #f19149;
  font-size: 0.75rem;
}
.remember{
  color:#a0a0a0;
}
.rf{
  float:right;
}
.clearfix:after {
  content:"."; 
  display:block; 
  height:0; 
  visibility:hidden; 
  clear:both; 
}
.clearfix { 
  *zoom:1; 
}
</style>
