import request from './request'

function getList() {
    return request({
        url: '/',
        method: 'GET'
    })
}

// TODO
function getDetail(id) {

}

function addFood(food_obj) {
    return request({
        url: '/food/',
        method: 'POST',
        withCredentials: true,
        data: food_obj,
    })
}

function updateFood(food_obj) {
    let food_id = food_obj.id
    delete food_obj['id']
    return request({
        url: '/food/' + food_id,
        method: 'PUT',
        withCredentials: true,
        data: food_obj
    })
}

function deleteFood(food_id) {
    return request({
        url: '/food/' + food_id,
        method: 'DELETE',
        withCredentials: true,
    })

}

const MenuService = {
    getList, getDetail, updateFood, deleteFood, addFood
}

export default MenuService;