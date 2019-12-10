import React, { Component } from 'react'
import './header.css';
import {formateDate} from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {reqWeather} from '../../api';
import {withRouter} from 'react-router-dom';
import { Modal } from 'antd';

class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl:'', 
        weather:''
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({currentTime: formateDate(Date.now())})
        }, 1000);

        this.getWeather();
    }
    componentWillUnmount() {
        //当前组件卸载之前调用
        clearInterval(this.timer);
    }
    getWeather = async () => {
        const {dayPictureUrl, weather} = await reqWeather("成都");
        this.setState({dayPictureUrl, weather})
    }

    getTitle = ()=> {
        //得到当前请求路径
        const path = this.props.location.pathname;
        return path.slice(1);
    }
    logout = ()=> {
        /**
         * 退出登陆
         */
        Modal.confirm({
            content: '确定退出吗？',
            onOk: ()=> {
                memoryUtils.user = {};
                storageUtils.removeUser();
                this.props.history.replace('/login');
            },
            onCancel() {}
          })
    }
    render() {
        const {currentTime, dayPictureUrl, weather} = this.state;
        const {username} = memoryUtils.user;
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎， {username}</span>
                    <a href="javascript:" onClick={this.logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{this.getTitle()}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather" style={{ padding: '20px' }}/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header);