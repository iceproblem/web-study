import React from 'react'
import {Card, Form, Input, Select, Upload, message, Button} from 'antd'
import { LoadingOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';

const { Option } = Select;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export default class AddResource extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imageUrl: ''
        }
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };


    draggerProps = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };


    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 2 }
            },
            wrapperCol: {
                xs: { span: 12 }
            },
        };

        const {imageUrl} = this.state;

        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

        return (
            <Card title="新增幼教资源">
                <Form  {...formItemLayout}>
                    <Form.Item
                        label={"资源名称"}
                        name = "resource_name"
                        rules={[{ required: true, message: '请输入资源名称!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"资源作者"}
                        name = "resource_author"
                        rules={[{ required: true, message: '请输入作者姓名!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="所属分类"
                        name="resource_category_id"
                        rules={[{ required: true, message: '请选择所属分类!' }]}
                    >
                        <Select defaultValue="1" style={{width: 200}}>
                            <Option value="1">教学活动小助手</Option>
                            <Option value="2">亲子小学堂</Option>
                            <Option value="3" >培训教室</Option>
                            <Option value="4">GT课程</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="所属班级"
                        name="resource_classes_id"
                        rules={[{ required: true, message: '请选择所属分类!' }]}
                    >
                        <Select defaultValue="1" style={{width: 90}}>
                            <Option value="1">托班</Option>
                            <Option value="2">小班</Option>
                            <Option value="3">中班</Option>
                            <Option value="4">大班</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="所属领域"
                        name="resource_area_id"
                        rules={[{ required: true, message: '请选择所属领域!' }]}
                    >
                        <Select defaultValue="1" style={{width: 90}}>
                            <Option value="1">健康</Option>
                            <Option value="2">语言</Option>
                            <Option value="3" >社会</Option>
                            <Option value="4">科学</Option>
                            <Option value="5">艺术</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="素材选择"
                        name="resource_meta_id"
                        rules={[{ required: true, message: '请选择素材!' }]}
                    >
                        <Select defaultValue="1" style={{width: 120}}>
                            <Option value="1">教学设计</Option>
                            <Option value="2">教学课件</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="素材格式"
                        name="resource_format_id"
                        rules={[{ required: true, message: '请选择素材格式!' }]}
                    >
                        <Select defaultValue="1" style={{width: 120}}>
                            <Option value="1">图片</Option>
                            <Option value="2">文档</Option>
                            <Option value="3">音频</Option>
                            <Option value="4">视频</Option>
                            <Option value="5">课件</Option>
                            <Option value="6">综合多媒体</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={"资源价格"}
                        name = "resource_price"
                        rules={[{ required: true, message: '请输入资源的价格!' }]}
                    >
                        <Input style={{width: 120}}/>
                        <span>
                           <span style={{marginLeft: 5}}>元</span>
                           <span style={{color: 'red'}}>(免费则输入0)</span>
                       </span>
                    </Form.Item>
                    <Form.Item
                        label={"资源封面图"}
                        name = "resource_img"
                        rules={[{ required: true, message: '请上传封面图片!' }]}
                    >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label={"首页轮播图"}
                        name = "focus_img"
                    >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label={"幼教资源"}
                        name = "resource_content"
                    >
                        <Upload.Dragger {...this.draggerProps}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">单击或者拖到文件到此区域上传</p>
                            <p className="ant-upload-hint">支持单个或多上文件上传</p>
                        </Upload.Dragger>
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
