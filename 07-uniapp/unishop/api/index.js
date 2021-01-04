let BASE_URL = "http://unimaicai.dadaimala.com"

export const SERVER_URL = "http://unimaicai.dadaimala.com"

// 1) 获取手机验证码
export function getPhoneCode(phone){
	return new Promise((resolve,reject)=>{
		try{
			uni.request({
				url:BASE_URL + '/app/get_phone_code',
				method:'post',
				data:{
					phone
				},
				success:res=>{
					resolve(res.data)
				}
			})
		}catch(e){
			reject(e)
		}
	})
}

// 2) 登录接口
export function phoneCodeLogin(phone,code){
	return new Promise((resolve,reject)=>{
		try{
			uni.request({
				url:BASE_URL + '/app/phone_login',
				method:'post',
				data:{
					user_phone:phone,
					phone_code:code
				},
				success:res=>{
					resolve(res.data)
				}
			})
		}catch(e){
			reject(e)
		}
	})
}

// 3) 修改用户信息
export function editUserMsg(token,nick_name,icon){
	return new Promise((resolve,reject)=>{
		try{
			uni.request({
				url:BASE_URL + '/app/edit_user',
				method:'post',
				data:{
					token,
					nick_name,
					icon
				},
				success:res=>{
					resolve(res.data)
				}
			})
		}catch(e){
			reject(e)
		}
	})
}

// 4) 新增一个地址
export function addAddress(token, name, phone, address, address_detail, is_default){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/add_address',
				method: 'POST',
				data: {
					token, name, phone, address, address_detail, is_default
				},
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

// 5) 获取地址列表
export function getAddressList(token){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/address_list',
				method: 'POST',
				data: {
					token
				},
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

// 6) 修改地址
export function editAddress(token, id, name, phone, address, address_detail, is_default){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/edit_address',
				method: 'POST',
				data: {
					token, id, name, phone, address, address_detail, is_default
				},
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

// 7) 删除地址
export function deleteAddress(token, id){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/delete_address',
				method: 'POST',
				data: {
					token, id
				},
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

// 8) 获取首页数据
export function getHomeData(){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/home_api',
				method: 'GET',
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

// 9) 获取分类数据
export function getCateLeft(){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/categories',
				method: 'GET',
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

export function getCateRight(tag){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/categories_detail/' + tag,
				method: 'GET',
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

// 10) 添加商品到购物车
export function addGoodsToCart(token, goods_id, goods_name, buy_limit, goods_price, small_image){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/add_cart',
				method: 'POST',
				data: {
					token, goods_id, goods_name, buy_limit, goods_price, small_image
				},
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

// 11) 获取购物车中商品数据
export function getCartList(token){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/cart_list',
				method: 'POST',
				data: {
					token
				},
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

// 12) 修改购物车中某个商品的购买数量
export function changeCarNum(token, goods_id, num){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/change_cart_num',
				method: 'POST',
				data: {
					token, goods_id, num
				},
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

// 13) 删除购物车中一个商品
export function deleteCartOne(token, goods_id){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/delete_cart_one',
				method: 'POST',
				data: {
					token, goods_id
				},
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

// 14) 清空当前用户购物车中所有商品
export function deleteCartAll(token){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/clear_cart',
				method: 'POST',
				data: {
					token
				},
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

// 15) 创建订单
export function createCheckedOrder(token, cart_shop, notice, shop_price, vip_price, dis_price, address_id){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/create_order',
				method: 'POST',
				data: {
					token, cart_shop, notice, shop_price, vip_price, dis_price, address_id
				},
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

// 16) 账户余额支付
export function payOrderWithCount(token, order_id, total){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/pay_order_count',
				method: 'POST',
				data: {
					token, order_id, total
				},
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

// 17) 重新获取用户信息
export function getUserInfoNew(token){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/user_info',
				method: 'POST',
				data: {
					token
				},
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

// 18) 获取订单
export function getOrderList(page_num, page_size, token, order_status){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/order_list',
				method: 'POST',
				data: {
					page_num, page_size, token, order_status
				},
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

// 19) 删除订单
export function deleteOrder(token, order_id){
	return new Promise((resolute, reject)=>{
		try{
			uni.request({
				url: BASE_URL + '/app/delete_order',
				method: 'POST',
				data: {
					token, 
					order_id
				},
				success: (result) => {
					resolute(result.data);
				}
			})
		}catch(e){
			reject(e);
		}
	});
}

























