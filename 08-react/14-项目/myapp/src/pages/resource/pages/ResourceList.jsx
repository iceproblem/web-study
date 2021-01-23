import React, { Component } from 'react'
import {Card, Button, Table, Switch, Divider, Modal} from 'antd'

export default class ResourceList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            resourceList: [
                {
                    id: 1,
                    resource_name: '婴幼儿早教课程',
                    resource_img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2582455335,2140247049&fm=11&gp=0.jpg',
                    resource_author: '小强',
                    resource_category_id: 2,
                    is_focus: 0
                },
                {
                    id: 2,
                    resource_name: '婴幼儿早教课程',
                    resource_img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2582455335,2140247049&fm=11&gp=0.jpg',
                    resource_author: '小强',
                    resource_category_id: 2,
                    is_focus: 0
                },
                {
                    id: 3,
                    resource_name: '婴幼儿早教课程',
                    resource_img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2582455335,2140247049&fm=11&gp=0.jpg',
                    resource_author: '小强',
                    resource_category_id: 2,
                    is_focus: 0
                },
                {
                    id: 4,
                    resource_name: '婴幼儿早教课程',
                    resource_img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2582455335,2140247049&fm=11&gp=0.jpg',
                    resource_author: '小强',
                    resource_category_id: 2,
                    is_focus: 0
                },
                {
                    id: 5,
                    resource_name: '婴幼儿早教课程',
                    resource_img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2582455335,2140247049&fm=11&gp=0.jpg',
                    resource_author: '小强',
                    resource_category_id: 2,
                    is_focus: 0
                },
                {
                    id: 6,
                    resource_name: '婴幼儿早教课程',
                    resource_img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2582455335,2140247049&fm=11&gp=0.jpg',
                    resource_author: '小强',
                    resource_category_id: 2,
                    is_focus: 0
                },
            ],
            totalSize: 100,
            pageSize: 10
        }
    }


    // 列的配置信息
    columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 50, align: 'center' },
        { title: '幼教标题', dataIndex: 'resource_name', key: 'resource_name', align: 'center' },
        {
            title: '幼教封面', dataIndex: 'resource_img', key: 'resource_img', align: 'center',
            render: (text, record) => {
                return (
                    <img src={record.resource_img} alt="课程封面" width={100} />
                )
            }
        },
        { title: '所属作者', dataIndex: 'resource_author', key: 'resource_author', align: 'center' },
        {
            title: '所属分类', dataIndex: 'resource_category_id', key: 'resource_category_id', align: 'center',
            render: (text, record) => {
                return (
                    <span>亲子小学堂</span>
                )
            }
        },
        {
            title: '首页焦点', dataIndex: 'is_focus', key: 'is_focus', align: 'center',
            render: (text, record) => {
                return (
                    <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
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
                        <Button onClick={() => {
                            Modal.confirm({
                                title: '确认删除吗?',
                                content: '删除此资源,所有关联的内容都会被删除',
                                okText: '确认',
                                cancelText: '取消',
                                onOk: () => {
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
                this.props.history.push('/resource/add-resource');
            }}>
                添加幼教资源
            </Button>
        );
        return (
            <Card title={"幼教资源列表"} extra={addBtn}>
                <Table
                    columns={this.columns}
                    dataSource={this.state.resourceList}
                    rowKey={"id"}
                    pagination={{
                        total: this.state.totalSize,
                        pageSize: this.state.pageSize,
                        onChange: (pageNum, pageSize) => {
                            console.log('需要加载' + pageNum, pageSize);
                        }
                    }}
                />
            </Card>
        )
    }
}

