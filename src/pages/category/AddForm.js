import React, { Component } from 'react';
import { Form, Select, Input} from 'antd';
import PropTypes from "prop-types";

const Item = Form.Item;
const Option = Select.Option;
class AddForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
        category: PropTypes.array.isRequired, //一级分类的数组
        parentId: PropTypes.string.isRequired,//父分类的ID
    }
    componentWillMount() {
        this.props.setForm(this.props.form);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { category, parentId } = this.props;
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId', {
                            initialValue: parentId
                        })(
                            <Select>
                                <Option value="0">一级分类</Option>
                                {
                                    category.map(item => <Option value={item._id}>{item.name}</Option>)
                                }
                            </Select>
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('categoryName', {
                        })(
                            <Input placeholder="请输入分类名称"></Input>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm);