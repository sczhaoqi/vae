<template>
  <el-container class="root-container">
    <el-header>
      <div class="app-header-content">
      头部
      </div>
     </el-header>
     <hr>
    <el-container>
      <el-aside style="width:auto;display:flex">
        <div class="aside-content">
          <el-tooltip class="item app-side-tool" effect="dark" :content="isCollapse ? '点击展开菜单':'点击关闭菜单'" placement ="right">
            <el-button  ref='appSideTool' :class="[{'el-icon-d-arrow-right': isCollapse },{'el-icon-d-arrow-left': !isCollapse }]" @click="changeCollapse" size="mini"></el-button >
          </el-tooltip>
          <el-menu :default-active="$route.path != '/'?$route.path :'/home' " class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
            router>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                  <el-menu-item index="/study" key="home">首页</el-menu-item>
                  <el-menu-item index="/study/demo1" key="demo1">示例1</el-menu-item>
                  <el-menu-item index="/study/demo2" key="demo2">示例2-前端分页</el-menu-item>
                  <el-menu-item index="/study/demo3" key="demo3">示例3</el-menu-item>
                  <el-menu-item index="/study/demo4" key="demo4">示例4-后端分页</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main >
        <div class ="center-content">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
      <div class="app-footer">
        <div class="app-footer-content">Footer</div>
      </div>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: true
    }
  },
  methods:{
    handleOpen(){

    },
    handleClose(){

    },
    changeCollapse(){
      this.isCollapse = !this.isCollapse;
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header-content{
  display: flex;
  height: 100%;
  margin: 2px 0 0 0;
  background: gainsboro;
}
.root-container{
  height:100vh;
  display: flex;
}
.aside-content{
  display: flex;
  flex: 1;
  flex-direction: column;
}
.el-menu-vertical-demo{
  flex: 1;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.app-footer{
  width: 100%;
  flex:0 0 auto;
  min-height: 60px;
  display: flex;
  justify-content: center;
}
.app-footer-content{
  width: 98%;
  background: lightslategray;
  margin: 5px 0 2px 0;
  border-radius:3px 3px 3px 3px;
}
.center-content{
  // border:2px solid red;
  flex: 1;
  //总宽度width=设置的width+边框+间距,边框和间距会自动调整宽度
  box-sizing:border-box;
  height: 100%;
}
</style>
