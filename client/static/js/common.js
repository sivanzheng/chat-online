/*import axios from 'axios'

//公共请求方法，返回promise对象
const instance = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    baseURL: 'http://testh5.huaqiaobao.cn',
    timeout: 50000
})

export const ajax = function(url, params, type, callback) {
  console.log(params)
    return new Promise((resolve, reject) => {
        instance({
            url: url,
            method: type,
            params: params
        })
        .then(res => {
          console.log(res)
          resolve(res.data)
        })
        .catch(err => {
          console.log(err)
          reject(err);
        })
    })
}*/

export const getUrl = function(url){
  var index = url.lastIndexOf("\/")
  return url.substring(index + 1, url.length)
} 
