import ajax from './index'

// 1)添加一个商品
export const addProduct = (product)=> ajax('/manager/api/auth/product/add_product', product, 'post');

// 2)获取商品列表
export const getProductList = (queryList)=> ajax('/manager/api/auth/product/get_product', queryList, 'post');

// 3)删除一个商品
export const delOneProduct = (id)=> ajax('/manager/api/auth/product/del_one_product', {id}, 'post');

// 4)局部列表更新
export const updateProductWithList = (product)=> ajax('/manager/api/auth/product/update_product_local', product, 'post');

// 5)批量更新列表
export const updateProductWithListMany = (product)=> ajax('/manager/api/auth/product/update_list_many', product, 'post');

// 6)批量删除列表
export const deleteProductWithListMany = (product)=> ajax('/manager/api/auth/product/delete_list_many', product, 'post');

// 7)根据ID获取商品的所有参数
export const getProductById = (id)=> ajax('/manager/api/auth/product/get_product_by_id', id, 'post');

// 8)编辑商品
export const editProductById = (product)=> ajax('/manager/api/auth/product/edit_product_by_id', product, 'post');