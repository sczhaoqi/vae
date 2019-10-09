import axios from 'axios';
import { Message } from 'element-ui';

axios.defaults.timeout = 5000;
axios.defaults.baseURL ='http://localhost:8081/api'; //填写域名
// axios.defaults.baseURL ='https://www.sczhaoqi.com'; //填写域名

//http request 拦截器
axios.interceptors.request.use(
    config => {
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type':'application/json',
        };
        let token = sessionStorage.getItem('token')
        if (token) {
            config.headers.Authorization = 'Bearer '+ token;
        }
        // console.log( config)
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    return response;
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
        case 400:
            Message('错误请求');
            break;
        case 401:
            Message({
                type: 'error',
                message: '授权失败，请重新登录'});
            break;
        case 403:
            Message('拒绝访问');
            break;
        case 404:
            Message('请求错误,未找到该资源');
            break;
        case 405:
            Message('请求方法未允许');
            break;
        case 408:
            Message('请求超时');
            break;
        case 500:
            Message('服务器端出错');
            break;
        case 501:
            Message('网络未实现');
            break;
        case 502:
            Message('网络错误');
            break;
        case 503:
            Message('服务不可用');
            break;
        case 504:
            Message('网络超时');
            break;
        case 505:
            Message('http版本不支持该请求');
            break;
        default:
            Message(`连接错误${err.response.status}`);
        }
    } else {
        Message('连接到服务器失败');
    }
    return Promise.resolve();
    // return Promise.resolve(err.response);
});


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function file(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params,
            responseType: 'blob',
        })
            .then(response => {
                const data = response.data;
                if (!data) {
                    return
                  }
                  let blob = new Blob([data])
                  let fileName = 'excel.xlsx'
                  if ('download' in document.createElement('a')) { // 不是IE浏览器
                    let url = window.URL.createObjectURL(blob)
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', fileName)
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link) // 下载完成移除元素
                    window.URL.revokeObjectURL(url) // 释放掉blob对象
                  } else { // IE 10+
                    window.navigator.msSaveBlob(blob, fileName)
                  }
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err);
            });
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err);
            });
    });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err);
            });
    });
}

/**
* 下面是获取数据的接口
*/
/** 
* 测试接口
* 名称：exam
* 参数：paramObj/null
* 方式：fetch/post/patch/put
*/
export const server = {
    exam: function(paramObj){
        return fetch('/api.php?n=100', paramObj);
    }
};
