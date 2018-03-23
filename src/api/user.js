import { baseUrl2,baseUrl, khglUrl, dicUrl } from '@/config/env'
import request from '@/router/axios'
import { userInfo, tableData } from '@/mock/user'
import { menu, menuAll } from '@/mock/menu'

export const registByUsername = (nickName,email,username, password, code, redomStr) => {
	return new Promise((resolve, reject) => {
		var data = request({
		    url: baseUrl2 + '/user/register',
		    method: 'post',
		    params: {account:username,password:password,nickName:nickName,email:email}
		})
        resolve(data);
  })  
}
export const loginByUsername = (username, password, code, redomStr) => {
	return new Promise((resolve, reject) => {
		var data = request({
		    url: baseUrl2 + '/user/login',
		    method: 'get',
		    params: {account:username,password:password}
		})
        resolve({data:data});
   })  
}

export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        resolve({ data: userInfo });
    })
}
export const getMenu = () => {
    return new Promise((resolve, reject) => {
        resolve({ data: menu });
    })
}
export const getMenuAll = () => {
    return new Promise((resolve, reject) => {
        resolve({ data: menu });
    })
}

export const getTableData = (page) => {
    return new Promise((resolve, reject) => {
        resolve({ data: tableData });
    })
}
export const logout = () => {
    return new Promise((resolve, reject) => {
        resolve();
    })
}



