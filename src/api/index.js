import axios from 'axios'
import router from '../router'


const DOMAIN = 'http://192.168.0.69:8080'
const UNAUTHORIZED = 401


const onUnauthorized = () => {
    router.push(`/login?returnPath=${encodeURIComponent(location.pathname)}`)
}



//axios
const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        data
    }).then(result =>
        // console.log(result.data)) //result.data => body Data
        result.data)
        .catch(result => {
            const { status } = result.response
            if (status == UNAUTHORIZED) return onUnauthorized()
            throw Error(result)
        })
}


export const setAuthInHeader = token => {
    axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null;
    //token이 있다면 `Bearer ${token}` 없다면 null값으로 넣어줌
}


//로그인 api
export const auth = {
    login(userId, password) {
        return request('post', '/auth/signIn', { userId, password })
    }
}


// 회원가입 api
export const signUp = {
    signUp(data) {
        return request('post', '/auth/signUp', { data })
    }
}