import request from './request';

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

const LoginService = {
  login
}

export default LoginService;
