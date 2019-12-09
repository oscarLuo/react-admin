import axios from 'axios';
import {message} from 'antd';
/***
 * 封装axios库
 * 函数返回值是promise对象
 * 统一处理请求异常
 */
export default function ajax(url, data={}, method="GET") {
    return new Promise((resolve, reject) => {
        let promise;
        switch (method) {
            case 'GET':
                promise = axios.get(url, {
                    //指定请求参数的配置
                    params: data
                }, method);
                break;
            case 'POST':
                promise = axios.post(url, data, method);
                break;
            default:
                break;
        }

        promise.then(response => {resolve(response.data);}).catch(error => message.error(`请求出错了 ${error.message}`));
    });
}
