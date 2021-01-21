import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Select,
    Upload,
    message,
    Button,
    DatePicker
} from 'antd'

// 引入日期中国化
import locale from 'antd/es/date-picker/locale/zh_CN';
// 引入富文本编辑器
import RichTextEdit from "../../../components/rich-text-editor"
// 引入tag选择
import ActivitiesTag from '../../../components/z-tag'
import UploadImg from '../../../components/UploadImg'

const { Option } = Select;
export default class ActivitiesAdd extends Component {
    constructor(props) {
        super(props);

        this.activities_intro_ref = React.createRef();
        this.activities_trip_ref = React.createRef();
        this.activities_days_ref = React.createRef();
        this.activities_notice_ref = React.createRef();
    }


    formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 12 },
    };

    render() {
        return (
            <Card title="新增活动">
                <Form {...this.formItemLayout}>
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
                            <Option value="1">北京</Option>
                            <Option value="2">上海</Option>
                            <Option value="3" >南京</Option>
                            <Option value="4" >杭州</Option>
                            <Option value="5" >深圳</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="招生对象"
                        name="activities_object_id"
                        rules={[{ required: true, message: '请选择招生对象!' }]}
                        wrapperCol={{span: 6}}
                    >
                        <Select placeholder="请选择招生对象!">
                            <Option value="1">托班（2-3岁）</Option>
                            <Option value="2">小班（3-4岁）</Option>
                            <Option value="3">中班（4-5岁）</Option>
                            <Option value="4">大班（5-6岁）</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="选择营期"
                        name="activities_bus_day_id"
                        rules={[{ required: true, message: '请选择营期!' }]}
                        wrapperCol={{span: 6}}
                    >
                        <Select  placeholder="请选择招生对象!">
                            <Option value="1">1天</Option>
                            <Option value="2">2天</Option>
                            <Option value="3">3天</Option>
                            <Option value="4">4天</Option>
                            <Option value="5">5天</Option>
                            <Option value="6">6天</Option>
                            <Option value="7">7天</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="添加活动标签"
                        name="activities_tag"
                    >
                        <ActivitiesTag tagsCallBack={(tags)=>{
                            console.log(tags);
                        }} />
                    </Form.Item>
                    <Form.Item
                        label="活动封面图"
                        name="activities_img"
                        rules={[{ required: true, message: '请上传活动的封面图!' }]}
                    >
                        <UploadImg
                            upLoadBtnTitle={"上传活动封面"}
                            upLoadName={"activities_img"}
                            uploadAction={"/api/auth/activities/upload_activities"}
                            successCallBack={(imgUrl)=>{
                                console.log(imgUrl);
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
                            uploadAction={"/api/auth/activities/upload_activities"}
                            successCallBack={(imgUrl)=>{
                                console.log(imgUrl);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="活动介绍"
                        name="activities_intro"
                        wrapperCol={{span: 20}}
                    >
                        <RichTextEdit ref={this.activities_intro_ref}/>
                    </Form.Item>
                    <Form.Item
                        label="行程安排"
                        name="activities_trip"
                        wrapperCol={{span: 20}}
                    >
                        <RichTextEdit ref={this.activities_trip_ref}/>
                    </Form.Item>
                    <Form.Item
                        label="开营日期"
                        name="activities_days"
                        wrapperCol={{span: 20}}
                    >
                        <RichTextEdit ref={this.activities_days_ref}/>
                    </Form.Item>
                    <Form.Item
                        label="报名须知"
                        name="activities_notice"
                        wrapperCol={{span: 20}}
                    >
                        <RichTextEdit ref={this.activities_notice_ref}/>
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
