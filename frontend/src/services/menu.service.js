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

// TODO
function update(id, token) {

}

const MenuService = {
    getList, getDetail, update
}

export default MenuService;