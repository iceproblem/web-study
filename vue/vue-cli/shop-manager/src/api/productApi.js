import ajax from './index'

// 1)添加一个商品
export const addProduct = (product)=> ajax('/manager/api/auth/product/add_product', product, 'post');

// 2)获取商品列表
export const getProductList = (queryList)=> ajax('/manager/api/auth/product/get_product', queryList, 'post');

// 3)删除一个商品
export const delOneProduct = (id)=> ajax('/manager/api/auth/product/del_one_product', {id}, 'post');

// 4)局部列表更新
export const updateProductWithList = (product)=> ajax('/manager/api/auth/product/update_product_local', product, 'post');

