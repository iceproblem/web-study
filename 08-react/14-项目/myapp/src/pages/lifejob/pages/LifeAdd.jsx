import React, {Component} from 'react';
import {Card, Form, Input, Select, Button} from 'antd'

import LikeUploadImg from './../../../components/UploadImg'
import RichTextEditor from './../../../components/rich-text-editor'

const { Option } = Select;

class LifeAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: ''
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 3 }
            },
            wrapperCol: {
                xs: { span: 12 }
            },
        };

        return (
            <Card title="新增人生资源">
                <Form  {...formItemLayout}>
                    <Form.Item
                        label={"人生名称"}
                        name = "job_name"
                        rules={[{ required: true, message: '请输入职场人生名称!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"人生作者"}
                        name = "job_author"
                        rules={[{ required: true, message: '请输入作者姓名!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="学前所属分类"
                        name="job_pre_edu_id"
                        rules={[{ required: true, message: '请选择学前所属分类!' }]}
                    >
                        <Select placeholder={"请选择学前所属分类"} style={{width: 200}}>
                            <Option value="1">教学活动小助手</Option>
                            <Option value="2">亲子小学堂</Option>
                            <Option value="3" >培训教室</Option>
                            <Option value="4">GT课程</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="所属家园分类"
                        name="job_family_edu_id"
                        rules={[{ required: true, message: '请选择所属家园分类!' }]}
                    >
                        <Select placeholder={"请选择所属家园分类"}   style={{width: 200}}>
                            <Option value="1">托班</Option>
                            <Option value="2">小班</Option>
                            <Option value="3">中班</Option>
                            <Option value="4">大班</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="人生封面图"
                        name="job_img"
                        rules={[{ required: true, message: '请选择人生封面图!' }]}
                    >
                        <LikeUploadImg
                            upLoadBtnTitle={"上传封面图"}
                            upLoadName={"job_img"}
                            upLoadAction={"#"}
                            successCallBack={()=>{}}
                        />
                    </Form.Item>
                    <Form.Item
                        label="焦点图"
                        name="focus_img"
                    >
                        <LikeUploadImg
                            upLoadBtnTitle={"上传焦点图"}
                            upLoadName={"job_img"}
                            upLoadAction={"#"}
                            successCallBack={()=>{}}
                        />
                    </Form.Item>
                    <Form.Item
                        label="职场人生内容"
                        name="job_content"
                        wrapperCol={{span: 20}}
                        rules={[{ required: true, message: '请输入职场人生内容!' }]}
                    >
                        <RichTextEditor />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{span: 16}}
                    >
                        <div style={{textAlign: 'center', marginTop: 30}}>
                            <Button type={"primary"} style={{marginRight: 15}}>保存</Button>
                            <Button onClick={()=>{this.props.history.goBack()}}>取消</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default LifeAdd;
