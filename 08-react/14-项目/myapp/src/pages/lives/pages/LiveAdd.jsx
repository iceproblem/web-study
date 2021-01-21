import React, {Component} from 'react';
import { Card,Form,Input,Select,message,Button,DatePicker} from "antd";

// 引入日期中国化
// import locale from 'antd/es/date-picker/locale/zh_CN';
// 引入富文本编辑器
// import RichTextEdit from "./../../../components/rich-text-editor"
// 引入tag选择
import UploadImg from './../../../components/UploadImg'

const { Option } = Select;
const { RangePicker } = DatePicker;

class LiveAdd extends Component {
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
    }

    render() {
        const onFinsh = values =>{
            console.log(values)
        }
        return (
            <Card title="新增直播课">
                <Form {...this.formItemLayout} onFinish={onFinsh}>
                    <Form.Item
                        label="直播课名称"
                        name="live_name"
                        rules={[{ required: true, message: '请输入直播课名称!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="live_author"
                        label="直播课作者"
                        rules= {[{  required: true, message: '请输入直播课作者!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="live_price"
                        label="直播课价格"
                        rules= {[{  required: true, message: '请输入直播课价格!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="live_time"
                        label="直播课时间"
                        rules= {[{  required: true, message: '请输入直播课时间!' }]}
                    >
                        <RangePicker></RangePicker>
                    </Form.Item>
                    <Form.Item
                        label="适用人群"
                        name="live_persion_id"
                        rules={[{ required: true, message: '请输入适用人群' }]}
                    >
                        <Select placeholder="请选择适用人群">
                            <Option value="1">北京</Option>
                            <Option value="2">上海</Option>
                            <Option value="3" >南京</Option>
                            <Option value="4" >杭州</Option>
                            <Option value="5" >深圳</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="内容主题"
                        name="live_theme_id"
                        rules={[{ required: true, message: '请输入内容主题' }]}
                    >
                        <Select placeholder="请输入内容主题">
                            <Option value="1">北京</Option>
                            <Option value="2">上海</Option>
                            <Option value="3" >南京</Option>
                            <Option value="4" >杭州</Option>
                            <Option value="5" >深圳</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="live_url"
                        label="直播课地址"
                        rules= {[{  required: true, message: '请输入直播课地址!' }]}
                    >
                        <Input placeholder="请输入直接课地址"/>
                    </Form.Item>
                    <Form.Item
                        label="直播课封面图"
                        name="live_img"
                    >
                        <UploadImg
                            upLoadBtnTitle={"上传封面图"}
                            upLoadName={"live_img"}
                            uploadAction={"/api/auth/live/upload_live"}
                            successCallBack={(name)=>{
                                message.success("直播课程封面上传成功")
                                this.setState({
                                    imageUrl:name
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="首页轮播图"
                        name="focus_img"
                    >
                        <UploadImg
                            upLoadBtnTitle={"上传焦点图"}
                            upLoadName={"live_img"}
                            uploadAction={"/api/auth/live/upload_live"}
                            successCallBack={(name)=>{
                                message.success("直播课焦点图上传成功")
                                this.setState({
                                    focusImgUlr:name
                                })
                            }}
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
        );
    }
}

export default LiveAdd;
