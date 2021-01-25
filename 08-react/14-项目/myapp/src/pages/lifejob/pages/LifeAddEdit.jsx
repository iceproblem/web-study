import React, { Component } from 'react'
import {Card, Form, Input, Select, Button,message} from 'antd'
import { getObj } from "../../../tools/cache-tool"

import LikeUploadImg from '../../../components/UploadImg'
import RichTextEditor from '../../../components/rich-text-editor'

import { getJobPre,getJobFamily,addJob,editJob } from "../../../api/lifejobApi"
import { getUser } from "../../../api/adminApi"
import Moment from "moment"


const { Option } = Select;

export default class AddEditLift extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageUrl: '',  // 人生封面图
            focusImageUrl:'',  // 焦点图
            job_pre:[], // 学前所属分类
            job_family:[], // 所属家园分类
            jog_id:'',
            job_content:''
        }

        this.job_lift_ref = React.createRef();
        this.job_form_ref = React.createRef();
    }

    componentDidMount(){
        // 获取存储的标志
        let tag = getObj("life_job_tag")
        // console.log(tag);
        if(tag === "edit" && !this.props.location.state){
            // 点击了编辑，但是没有传递过来数据
            // console.log(this.props.location.state.job);
            this.props.history.goBack();
        }
        if(tag === "edit" && this.props.location.state){
            // 点击了编辑，并且传递过来数据
            let jobItem = this.props.location.state.job
            console.log(jobItem);
            if(jobItem){
                // 实现数据回显
                this.job_form_ref.current.setFieldsValue(jobItem);
                this.setState({
                    imageUrl:jobItem.job_img, 
                    focusImageUrl:jobItem.focus_img, 
                    job_id:jobItem.id, 
                    job_content:jobItem.job_content
                })
            }
        }

        // 获取学前所属分类
        getJobPre().then(result=>{
            if(result && result.status === 1){
                this.setState({
                    job_pre:result.data
                })
            }
        }).catch(err=>{
            message.error("获取学前所属分类失败")
        })

        // 获取所属家园分类
        getJobFamily().then(result=>{
            if(result && result.status === 1){
                this.setState({
                    job_family:result.data
                })
            }
        }).catch(err=>{
            message.error("获取所属家园分类失败")
        })
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
        let onFinish = values =>{
            console.log(values);
            let { imageUrl,focusImageUrl,job_id } = this.state;
            console.log( imageUrl,focusImageUrl);

            let job_time = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            let job_content = this.job_lift_ref.current.getContent(); // 富文本中的内容


            // 调用接口实现添加人生资源
            if(job_id){
                // 编辑   因为点击编辑时，先实现数据回显，到时候直接给job_id赋值
                editJob(getUser().token, job_id, values.job_name, imageUrl,values.job_author, job_time,job_content, values.job_pre_edu_id,  values.job_family_edu_id, focusImageUrl).then(result=>{
                    // console.log(result);
                    if(result && result.status === 1){
                        message.success("修改人生资源成功！")
                        this.props.history.goBack();
                    }
                 }).catch(err=>{
                     message.err("修改人生资源失败！")
                 })
            }else{
                // 添加
                addJob(getUser().token, values.job_name, imageUrl,values.job_author, job_time,job_content, values.job_pre_edu_id,  values.job_family_edu_id, focusImageUrl).then(result=>{
                    // console.log(result);
                    if(result && result.status === 1){
                        message.success("添加人生资源成功！")
                        this.props.history.goBack();
                    }
                 }).catch(err=>{
                     message.err("添加人生资源失败！")
                 })
            }
        }
        let { job_pre,job_family,imageUrl, focusImageUrl,job_content } = this.state;
        return (
            <Card title={ getObj("life_job_tag") !== "edit" ? "新增人生资源" : "编辑人生资源" }>
                <Form  {...formItemLayout} onFinish={ onFinish } ref={this.job_form_ref}>
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
                            {
                                job_pre && job_pre.map(item=>{
                                    return (
                                        <Option value={item.id} key={item.id}>{item.pre_edu_name}</Option>           
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="所属家园分类"
                        name="job_family_edu_id"
                        rules={[{ required: true, message: '请选择所属家园分类!' }]}
                    >
                        <Select placeholder={"请选择所属家园分类"}   style={{width: 200}}>
                            {
                                job_family && job_family.map(item=>{
                                    return (
                                        <Option value={item.id} key={item.id}>{item.job_family_name}</Option>           
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="人生封面图"
                        name="job_img"
                    >
                        <LikeUploadImg
                            upLoadBtnTitle={"上传封面图"}
                            upLoadName={"job_img"}
                            upImage={ imageUrl }
                            upLoadAction={"/api/auth/lifejob/upload_life_job"}
                            successCallBack={(imgUrl)=>{
                                this.setState({
                                    imageUrl:imgUrl
                                })
                            }}
                           />
                    </Form.Item>
                    <Form.Item
                        label="焦点图"
                        name="focus_img"
                    >
                        <LikeUploadImg
                            upLoadBtnTitle={"上传焦点图"}
                            upLoadName={"job_img"}
                            upImage={ focusImageUrl }
                            upLoadAction={"/api/auth/lifejob/upload_life_job"}
                            successCallBack={(imgUrl)=>{
                                this.setState({
                                    focusImageUrl:imgUrl
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="职场人生内容"
                        name="job_content"
                        wrapperCol={{span: 20}}
                    >
                        <RichTextEditor 
                             ref={this.job_lift_ref}
                             uploadName="job_img"
                             uploadAction="/api/auth/lifejob/upload_left_job"
                             htmlContent={ job_content }
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{span: 16}}
                    >
                        <div style={{textAlign: 'center', marginTop: 30}}>
                            <Button type={"primary"}  htmlType="submit" style={{marginRight: 15}}>保存</Button>
                            <Button onClick={()=>{this.props.history.goBack()}}>取消</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
