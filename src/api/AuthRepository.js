import Repository from './Repository';

const baseDomain = 'https://api.outlawdesigns.io:9661';
const baseUrl = `${baseDomain}`;
const authenticate = '/authenticate';
const verify = '/verify';
export default {
  authenticate(username,password){
    Repository.defaults.baseURL = baseUrl;
    Repository.defaults.headers.get['request_token'] = username;
    Repository.defaults.headers.get['password'] = password;
    return Repository.get(`${authenticate}`);
  },
  verify(auth_token){
    delete Repository.defaults.headers.get['request_token'];
    delete Repository.defaults.headers.get['password'];
    Repository.defaults.baseURL = baseUrl;
    Repository.defaults.headers.get['auth_token'] = auth_token;
    return Repository.get(`${verify}`);
  }
}
