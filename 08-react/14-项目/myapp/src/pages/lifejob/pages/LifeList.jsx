import React, {Component} from 'react';

import {Card, Button, Table, Switch, Divider, Modal} from 'antd'

class LifeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resourceList: [
                {
                    id: 1,
                    job_name: '拜登刚刚拿下密歇根州',
                    job_img: 'https://m1-1253159997.image.myqcloud.com/imageDir/902f5e65f4e733cd94b0dbbae559423eu1.png',
                    job_author: '小强',
                    is_focus: 0
                },
                {
                    id: 2,
                    job_name: '拜登刚刚拿下密歇根州',
                    job_img: 'https://m1-1253159997.image.myqcloud.com/imageDir/902f5e65f4e733cd94b0dbbae559423eu1.png',
                    job_author: '小强',
                    is_focus: 0
                },
                {
                    id: 3,
                    job_name: '拜登刚刚拿下密歇根州',
                    job_img: 'https://m1-1253159997.image.myqcloud.com/imageDir/902f5e65f4e733cd94b0dbbae559423eu1.png',
                    job_author: '小强',
                    is_focus: 0
                },
                {
                    id: 4,
                    job_name: '拜登刚刚拿下密歇根州',
                    job_img: 'https://m1-1253159997.image.myqcloud.com/imageDir/902f5e65f4e733cd94b0dbbae559423eu1.png',
                    job_author: '小强',
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
        {title: '职场人生标题', dataIndex: 'job_name', key: 'job_name',align: 'center'},
        {
            title: '职场人生封面', dataIndex: 'job_img', key: 'job_img',align: 'center',
            render: (text, record) => {
                return (
                    <img src={record.job_img} alt="人生封面" width={100}/>
                )
            }
        },
        {title: '所属作者', dataIndex: 'job_author', key: 'job_author',align: 'center'},
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
                this.props.history.push('/lifejob/add-life');
            }}>
                添加人生资源
            </Button>
        );

        return (
            <Card title={"人生资源列表"} extra={addBtn}>
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

export default LifeList;
