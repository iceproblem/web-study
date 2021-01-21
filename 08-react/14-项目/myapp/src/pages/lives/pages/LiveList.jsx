import React, { Component } from 'react'
import {Card, Button, Table, Switch, Divider, Modal} from 'antd'
import {withRouter} from "react-router-dom";

class LiveList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            resourceList: [
                {
                    id: 2,
                    live_title: '拜登刚刚拿下密歇根州',
                    live_img: 'https://m1-1253159997.image.myqcloud.com/imageDir/902f5e65f4e733cd94b0dbbae559423eu1.png',
                    live_time: '2020年5月30日',
                    live_author:  '小强',
                    live_price:  1999,
                    is_focus: 0
                },{
                    id: 2,
                    live_title: '拜登刚刚拿下密歇根州',
                    live_img: 'https://m1-1253159997.image.myqcloud.com/imageDir/902f5e65f4e733cd94b0dbbae559423eu1.png',
                    live_time: '2020年5月30日',
                    live_author:  '小强',
                    live_price:  1999,
                    is_focus: 0
                },{
                    id: 2,
                    live_title: '拜登刚刚拿下密歇根州',
                    live_img: 'https://m1-1253159997.image.myqcloud.com/imageDir/902f5e65f4e733cd94b0dbbae559423eu1.png',
                    live_time: '2020年5月30日',
                    live_author:  '小强',
                    live_price:  1999,
                    is_focus: 0
                },{
                    id: 2,
                    live_title: '拜登刚刚拿下密歇根州',
                    live_img: 'https://m1-1253159997.image.myqcloud.com/imageDir/902f5e65f4e733cd94b0dbbae559423eu1.png',
                    live_time: '2020年5月30日',
                    live_author:  '小强',
                    live_price:  1999,
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
        {title: '直播课标题', dataIndex: 'live_title', key: 'live_title',align: 'center'},
        {
            title: '直播课封面', dataIndex: 'live_img', key: 'live_img',align: 'center',
            render: (text, record) => {
                return (
                    <img src={record.live_img} alt="活动封面" width={100}/>
                )
            }
        },
        {title: '开始时间', dataIndex: 'live_time', key: 'live_time',align: 'center'},
        {title: '直播课老师', dataIndex: 'live_author', key: 'live_author',align: 'center'},
        {title: '直播课价格', dataIndex: 'live_price', key: 'live_price',align: 'center'},
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
                        <Button>编辑</Button>
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
                this.props.history.push('/live/add-live');
            }}>
                添加直播课
            </Button>
        );

        return (
            <Card title={"直播课列表"} extra={addBtn}>
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

export default withRouter(LiveList);
