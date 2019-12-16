import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from "prop-types";
const Item = Form.Item;
class UpdateForm extends Component {
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired,
    }

    componentWillMount() {
        //将form对象通过setForm()方法传递给父组件
        this.props.setForm(this.props.form);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { categoryName } = this.props;
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: categoryName
                        })(
                            <Input placeholder="请输入更新的分类名称" />
                        )
                    }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(UpdateForm);