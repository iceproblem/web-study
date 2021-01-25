import React, { Component } from 'react'
import { Card, Button, Table, Switch, Divider, Modal, message, notification } from 'antd'
import config from "../../../config/config"
import { saveObj } from "../../../tools/cache-tool"

import { getJobList, deleteJob,setFocusJob } from "../../../api/lifejobApi"

export default class LifeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            leftjobList: [],  // 人生资源列表
            totalSize: 0,
            pageSize: 3
        }
    }
    componentDidMount() {
        this._loadData();
    }
    // 加载列表数据
    _loadData = (page_num = 1, page_size = 3) => {
        getJobList(page_num, page_size).then(result => {
            // console.log(result);
            if (result && result.status === 1) {
                message.success("获取人生资源列表成功！")
                this.setState({
                    leftjobList: result.data.job_list,
                    totalSize: result.data.job_count
                })
            }
        }).catch(err => {
            message.error("获取人生资源失败！")
        })
    }

    // 列的配置信息
    columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 50, align: 'center' },
        { title: '职场人生标题', dataIndex: 'job_name', key: 'job_name', align: 'center' },
        {
            title: '职场人生封面', dataIndex: 'job_img', key: 'job_img', align: 'center',
            render: (text, record) => {
                return (
                    <img src={config.BASE_URL + record.job_img} alt="人生封面" width={100} />
                )
            }
        },
        { title: '所属作者', dataIndex: 'job_author', key: 'job_author', align: 'center' },
        {
            title: '首页焦点', dataIndex: 'is_focus', key: 'is_focus', align: 'center',
            render: (text, record) => {
                return (
                    <Switch
                        checkedChildren="是"
                        unCheckedChildren="否"
                        defaultChecked={record.is_focus === 1}
                        disabled={record.focus_img.length === 0}
                        onChange={(checked) => {
                            // console.log(checked);
                            setFocusJob(record.id, checked ? 1 : 0).then(result => {
                                // console.log(result);
                                if (result && result.status === 1) {
                                    // message.success(result.msg)
                                    notification["success"]({
                                        message: `人生:${record.job_name}`,
                                        description: `${checked ? "设置为" : "取消"}焦点人生`,
                                        duration: 2
                                    })
                                }
                            }).catch(err => {
                                console.log("设置焦点失败");
                            })
                        }}
                    />
                )
            }
        },
        {
            title: '操作', align: 'center',
            render: (text, record) => {
                return (
                    <div>
                        <Button onClick={() => {
                            saveObj("life_job_tag", "edit")
                            this.props.history.push({
                                pathname: "/lifejob/add-edit",
                                state: {
                                    job: record
                                }
                            })
                        }}>编辑活动</Button>
                        <Divider type="vertical" />
                        <Button onClick={() => {
                            Modal.confirm({
                                title: '确认删除吗?',
                                content: '删除此资源,所有关联的内容都会被删除',
                                okText: '确认',
                                cancelText: '取消',
                                onOk: () => {
                                    // todo
                                    deleteJob(record.id).then(result => {
                                        // console.log(result);
                                        if (result && result.status === 1) {
                                            message.success(result.msg)
                                            this._loadData(); // 重新加载数据
                                        }
                                    }).catch(err => {
                                        console.log("删除失败");
                                    })
                                }
                            });
                        }}>删除</Button>
                    </div>
                )
            }
        },
    ];

    render() {
        // 添加按钮
        let addBtn = (
            <Button type={"primary"} onClick={() => {
                // 在页面跳转之前，保存这个标识，在另一个组件中，就可以读取这个标识
                // 有了这个标志，就知道，你是从添加过来的，还是从编辑过来的
                saveObj("life_job_tag", "add")
                this.props.history.push('/lifejob/add-edit');
            }}>
                添加人生资源
            </Button>
        );

        return (
            <Card title={"人生资源列表"} extra={addBtn}>
                <Table
                    columns={this.columns}
                    dataSource={this.state.leftjobList}
                    rowKey={"id"}
                    pagination={{
                        total: this.state.totalSize,
                        pageSize: this.state.pageSize,
                        onChange: (pageNum, pageSize) => {
                            this._loadData(pageNum, pageSize)
                        }
                    }}
                />
            </Card>
        )
    }
}
