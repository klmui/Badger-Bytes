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

function completeOrder(order_id) {
    return request({
        url: '/orders/' + order_id,
        method: 'PUT',
        withCredentials: true,
    })
}

// TODO
function getDetail(id) {

}

const OrderService = {
    getAllOrders, getUserOrders, placeOrder, getDetail, completeOrder
}

export default OrderService;