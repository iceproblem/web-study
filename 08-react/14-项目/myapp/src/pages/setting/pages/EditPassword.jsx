import React, {Component} from 'react';
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import md5 from "blueimp-md5"
import {Input, Modal, Form,Button,message} from "antd";
import {LockOutlined} from "@ant-design/icons";
import { changeAdminPwd,getUser,removeUser } from "../../../api/adminApi"
import config from "../../../config/config";

class EditPassword extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        hideFunc: PropTypes.func.isRequired
    }
    // 弹出框取消按钮
    _handleCanel = () => {
        this.props.hideFunc()
    }
    render() {
        // 收集表单中的数据
        const onFinish = (values) => {
            // console.log('Success:', values);
            if(values.old_password === values.new_password){
                message.warning("新密码和旧密码不能一样")
                return;
            }

            // console.log(values)
            // let new_pwd = values.new_password
            // let old_pwd = values.old_password

            console.log(values.old_password)
            let md5OldPwd = md5(values.old_password,config.KEY)
            console.log(md5OldPwd)
            console.log(values.new_password)
            let md5NewPwd = md5(values.new_password,config.KEY)
            console.log(md5NewPwd)
            changeAdminPwd(getUser().token, md5OldPwd, md5NewPwd).then(result=>{
                console.log(result);
                if(result && result.status === 0){
                    message.error(result.msg)
                }
                if(result && result.status === 1){
                    message.success(result.msg)
                    // 1）清除本地数据
                    removeUser();
                    // 2）跳转到登录页面
                    this.props.history.replace("/login")
                }
            }).catch(error=>{
                message.error("修改密码失败！")
            })

        };
        return (
            <Modal
                title="修改密码"
                visible={this.props.visible}
                onCancel={this._handleCanel}
                footer={null}
            >
                <Form
                    name="normal_login"
                    onFinish={onFinish}
                    className="login-form"
                >
                    {/* 旧密码 */}
                    <Form.Item
                        name="old_password"
                        rules={[
                            {
                                required: true,
                                message: "请输入原始密码！"
                            }
                        ]}
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入原始密码"/>
                    </Form.Item>
                    {/* 新密码 */}
                    <Form.Item
                        name="new_password"
                        relus={[
                            {
                                required: true,
                                message:"请输入新密码！"
                            }
                        ]}
                    >
                        <Input  prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入新密码" />
                    </Form.Item>
                    {/* 确认按钮 */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >修改密码</Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default withRouter(EditPassword);
