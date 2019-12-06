import React, { Component } from 'react';
import './login.css';
import logo from './images/logo.svg';
import { Form, Icon, Input, Button } from 'antd';
/**
 * 登陆的路由组件
 */

class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    };
    validatePass = (rule, value, callback) => {
        console.log(rule, value);
        
        callback()//验证通过
        // callback('xxx')//验证失败，并指定提示的文本

        if (!value.trim()) {
            callback('密码必须输入');
        } else if (value.trim().length <=6) {
            callback('密码长度不能小于6');
        } else if (value.trim().length >=12) {
            callback('密码长度不能大于12');
        } else if (/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字下划线');
        } else {
            callback();
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React 项目： 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        {getFieldDecorator('username', {
                            //声明式验证
                            rules: [
                                { required: true,whitespace: true, message: '请输入有效的用户名' },
                                { min: 6, message: '用户名至少6位' },
                                { max: 20, message: '用户名最多20位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字下划线' }
                            ],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: '请输入密码！' },
                                { validator: this.validatePass }
                            ],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
// 高阶函数
    // 1) 一类特别的函数
        // a.接受函数类型的参数
        // b.返回值是函数
    // 2） 常见
        // 
// 高阶组件
    // 1）本质是一个函数
    // 2）接受一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定属性
    // 3）作用： 扩展组件的功能
/**
 * 包装Form组件生成一个新的组件： Form(Login)
 * 新组件会向Form组件传递一个强大的对象属性：form
 */
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm;
