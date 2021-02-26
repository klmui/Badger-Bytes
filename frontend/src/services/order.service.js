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

// TODO
function getDetail(id) {

}

const MenuService = {
    getAllOrders, getUserOrders, getDetail
}

export default MenuService;