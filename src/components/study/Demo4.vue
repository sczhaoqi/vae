<template>
  <div class="demo2-root">
    <div class="demo2-sticky-header">
      <button @click="getData()">获取数据</button>
      <button @click="clearData()">清除数据</button>
    </div>
    <div class="scroll-content">
      <!-- set height, 固定表头 -->
      <el-table
        :data="goods"
        border
        height="60px" 
        v-loading="isLoading"
        element-loading-text="拼命加载中..."
        @sort-change="tableSortChange"
        @selection-change="tableSelectionChange">
        <el-table-column
          type="selection"
          width="60"
          prop="index"
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名">
            <template slot-scope="scope">
            <el-popover
              placement="bottom-start"
              :title="scope.row.name"
              :content="scope.row.details"
              width="200"
              trigger="hover"
              v-model="scope.row.visible">
              <span slot="reference">{{scope.row.name}}</span>
              <el-button @click="handleClick(scope.row)" type="text" slot="reference" size="mini" icon="el-icon-view"></el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="catalog"
          label="类别">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120px">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="mini" icon="el-icon-edit"></el-button>
            <el-button @click="deleteClick(scope.row)" type="danger" size="mini" icon="el-icon-delete"></el-button>
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
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="编辑货品" :visible.sync="editFormVisible">
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类别" :label-width="formLabelWidth">
          <el-select v-model="form.catalog" placeholder="请选择类别">
            <el-option label="类别1" value="1"></el-option>
            <el-option label="类别2" value="2"></el-option>
            <el-option label="类别3" value="3"></el-option>
            <el-option label="类别4" value="4"></el-option>
            <el-option label="类别5" value="5"></el-option>
            <el-option label="类别6" value="6"></el-option>
            <el-option label="类别7" value="7"></el-option>
            <el-option label="类别8" value="8"></el-option>
            <el-option label="类别9" value="9"></el-option>
            <el-option label="类别10" value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.details" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormVisible = false;editSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
      title: "demo2",
      desc: "resource 用法",
      goods: [],
      pagesize: 10, 
      total: 0, 
      currentPage:1,
      isLoading: false,
      dialogFormVisible: false,
      editFormVisible: false,
      form: {
        id: '',
        name: '',
        details: '',
        price: '',
        catalog: '',
      },
      tmpForm: '',
      formLabelWidth: '120px'
    }
  },
  components:{
  },
  methods:{
    
    getData(){
      // var api ='https://sczhaoqi.com/api.php?n=100';  
      this.isLoading = true;
      this.$api.listPagedGoods(this.currentPage,this.pagesize).then(res => {
        if(res.data && res.data.list){
          this.goods = res.data.list;
          this.total = res.data.total;
        }
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
      });
    },
     clearData(){
      this.goods = []
    },
    handleClick(row){
      this.form = JSON.parse(JSON.stringify(row))
      this.tmpForm = row
      this.editFormVisible = true;
    },
    deleteClick(row){
      this.$confirm('删除\''+row.name+'\', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.delete(row.id).then((res) =>{
          this.$message({
            type: 'success',
            message: res.msg
          });
          // 重新请求当前页数据
          this.getData()
        }).catch((error) =>{
           this.$message({
            type: 'error',
            message: error
          });  
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    handleSizeChange(val) {
      this.pagesize =val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    tableSortChange(){

    },
    tableSelectionChange(){

    },
    editSubmit(){
      // 修改前后一致
      if(this.tmpForm.name === this.form.name
      &&  this.tmpForm.price === this.form.price
      &&  this.tmpForm.catalog === this.form.catalog
      &&  this.tmpForm.details === this.form.details){
        console.log('not have any modified')
      }else{
        console.log(this.form)
        this.$api.update(this.form).then((res)=>{
          this.$message({
              type: 'success',
              message: res.msg})
          this.update()
        })
      }
    },
    update(){
      this.tmpForm.name = this.form.name
      this.tmpForm.price = this.form.price
      this.tmpForm.catalog = this.form.catalog
      this.tmpForm.details = this.form.details
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
.scroll-content{
  // background: red;
  padding: 10px;
  // width: 100%;
  display: -webkit-flex;
  flex: 1;
  flex-direction: column;
}
/*滚动条样式*/
//滚动条的宽度
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
//滚动条的滑块
::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 3px;
}
.page-div{
  max-width: 800px;
  align-self: center;
}
</style>

