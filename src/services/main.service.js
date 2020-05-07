const axios = require('axios');
const baseURL = 'https://api.github.com';
const MainService = {
    // ======================== //
    // Get Users
    // ======================== //
    initUser: function(){
        return new Promise((resolve,reject)=>{
            axios.get(`${baseURL}/users`).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    },
    // ======================== //
    // Get User Detail
    // ======================== //
    getUserDetail: function(user){
        return new Promise((resolve,reject)=>{
            axios.get(`${baseURL}/users/${user}`).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    },
    // ======================== //
    // Search Users
    // ======================== //
    searchUser: function(keyword){
        return new Promise((resolve,reject)=>{
            axios.get(`${baseURL}/search/users?q=${keyword}`).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    },
    // ======================== //
    // Get Repositories
    // ======================== //
    getUserRepositories: function(user){
        return new Promise((resolve,reject)=>{
            axios.get(`${baseURL}/users/${user}/repos`).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    },
    // ======================== //
    // Get Detail Repositries
    // ======================== //
    getDetailRespositories: function(user,project){
        return new Promise((resolve,reject)=>{
            axios.get(`${baseURL}/repos/${user}/${project}/readme`).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    },
};

export default MainService;