<template>
    <v-app>
        <ValidationObserver
        ref="signUpForm"
        v-slot="{ handleSubmit, invalid, validate }">
        <form action="" @submit.prevent="handleSubmit(onSubmit)">
            <div class="post-comment">
                <h3>댓글</h3>
                
                <ValidationProvider
                    name="댓글"
                    rules="comment"
                    v-slot="{ errors }">
                <div style="display:flex;">
                    
                                            
                    <v-col
                    cols="12"
                    md="9"
                    >
                        <v-text-field
                        v-model="content"
                        solo
                        height=5
                        clearable= "true"
                        ref="postcomment"
                        :error-messages="errors"
                        ></v-text-field>
                    </v-col>
                    <div style="margin:5px 0 0 0;">
                        <v-btn
                        type="submit"
                        :disabled="(invalid || !validate)"
                        >작성</v-btn>
                    </div>
                </div>
                    </ValidationProvider>                             <!-- :disabled="content === '' " -->
                <table>
                    <tr class="content-item"
                        v-for=" (comment,index) in commentlist" :key="index">
                        <td style="display:flex;">
                            <div style="display:flex;">
                                <h4> {{comment.UserId}} : {{comment.content}}</h4>
                            </div>
                            <v-spacer></v-spacer>
                            <div class="UD-btn" v-if="comment.UserId === UserId && !inputnewCon">
                                <!-- v-if="" -->
                                    <a class="a-tag">
                                        <button  @click.prevent="comment.status=true" style="display:flex;">수정</button>
                                    </a>
                                    
                                    <a class="a-tag">
                                        <button  @click.prevent="deleteComment(comment.id)">삭제</button>
                                    </a>
                            </div>
                            <div v-else>
                                <!-- <h5>{{comment.UserId}} === {{UserId}}</h5> -->
                                <v-spacer></v-spacer>
                            </div>
                        </td>
                        <td>
                            <div v-if="comment.status">
                                <form @submit.prevent="updateComment(comment.id)" style="display:flex;" v-if="comment.UserId === UserId">
                                    <v-col
                                    cols="20"
                                    sm="9"
                                    >
                                        <input
                                        v-model="newContent"
                                        type="text"
                                        height=5
                                        clearable
                                        autofocus
                                        ref="updatecom"
                                        style="width:400px;height:50px;font-size:15px;"
                                        >
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <div class="icon-box">
                                        <a class="icon-tag">
                                            <button 
                                            :disabled="newContent.length < 1"
                                            onclick="inputnewCon=false" type="submit" style="display:flex;">
                                                <v-icon 
                                                style="padding-top:2px;"
                                                size="20px"
                                                >mdi-check</v-icon>
                                            </button>
                                        </a>
                                        <a class="icon-tag">
                                            <button  @click="inputnewCon=false">
                                                <v-icon 
                                                size="20px"
                                                >mdi-close-box-outline</v-icon>
                                            </button>
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </form>
        </ValidationObserver>
    </v-app>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import Validate from '@/mixin/Validate.vue';
    export default {
        mixins: [Validate],
        data() {
            return{
                content:'',
                newContent:'',
                inputnewCon:false,
                UserId: localStorage.getItem('UserId'),
                
            }
        },
        computed:{
            ...mapState('Comment',{
                commentlist: 'commentlist'
            }),
            
        },
        created(){
            this.fetchCommentList()
            // this.getUserId()
        },
        methods:{
            ...mapActions('Comment',[
                'CREATE_COMMENT',
                'FETCH_COMMENT',
                'UPDATE_COMMENT',
                'DELETE_COMMENT',
            ]),
            onSubmit() {
                this.CREATE_COMMENT({pid: this.$route.params.pid,content: this.content})
                .then(() => {
                    console.log('onsubmit 댓글 전송')
                    // this.$store.commit('Post','')
                    // this.$refs["comment"].value = "";
                    // this.$refs.comment.reset()
                       this.$refs.postcomment.reset()
                })
                .finally(() => {
                    this.fetchCommentList()
                })
            },
             //댓글 리스트 조회
            fetchCommentList(){
                this.FETCH_COMMENT({pid: this.$route.params.pid}).then(() => {
                    console.log('조회됨');
                }).catch(err => {
                    console.log("댓글 조회x",err);
                })
            },

            //댓글 수정
            updateComment(cid){
                console.log('수정값',this.newContent);
                this.UPDATE_COMMENT({pid:this.$route.params.pid, cid , content:this.newContent})
                .then(() => {
                    console.log('댓글 수정')
                    location.reload();
                })
                .catch(() => {
                    console.log('댓글 수정 실패');
                })
                .finally(() => {
                    this.fetchCommentList()
                })
            },

            //댓글 삭제
            deleteComment(cid){
                console.log("삭제");
                this.DELETE_COMMENT({pid:this.$route.params.pid, cid})
                .then(() => {
                    console.log('댓글 삭제')
                })
                .catch(() => {
                    console.log('댓글 삭제 실패');
                })
                .finally(() => {
                    this.fetchCommentList()
                })
            },

            commentReverse(){
                console.log( this.commentlist[0] )
                console.log(this.commentlist.slice().reverse());
                this.reverseComment = this.commentlist.slice().reverse()
            },

            getUserId() {
                console.log('이건', localStorage.getItem('UserId') );
            }
        },
        mounted(){
            this.fetchCommentList()
        }
    }
</script>

<style>

.content-item{
    display: grid;
    width: 100%;
}

.flex{

}

.UD-btn{
    padding: 3px 5px 0 5px;
    float: right;
    font-size: 12px;
    display: flex;
}

.a-tag{
    padding: 3px 3px 3px 3px;
}

.icon-box{
    display: flex;
    margin-top:5px;

}

.icon-tag {
    padding: 8px 3px 3px 3px;
}

.theme--light.v-sheet {
  background-color: white !important;
}

</style>