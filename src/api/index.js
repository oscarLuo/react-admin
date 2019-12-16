/**
 * 可以根据接口文档定义接口请求
 * 包含应用中所有接口请求函数的模块
 */
import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';

const method = {
    post: 'POST',
    get: 'GET',
    delete: 'DELETE',
    put: 'PUT'
}
//登陆
export const reqLogin = (username, password) => ajax('/login', {username, password}, method.post);

//添加用户
export const reqAddUser = (user)=> ajax('/manage/user/add', user, method.post);

//请求分类列表
export const reqCategory = (parentId) => ajax('/manage/category/list', {parentId}, method.get);

//添加分类列表
export const reqAddCategory = ({parentId, categoryName}) => ajax('/manage/category/add', {parentId, categoryName}, method.post);

//添加分类列表
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax('/manage/category/update', {categoryId, categoryName}, method.post);


//jsonp请求天气接口请求函数
export const reqWeather = (city) => {
    /**
     * 处理跨域GET请求，不是Ajax请求，是一般的GET请求
     * 浏览器端通过动态生成<script>来请求后台接口（src就是接口的url）
     * 定义好用于接受响应数据的函数（fn），并将函数名通过请求参数提交给后台（如：callback=fn）
     * 服务器端接收到请求处理产生结果数据后，返回一个函数调用的js代码，并将结果数据作为实参传入函数调用
     * 浏览器端收到响应自动执行函数调用的js代码，也就执行了提前定义好的回调函数，并得到了需要的结果数据
     */
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        //发送jsonp请求
        jsonp(url, {}, (err, result)=> {
            if (!err && result.status ==='success') {
                const {dayPictureUrl, weather} = result.results[0].weather_data[0];
                resolve({dayPictureUrl, weather});
            } else {
                message.error('获取天气信息失败');
            }
        });
    })
}

reqWeather('成都')