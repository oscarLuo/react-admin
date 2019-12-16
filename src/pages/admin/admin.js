import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Home from '../home/Home';
import Category from '../category/Category';
import Product from '../product/Product';
import Role from '../role/Role';
import User from '../user/User';
import Bar from '../chart/Bar';
import Line from '../chart/Line';
import Pie from '../chart/Pie';
import Header from '../../components/header/Header'
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        if (!user || !user._id) {
            //自动跳转到登陆（在render()中）
            return <Redirect to="/login" />
        }
        return (
            <Layout id="adminPage">
                <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="home">
                            <Link to="/home">
                                <Icon type="home" />
                                <span className="nav-text">首页</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu
                            key="products"
                            title={
                                <span>
                                    <Icon type="mail" />
                                    <span>商品</span>
                                </span>
                            }
                            >
                            <Menu.Item key="1"><Link to="/category">品类管理</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/product">商品管理</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="user">
                            <Link to="/user">
                                <Icon type="user" />
                                <span className="nav-text">用户管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="role">
                            <Link to="/role">
                                <Icon type="transaction" />
                                <span className="nav-text">角色管理</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu
                            key="charts"
                            title={
                                <span>
                                    <Icon type="mail" />
                                    <span>图形</span>
                                </span>
                            }
                            >
                            <Menu.Item key="1"><Link to="/charts/bar"><Icon type="bar-chart" />柱状图</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/charts/line"><Icon type="line-chart" />线型图</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/charts/pie"><Icon type="pie-chart" />饼状图</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '20px' , backgroundColor: 'white'}}>
                        <Switch>
                            <Route path="/home" component={Home} title="主页"></Route>
                            <Route path="/category" component={Category}></Route>
                            <Route path="/product" component={Product}></Route>
                            <Route path="/role" component={Role}></Route>
                            <Route path="/user" component={User}></Route>
                            <Route path="/charts/bar" component={Bar}></Route>
                            <Route path="/charts/line" component={Line}></Route>
                            <Route path="/pie" component={Pie}></Route>
                            <Redirect to="/home" />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}
