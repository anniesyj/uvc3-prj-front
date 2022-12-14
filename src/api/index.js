import axios from 'axios'
import router from '../router'



const DOMAIN = process.env.VUE_APP_API

const UNAUTHORIZED = 401


const onUnauthorized = () => {
    router.push(`/login?returnPath=${encodeURIComponent(location.pathname)}`)
}

//axios
export const request = (method, url, data) => {
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
    axios.defaults.headers.common["Authorization"] = token ? `${token}` : null;
    //token이 있다면 `Bearer ${token}` 없다면 null값으로 넣어줌
}







