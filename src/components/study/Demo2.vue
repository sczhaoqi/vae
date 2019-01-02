<template>
  <div class="demo2-root">
    <div class="demo2-sticky-header">
      <button @click="getData()">获取数据</button>
      <button @click="clearData()">清除数据</button>
    </div>
    <VueScrollbar class="scroll-area">
      <div class="scroll-content">
        <el-table
          style="flex:1;width:100%;"
          :data="goods.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          stripe
          border
          v-loading="isLoading"
          element-loading-text="拼命加载中..."
          @sort-change="tableSortChange"
          @selection-change="tableSelectionChange">
          <el-table-column
            type="selection"
            width="60"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名">
          </el-table-column>
          
          <el-table-column
            prop="price"
            label="价格">
          </el-table-column>
          <el-table-column
            label="操作"
            width="250">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="primary" size="mini" icon="el-icon-view"></el-button>
              <el-button @click="handleClick(scope.row)" type="primary" size="mini" icon="el-icon-edit"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="page-div">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagesize"
            background
            layout="total, sizes, -> ,prev, pager,next, jumper"
            :total="goods.length">
          </el-pagination>
        </div>
      </div>
    </VueScrollbar>
  </div>
</template>

<script>
import 'vue2-scrollbar/dist/style/vue2-scrollbar.css';
import VueScrollbar from 'vue2-scrollbar';

export default {
  data(){
    return {
      title: "demo2",
      desc: "resource 用法",
      goods: [],
      pagesize: 10,  
      currentPage:1,
      isLoading: false,
    }
  },
  components:{
    VueScrollbar
  },
  methods:{
    
    getData(){
      // var api ='https://sczhaoqi.com/api.php?n=100';  
      this.isLoading = true;
      setTimeout(() =>
      this.$api.listGoods({'n':100}).then(res => {
        if(res.data && res.data.list){
          this.goods = res.data.list;
        }
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
      }),1000);
    },
     clearData(){
      this.goods = []
    },
    handleClick(row){
      console.log(row)
    },
    handleSizeChange(val) {
      this.pagesize =val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    tableSortChange(){

    },
    tableSelectionChange(){

    }
  },mounted(){
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
.el-table .el-table-column{
  max-width: 120px;
}
.demo2-root{
  height: 100%;
  display: flex;
  flex-direction: column;
}
.demo2-sticky-header{
  height: 40px;
}
.scroll-area {
  margin: auto;
  flex: 1;
  width: 100%;
}
.scroll-content{
  // background: red;
  padding: 10px;
  // width: 100%;
  display: flex;
  flex-direction: column;
}
.page-div{
  max-width: 800px;
  align-self: center;
}
</style>

