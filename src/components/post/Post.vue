<template>
<v-app>
    <v-container fluid class="background">
    <v-card
        elevation="4"
        outlined class="mx-auto"
        max-width="900"
        style="margin-top:130px;"
        >  
    <main class="post-main">
        <!-- ------------------------------------------------ -->
        <div class="post-header">
            
            <div class="header-desc">
                <div class="post-title-area">
                    <div class="post-title">
                        <h1>{{post.title}}</h1>
                    </div>
                </div>
                <div class="post-user-area">
                    <div v-if="`${post.UserId}`!== `${this.UserId}`" class="post-user">
                        <router-link
                        :to="`/profile/${post.UserId}`">
                            <div style="display:flex;">
                                
                                    <v-avatar>
                                        <img v-if="this.photoUrl !== 'no-photo'" :src="`${url}/uploads${this.photoUrl}`"/>
                                        <v-img v-else src="@/assets/human.jpg"></v-img>
                                    </v-avatar>
                                
                                <div style="margin:0 0 0 25px; color:black;">
                                    <h2>{{post.UserId}}</h2>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div v-else class="post-user">
                        <router-link
                        :to="`/myProfile`">
                            <div style="display:flex;">
                                <v-row>
                                    <v-avatar
                                        class="userIcon"
                                        color="red"
                                        size="36"
                                        >
                                        <img v-if="this.photoUrl !== 'no-photo'" :src="`${url}/uploads${this.photoUrl}`"/>
                                        <v-img v-else src="@/assets/human.jpg"></v-img>
                                    </v-avatar>
                                </v-row>
                                <div style="margin:5px 0 0 25px; color:black;">
                                    <button>{{post.UserId}}</button>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <v-spacer></v-spacer>
                </div>
            </div>


            <!-- 1.???????????? ????????? ?????? -->
            <div style="display:flex;" v-if="post.UserId === UserId" >

                <!-- 1-1. ????????? ????????? ?????? ?????? -->
                <div v-if="new Date(this.post.date) < new Date()">
                    <div class="header-btn-area">
                        <div class="header-btn">
                            <v-btn
                            rounded
                            color="error"
                            @click ="deletePost"
                            >??????</v-btn>
                        </div>
                    </div>
                </div>
                
                <!-- 1-2. ????????? ????????? ????????? ?????? -->
                <div 
                v-else
                style="display:flex;"
                class="header-btn-area"
                >
                    <router-link
                    :to="`/editpost/${post.id}`">
                        <div 
                        class="header-btn"
                        style="margin:0 15px 0 0;">
                            <v-btn
                            rounded
                            color="primary"
                            >??????</v-btn>
                        </div>
                    </router-link>
                    <div >
                        <!-- class="header-btn-area" -->
                        <div style="margin: 0 15px 0 0;">
                            <!-- class="header-btn" -->
                            <v-btn
                            rounded
                            color="error"
                            @click ="deletePost"
                            >??????</v-btn>
                        </div>
                    </div>
                </div>
            </div>


            <!-- 2. another ????????? -->
            <div class="header-btn-area" v-else>
                <!-- 2-1. only ???????????? -->
                <div class="header-btn" v-if="attendUser.success">
                    <v-btn
                    rounded
                    color="gray"
                    @click ="deleteAttend"
                    >?????? ??????</v-btn>
                </div>
                <!-- 2-2. ????????????, ???????????? -->
                <div class="header-btn" v-else-if="attendList.acceptlist.length === post.capacity">
                    <v-btn
                    rounded
                    color="primary"
                    disabled
                    >?????? ??????</v-btn>
                </div>
                <div class="header-btn" v-else-if="new Date(post.date) < new Date()">
                    <v-btn
                    rounded
                    color="primary"
                    disabled
                    >?????? ??????</v-btn>
                </div>
                <!-- 2-3. ????????????, ???????????? -->
                <div class="header-btn" v-else>
                    
                    <v-btn
                    rounded
                    color="primary"
                    @click ="attend"
                    >????????????</v-btn>
                </div>
            </div>

        </div>

        <!-- ------------------------------------------------- -->

        <form class="post-form">

            <div class="post-center">
                <div class="post-desc">
                    {{post.content}}
                </div>
                
                <Comment />

            </div>
            
            <div class="post-sub">
                <div class="post-detail">
                    <v-card
                    class="mx-auto"
                    max-width="344"
                    >
                        <v-card-text>
                            <div></div>
                            <p class="text-h7 text--primary">
                            {{post.date.slice(0,4)}}??? {{post.date.slice(5,7)}}??? {{post.date.slice(8,10)}}??? {{post.time.slice(0,2)}}??? {{post.time.slice(3,5)}}???
                            </p>
                            <div class="text--primary">
                                ??????: {{post.address}}
                            </div>
                            <br>
                            <p>?????? : {{post.cost}}???</p>
                            
                        </v-card-text>
                    </v-card>
                </div>    
                <div class="participant">
                    <v-card
                    class="mx-auto"
                    max-width="344"
                    >
                        <div>
                            <h2>????????????</h2>
                        </div>
                        <div style="font-size: 80px;">
                            {{attendList.acceptlist.length}}/{{post.capacity}}
                        </div>
                    </v-card>
                </div>    
                <v-spacer></v-spacer>    
            </div>  

        </form>

        <!-- -------------------------------------------------- -->

    </main>
    </v-card>
    </v-container>
</v-app>
</template>

