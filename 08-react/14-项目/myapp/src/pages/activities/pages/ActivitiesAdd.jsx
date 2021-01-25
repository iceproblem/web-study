import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Select,
    // Upload,
    message,
    Button,
    DatePicker
} from 'antd'

// 引入日期中国化
import locale from 'antd/es/date-picker/locale/zh_CN';
import Moment from "moment"
// 引入富文本编辑器
import RichTextEdit from "../../../components/rich-text-editor"
// 引入tag选择
import ActivitiesTag from '../../../components/z-tag'
import UploadImg from '../../../components/UploadImg'
// 引入api
import { addActivities,getActivitiesAddress,getActivitiesObject,getActivitiesBus } from "../../../api/activitiesApi";
import { getUser } from "../../../api/adminApi"

const { Option } = Select;
export default class ActivitiesAdd extends Component {
    constructor(props) {
        super(props);

        this.activities_intro_ref = React.createRef();
        this.activities_trip_ref = React.createRef();
        this.activities_days_ref = React.createRef();
        this.activities_notice_ref = React.createRef();

        // 默认数据（状态）
        this.state = {
            
            activities_address:[],   // 活动地点
            activities_object:[],    // 活动对象
            activities_bus:[],  // 选择营期
            activities_tag:[],   // 活动标签
            imageUrl:'',    // 活动封面图
            facusImgUrl:'', // 首页轮播图

        }
    }


    formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 12 },
    }

    componentDidMount(){
        // 获取活动地点
        getActivitiesAddress().then(result=>{
            // console.log(result);
            if(result && result.status === 1){
                this.setState({
                    activities_address:result.data
                })
            }
        }).catch(error=>{
            message.error("获取活动地点失败")
        })

        // 获取招生对象
        getActivitiesObject().then(result=>{
            // console.log(result);
            if(result && result.status === 1){
                this.setState({
                    activities_object:result.data
                })
            }
        }).catch(error=>{
            message.error("获取招生对象失败")
        })

        // 获取营期
        getActivitiesBus().then(result=>{
            // console.log(result);
            if(result && result.status === 1){
                this.setState({
                    activities_bus:result.data
                })
            }
        }).catch(error=>{
            message.error("获取营期失败")
        })

    }

    render() {
        let onFinish = values =>{
            let {imageUrl,facusImgUrl,activities_tag} = this.state;
            let tagStr = activities_tag.join(",")
            let activities_time = Moment(values.activities_time).format("YYYY-MM-DD HH:mm:ss")

            let activities_intro = this.activities_intro_ref.current.getContent();  // 活动介绍
            let activities_trip = this.activities_trip_ref.current.getContent();  // 行程安排
            let activities_days = this.activities_days_ref.current.getContent();  // 开营日期
            let activities_notice = this.activities_notice_ref.current.getContent();  // 报名须知

            // console.log(imageUrl,facusImgUrl,tagStr);
            // console.log(activities_intro,activities_trip,activities_days,activities_notice);

            console.log(values);

            // 发起ajax请求进行上传
            addActivities(
                getUser().token, values.activities_name, activities_time, imageUrl, 
                values.activities_price, tagStr, values.activities_address_id, values.activities_object_id, 
                values.activities_bus_day_id, activities_intro, activities_trip, activities_days,activities_notice, facusImgUrl
            ).then(result=>{
                if(result && result.status === 1){
                    message.success("添加活动成功")
                    this.props.history.goBack();
                }
            }).catch(error=>{
                message.error("添加活动失败")
            })

        }
        let {activities_address,activities_object,activities_bus} = this.state;
        return (
            <Card title="新增活动">
                <Form {...this.formItemLayout} onFinish={onFinish}>
                    <Form.Item
                        label="活动标题"
                        name="activities_name"
                        rules={[{ required: true, message: '请输入活动标题!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="activities_time"
                        label="活动日期"
                        rules= {[{ type: 'object', required: true, message: '请选择活动时间!' }]}
                    >
                        <DatePicker placeholder="请选择日期"  locale={locale}/>
                    </Form.Item>
                    <Form.Item
                        label="活动价格"
                        name="activities_price"
                        rules={[{ required: true, message: '请输入活动的价格!' }]}
                        wrapperCol={{span: 6}}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="活动地点"
                        name="activities_address_id"
                        rules={[{ required: true, message: '请选择活动地点!' }]}
                        wrapperCol={{span: 6}}
                    >
                        <Select placeholder="选择适用人群">
                            {/* 请求接口获取数据 */}
                            {
                                activities_address && activities_address.map(item=>{
                                    return(
                                        <Option value={ item.id } key={ item.id }>{ item.activities_address }</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="招生对象"
                        name="activities_object_id"
                        rules={[{ required: true, message: '请选择招生对象!' }]}
                        wrapperCol={{span: 6}}
                    >
                        <Select placeholder="请选择招生对象!">
                            {/* 请求接口获取数据 */}
                            {
                                activities_object && activities_object.map(item=>{
                                    return(
                                        <Option value={ item.id } key={ item.id }>{ item.activities_object_name }</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="选择营期"
                        name="activities_bus_day_id"
                        rules={[{ required: true, message: '请选择营期!' }]}
                        wrapperCol={{span: 6}}
                    >
                        <Select  placeholder="请选择招生对象!">
                            {/* 请求接口获取数据 */}
                            {
                                activities_bus && activities_bus.map(item=>{
                                    return(
                                        <Option value={ item.id } key={ item.id }>{ item.activities_bus_day }</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="添加活动标签"
                        name="activities_tag"
                    >
                        <ActivitiesTag tagsCallBack={(tags)=>{
                            this.setState({
                                activities_tag:tags
                            })
                        }} />
                    </Form.Item>
                    <Form.Item
                        label="活动封面图"
                        name="activities_img"
                    >
                        <UploadImg
                            upLoadBtnTitle={"上传活动封面"}
                            upLoadName={"activities_img"}
                            upLoadAction={"/api/auth/activities/upload_activities"}
                            successCallBack={(imgUrl)=>{
                                // console.log(imgUrl);
                                this.setState({
                                    imageUrl:imgUrl
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="首页轮播图"
                        name="focus_img"
                    >
                        <UploadImg
                            upLoadBtnTitle={"上传首页轮播图"}
                            upLoadName={"activities_img"}
                            upLoadAction={"/api/auth/activities/upload_activities"}
                            successCallBack={(imgUrl)=>{
                                // console.log(imgUrl);
                                this.setState({
                                    facusImgUrl:imgUrl
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="活动介绍"
                        name="activities_intro"
                        wrapperCol={{span: 20}}
                    >
                        <RichTextEdit 
                            ref={this.activities_intro_ref}
                            uploadName="activities_img"
                            uploadAction="/api/auth/activities/upload_activities"
                        />
                    </Form.Item>
                    <Form.Item
                        label="行程安排"
                        name="activities_trip"
                        wrapperCol={{span: 20}}
                    >
                        <RichTextEdit 
                            ref={this.activities_trip_ref}
                            uploadName="activities_img"
                            uploadAction="/api/auth/activities/upload_activities"
                            />
                    </Form.Item>
                    <Form.Item
                        label="开营日期"
                        name="activities_days"
                        wrapperCol={{span: 20}}
                    >
                        <RichTextEdit 
                            ref={this.activities_days_ref}
                            uploadName="activities_img"
                            uploadAction="/api/auth/activities/upload_activities"
                            />
                    </Form.Item>
                    <Form.Item
                        label="报名须知"
                        name="activities_notice"
                        wrapperCol={{span: 20}}
                    >
                        <RichTextEdit 
                            ref={this.activities_notice_ref}
                            uploadName="activities_img"
                            uploadAction="/api/auth/activities/upload_activities"
                            />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{span: 24}}
                    >
                        <div style={{textAlign: 'center'}}>
                            <Button type="primary" htmlType="submit" style={{marginRight: 10}}>
                                保存
                            </Button>
                            <Button onClick={() => {
                                this.props.history.goBack()
                            }}>
                                取消
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
