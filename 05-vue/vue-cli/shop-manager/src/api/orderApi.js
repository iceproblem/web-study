import ajax from './index'

// 1)获取订单列表
export const getOrderList = (queryList)=> ajax('/manager/api/auth/order/get_order_list', queryList, 'post');

// 2)订单发货(一个 + 多个)
export const deliveryOrder = (queryList)=> ajax('/manager/api/auth/order/delivery_order', queryList, 'post');

// 3)订单关闭(一个 + 多个)
export const closeOrder = (queryList)=> ajax('/manager/api/auth/order/close_order', queryList, 'post');

// 4)订单删除(一个 + 多个)
export const deleteOrder = (queryList)=> ajax('/manager/api/auth/order/delete_order', queryList, 'post');

// 5)获取订单详情
export const getOrderDetail = (queryList)=> ajax('/manager/api/auth/order/get_order_by_id', queryList, 'post');


