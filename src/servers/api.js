import * as server from './http.js';
 
const api= {
  // 登陆
  login(data) {
    return server.post('/user/login', data)
  },
  // 登出
  logout() {
    return server.fetch('/user/logout')
  },
  // 数据
  listGoods(data){
    return server.fetch('/goods',data)
  },
  listPagedGoods(pageNum,pageSize){
    return server.fetch('/goods',{"pageNum":pageNum,"pageSize":pageSize})
  },
  findByGoodsId(id){
    return server.fetch('/goods/find',{"id":id})
  },
  update(data){
    return server.post('/goods/update', data)
  },
  delete(id){
    return server.fetch('/goods/delete', {"id":id})
  },
  download(){
    return server.file('/file/down')
  },
}
 
export default api
