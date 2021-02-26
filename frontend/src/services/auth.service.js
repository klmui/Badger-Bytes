import request from './request';

function signup(user) {
  return request({
    url: '/signup',
    method: 'POST',
    data: {
      "username": user.username,
      "password": user.password,
      "phone_number": user.phoneNumber,
      "address": user.address,
      "city": user.city,
      "state": user.state,
      "zip": user.zip,
      "car_description": user.car_description,
      "type": user.type,
      "email": user.email
    }
  });
}

function login(user) {
  return request({
    url: '/login',
    method: 'POST',
    data: {
      "username": user.username,
      "password": user.password,
    }
  });
}

function editProfile(user, token){
  return request({
    url: '/' + user.username,
    method: 'PUT',
    data: {
      "username": user.username,
      "password": user.password,
      "phone_number": user.phoneNumber,
      "address": user.address,
      "city": user.city,
      "state": user.state,
      "zip": user.zip,
      "car_description": user.car_description,
      "type": user.type,
      "email": user.email
    },
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}
function logout(user) {
  return request({
    url: '/logout',
    method: 'POST',
    data: {}
  });
}

const AuthService = {
  signup, login, editProfile
}

export default AuthService;