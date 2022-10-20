import { request} from '../api'



export const post =  {
    //게시글 작성
    create(title, content, region, address, cost, capacity, date, time, CategoryId) {
        return request('post', '/post',{title, content, region, address, cost, capacity, date, time, CategoryId})
    },
    //게시글 불러오기
    fetch(id) {
        return request('get',`/post/all/${id}`)
    },
    
    //---------------------------------------------------
    //게시글 수정
    revice(id,title, content, region, address, cost, capacity, date, time) {
        return request('patch',`/post/all/${id}`,{title, content, region, address, cost, capacity, date, time})
    },

    // //게시글 삭제
    delete(id){
        return request('delete',`/post/all/${id}`)
    },
    //---------------------------------------------------


}


export const postlist = {
    //게시글 리스트 불러오기
    fetch(cateName) {
        return request('get',`/post/${cateName}`)
    }
}