import React, { Component } from 'react'
import {Card, Button, Table, Switch, Divider, Modal} from 'antd'

export default class ActivitiesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resourceList: [
                {
                    id: 1,
                    activities_name: '拜登刚刚拿下密歇根州',
                    activities_time: '2020年5月30日',
                    activities_img: 'https://m1-1253159997.image.myqcloud.com/imageDir/902f5e65f4e733cd94b0dbbae559423eu1.png',
                    activities_price:  19990,
                    activities_days:  '6天',
                    is_focus: 0
                }
            ],
            totalSize: 100,
            pageSize: 10
        }
    }

    // 列的配置信息
    columns = [
        {title: 'ID', dataIndex: 'id', key: 'id', width: 50, align: 'center'},
        {title: '活动名称', dataIndex: 'activities_name', key: 'activities_name',align: 'center'},
        {title: '开始时间', dataIndex: 'activities_time', key: 'activities_time',align: 'center'},
        {
            title: '活动封面', dataIndex: 'activities_img', key: 'activities_img',align: 'center',
            render: (text, record) => {
                return (
                    <img src={record.activities_img} alt="活动封面" width={100}/>
                )
            }
        },
        {title: '活动价格', dataIndex: 'activities_price', key: 'activities_price',align: 'center'},
        {title: '活动天数', dataIndex: 'activities_days', key: 'activities_days',align: 'center'},
        {
            title: '首页焦点', dataIndex: 'is_focus', key: 'is_focus',align: 'center',
            render: (text, record) => {
                return (
                    <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked/>
                )
            }
        },
        {
            title: '操作', align: 'center',
            render: (text, record) => {
                return (
                    <div>
                        <Button>编辑活动</Button>
                        <Divider type="vertical" />
                        <Button onClick={()=>{
                            Modal.confirm({
                                title: '确认删除吗?',
                                content: '删除此资源,所有关联的内容都会被删除',
                                okText: '确认',
                                cancelText: '取消',
                                onOk: ()=> {
                                    // todo
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
                    dataSource={this.state.resourceList}
                    rowKey={"id"}
                    pagination={{
                        total: this.state.totalSize,
                        pageSize: this.state.pageSize,
                        onChange: (pageNum, pageSize)=>{
                            console.log('需要加载' + pageNum, pageSize);
                        }
                    }}
                />
            </Card>
        )
    }
}
