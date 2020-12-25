import { timeOut } from "./config"

export default function ajax(options){
    return new Promise((resove,reject)=>{
        wx.request({
          url: options.url,
          timeout:timeOut,
          method:options.method,
          data:options.data,
          success:res=>{
              resove(res.data)
          },
          fail:err=>{
              reject(err)
          }
        })
    })
}

























