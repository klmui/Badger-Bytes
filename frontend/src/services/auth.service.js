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
    },
    withCredentials: true,
  });
}

function login(user) {
  return request({
    url: '/login',
    method: 'POST',
    data: {
      "username": user.username,
      "password": user.password,
    },
    withCredentials: true,
  });
}

function editProfile(user){
  return request({
    url: '/' + user.username,
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