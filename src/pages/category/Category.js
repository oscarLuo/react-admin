import React, { Component } from 'react';
import {Card, Table, Button, Icon, message} from 'antd';
import LinkButton from '../../components/link-button/LinkButton';
import {reqCategory, reqAddCategory, reqUpdateCategory} from '../../api/index';
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';
import { Modal } from 'antd';

export default class Category extends Component {
    state = {
        'category': [],
        'loading': false,
        'parentId': '0',//当前需要显示的分类列表的parentId，
        'parentName': '',
        'subCategory': [],
        'showStatus': 0, //标识添加/更新的确认框是否显示，0：都不显示，1：显示添加，2：显示修改/更新
    }
    initColumns = ()=> {
        this.columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',
              key: 'name',

            },
            {
              title: '操作',
              dataIndex: '', //指定显示数据对应的属性名
              key: 'age',
              width: 300,
              render: (category)=> (//返回需要显示的界面标签
                  <span>
                      <LinkButton onClick={() => {this.showUpdate(category)}}>修改分类</LinkButton>
                      {
                          this.state.parentId ==="0" ?
                            <LinkButton onClick={() => {this.showSubCategory(category)}}>查看子分类</LinkButton>:
                            null
                      }
                  </span>
              )
            }
          ];
    }
    showCategory = () => {
        /**
         * 显示一级分类列表
         */
        this.setState({
            parentId: "0",
            subCategory: [],
            parentName: ""
        })
    }
    showSubCategory = (category)=> {
        /**
         * 显示指定一级分类对象的二级分类列表
         */
        //先更新状态
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, ()=> {
            //在状态更新且重新render之后调用，setstate不能立即更新获取最新的状态： setstate是异步操作
            console.log('parent id ' + this.state.parentId);
            
            this.getCategoryData();
        })
    }
    getCategoryData = async (parentId)=> {
        //发送异步Ajax请求
        this.setState({
            'loading': true
        })
        parentId = parentId || this.state.parentId;
        const result = await reqCategory(parentId);
        this.setState({
            'loading': false
        })
        if(!result.status) {
            
            if(parentId === "0") {
                this.setState({
                    'category': result.data
                })
            } else {
                this.setState({
                    'subCategory': result.data
                })
            }
        } else {
            message.error('获取分类列表失败')
        }
        
    }
    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getCategoryData()
    }
    //点击取消，隐藏确认框
    handleCancel = () => {
        //清除，重置输入数据
        this.form.resetFields();
        this.setState({
            "showStatus": 0
        })
    }
    showAdd = () => {
        this.setState({
            "showStatus": 1
        })
    }
    showUpdate = (category) => {
        //保存分类对象
        this.category = category;
        this.setState({
            "showStatus": 2
        })
    }
    addCategory = async () => {
        const {parentId, categoryName} = this.form.getFieldsValue();
        const result = await reqAddCategory({parentId, categoryName});
        if(result.status ===0) {
            if (parentId === this.state.parentId) {
                //刷新数据,重新获取当前分类列表显示
                this.getCategoryData();
            } else if (parentId === '0') {
                this.getCategoryData(parentId);
            }
        }
        this.handleCancel();
    }
    updateCategory = async () => {
        //发送更新请求
        const categoryId = this.category._id;
        const categoryName = this.form.getFieldValue("categoryName");
        const result = await reqUpdateCategory({categoryId, categoryName});
        if(result.status ===0) {
            //刷新数据
            this.getCategoryData();
        }
        //关闭弹窗
        this.handleCancel();
    }
    render() {
        const extra = (
            <Button type="primary" onClick={this.showAdd}>
                <Icon type="plus"></Icon>
                添加
            </Button>
        )
        const {category, loading, subCategory, parentId, parentName, showStatus} = this.state;
        //读取指定的分类
        const { name } = this.category || {};
        const title = parentId === "0" ? '一级分类列表': (
            <span>
                <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>
                <Icon type='arrow-right'></Icon>
                &nbsp;
                <span>{parentName}</span>
            </span>
        );
        return (
            <div>
                <Card title={title} extra={extra} style={{ width: '100%' }}>
                    <Table 
                        dataSource={parentId === "0" ? category : subCategory}
                        columns={this.columns}
                        bordered 
                        rowKey='_id'
                        loading={loading}
                        pagination={{'defaultPageSize': 10}}/>;
                    
                    <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                    >
                        <AddForm 
                            category={category} 
                            parentId = {parentId} 
                            setForm={(form)=> {this.form = form}}/>
                    </Modal>
                    
                    <Modal
                    title="修改分类"
                    visible={showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                    >
                        <UpdateForm 
                            categoryName= {name} 
                            setForm={(form)=> {this.form = form}}/>
                    </Modal>
                </Card>
            </div>
        )
    }
}
