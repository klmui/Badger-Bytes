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

const AuthService = {
  signup, login
}

export default AuthService;