<script>
import Comment from '../comment/comment.vue'
import {mapState, mapActions} from 'vuex'
import axios from 'axios'
// import userphoto from '@/assets/human.jpg'

    export default {
        components:{Comment},
        data(){
            return {
                reveal: false,
                year:'',
                month:'',
                date:'',
                HH:'',
                mm:'',
                UserId: localStorage.getItem('UserId'),
                photoUrl: "",
                noimg: require("@/assets/1.png")

            }
        },
        computed:{
            ...mapState('Post',{
                post:'post'
            }),
            ...mapState('Attend',{
                attendList: 'attendList',
                attendUser:'attendUser'
            }),
            url (){
				return process.env.VUE_APP_API;
			},
        },
        
        async created() {
            await this.fetchpost(),
            this.fetchAttendList(),
            this.attendUserInfo(),
            console.log(this.attendUser)
            console.log(new Date());
            console.log(this.post.date);
            console.log(new Date(this.post.date) < new Date());
        },
        mounted(){
            this.getWriterInfo()
        },

        methods:{
            ...mapActions('Post',[
                "FETCH_POST",
                "FETCH_POSTLIST",
                "DELETE_POST",
            ]),
            ...mapActions('Attend',[
                "ATTEND_POST",
                'DELETE_ATTEND',
                'FETCH_ATTENDLIST',
                'FETCH_AUSER',
            ]),


            // ????????? ????????? ?????? ??????
            async getWriterInfo(){
                await axios
                .get(process.env.VUE_APP_API + `/post/${this.$route.params.pid}/writer`,{
                    headers:{
                        Authorization: `${localStorage.getItem('token')}`
                    }
                })
                .then((response)=>{
                    console.log("getWriterInfo - response", response.data);
                    if (response.data.data.photoUrl === 'no-photo') {
                        this.photoUrl = "no-photo"
                        console.log("IF - NO-PHOTO", this.photoUrl)
                    } else {
                        this.photoUrl = response.data.data.photoUrl;
                        console.log("else", this.photoUrl)
                    }
                })
                .catch((error)=>{
                    console.log('getWriterInfo - error', error);
                })
            },



            //????????? ?????? get
            async fetchpost(){
                this.FETCH_POST({id:this.$route.params.pid}).then( () => {
                    console.log('??????????????? req ??????');
                })
            },

            //????????? ??????
            deletePost(){
                //????????? ?????? ???????????????
                if (!window.confirm('?????????????????????????')) return

                this.DELETE_POST({
					id:this.$route.params.pid,
				}).then(this.$router.push('/posts'))
				.catch(err => {
					console.log(err);
				})
				.finally(() => {
					this.fetchPostlist()
				})
            },

            //????????? ????????? get
            fetchPostlist(){
                this.FETCH_POSTLIST({cateName:'all'})
                .then(data => console.log(data.data))
            },

            //?????? ?????? post 
            attend(){
                return this.ATTEND_POST({pid: this.$route.params.pid}).then( () => {
                    console.log('?????? ??????!');
                }).catch(err => {
                    console.log('?????? ??????',err);
                })
            },
            deleteAttend(){
                this.DELETE_ATTEND({pid:this.$route.params.pid, UserId:localStorage.getItem('UserId')})
            },
            /* *????????? ????????? ?????? ?????? ?????? */
            attendUserInfo(){
                return this.FETCH_AUSER({pid: this.$route.params.pid, UserId: localStorage.getItem('UserId')})
                    .then(() => console.log('?????? ?????? ?????? ??????'))

            },

            //????????? ????????? ??????
            fetchAttendList(){
                return this.FETCH_ATTENDLIST({id: this.$route.params.pid}).then(() => {
                    console.log('????????? ????????? req');
                }).catch(err => {
                    console.log('????????? ????????? ?????? req ??????',err);
                })
            }
        },
    }
</script>

<style>
/* ????????? body(header + form) ?????? */
.post-main{
    width: 900px;
    height: 100%;
    margin:auto;
    /* border-radius: 5%; */
    /* border: 1px black solid; */
    /* box-shadow: 3px 2px 1px 0px; */
}
/* --------------------------- header ----------------------------------- */
/* header ?????? */
.post-header{
    margin: auto;
    margin-top: 50px;
    display: flex;
    height: 20%;
}
/* /* ?????? ?????? */
.header-btn-area{
    margin: 40px 60px 0 0;
} 

/* .header-btn{
    margin: 40px 60px 0 0;
} */


/* title,user?????? ?????? */
.header-desc{
/* background-color: goldenrod; */
    width: 900px;
}
/* title */
.post-title-area{
    padding: 40px 0 0 60px;
    height: 100px;
    /* background-color: grey; */
}
.post-title{
    margin: 0 0 0 0;
}


/* user?????? */
.post-user-area{
/* background-color: green; */
height: 60px;
margin-top: 10px;
}

.userIcon{
    margin: 10px 0 0 0;
}
.post-user{
    margin: 20px 0 0 70px;
    display: flex;
}


/* ------------------------- body-form --------------------------------- */
/* form ???????????? */
.post-form{
    display: flex;
}


/* ?????????, ?????? ?????? */
.post-center{
    display: grid;
    width: 600px;
    /* height: 900px; */
}

.post-desc{
    margin-bottom: 50px;
    padding: 10%;
    font-size: 13px;
}


.post-comment{
    margin: 0 0 0 50px;
}


/* ???????????? ?????? */
.post-sub{
    display: grid;
}

/* ???????????? */
.post-detail{
    /* background-color: gold; */
    width: 250px;
    margin: 0;
}

/* ????????? */
.participant{
    text-align: center;
    height:160px;
    margin-top: 10px;
    
}


/* ????????? */
/* .applicant{
    background-color: mediumorchid;
} */

.v-card--reveal {
bottom: 0;
opacity: 1 !important;
position: absolute;
width: 100%;
}

/* .background {
    height:100vh;
} */



</style>