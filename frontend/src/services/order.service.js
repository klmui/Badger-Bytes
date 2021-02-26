import request from './request'

function getAllOrders() {
    return request({
        url: '/orders',
        method: 'GET',
        withCredentials: true,
    })
}

function getUserOrders(username) {
    return request({
        url: '/orders/' + username,
        method: 'GET',
        withCredentials: true,
    })
}

function placeOrder(orderForm) {
    return request({
        url: '/orders/',
        method: 'POST',
        withCredentials: true,
        data: orderForm,
    })
}

// TODO
function getDetail(id) {

}

const MenuService = {
    getAllOrders, getUserOrders, placeOrder, getDetail
}

export default MenuService;