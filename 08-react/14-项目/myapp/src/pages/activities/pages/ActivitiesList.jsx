import React, { Component } from 'react'
import config from "../../../config/config"
import { Card, Button, Table, Switch, Divider, Modal, message,notification } from 'antd'

import { getActivitiesList,deleteActivities,setFocusActivities } from "../../../api/activitiesApi"

export default class ActivitiesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activitiesList: [],
            totalSize: 0,  // 总的数据
            pageSize: 3  // 每页显示多少个
        }
    }
    componentDidMount() {
        this._loadData();
    }
    // 加载列表数据
    _loadData = (page_num = 1, page_size = 3) => {
        getActivitiesList(page_num, page_size).then(result => {
            // console.log(result);
            if (result && result.status === 1) {
                message.success("获取活动列表成功！")
                this.setState({
                    activitiesList: result.data.activities_list,
                    totalSize: result.data.activities_count
                })
            }
        }).catch(err => {
            message.error("获取活动失败！")
        })
    }
    // 列的配置信息
    columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 50, align: 'center' },
        { title: '活动名称', dataIndex: 'activities_name', key: 'activities_name', align: 'center' },
        { title: '开始时间', dataIndex: 'activities_time', key: 'activities_time', align: 'center' },
        {
            title: '活动封面', dataIndex: 'activities_img', key: 'activities_img', align: 'center',
            render: (text, record) => {
                return (
                    <img src={config.BASE_URL + record.activities_img} alt="活动封面" width={100} />
                )
            }
        },
        { title: '活动价格', dataIndex: 'activities_price', key: 'activities_price', align: 'center' },
        { title: '活动天数', dataIndex: 'activities_bus_day_id', key: 'activities_bus_day_id', align: 'center' },
        {
            title: '首页焦点', dataIndex: 'is_focus', key: 'is_focus', align: 'center',
            render: (text, record) => {
                return (
                    <Switch 
                        checkedChildren="是" 
                        unCheckedChildren="否"
                        defaultChecked={ record.is_focus === 1 }
                        disabled={ record.focus_img.length === 0 }
                        onChange={(checked)=>{
                            // console.log(checked);
                            setFocusActivities(record.id, checked ? 1 : 0).then(result=>{
                                // console.log(result);
                                if(result && result.status === 1){
                                    // message.success(result.msg)
                                    notification["success"]({
                                        message:`活动:${record.activities_name}`,
                                        description:`${checked ? "设置为":"取消"}焦点活动`,
                                        duration:2
                                    })
                                }
                            }).catch(err=>{
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
                         <Button onClick={()=>{
                            // this.props.history.push("/live/edit-live")

                            this.props.history.push({
                                pathname:"/activities/edit-activities",
                                state:{
                                    activities:record
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
                                    deleteActivities(record.id).then(result => {
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
                        }}>删除活动</Button>
                    </div>
                )
            }
        },
    ];

    render() {
        // 添加按钮
        let addBtn = (
            <Button type={"primary"} onClick={() => {
                this.props.history.push('/activities/add-activities');
            }}>
                添加活动
            </Button>
        );

        return (
            <Card title={"活动列表"} extra={addBtn}>
                <Table
                    columns={this.columns}
                    dataSource={this.state.activitiesList}
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
