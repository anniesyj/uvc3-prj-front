<template>
    <v-app>
        <section>
            <v-carousel 
                hide-delimiters
                height="100vh"
                :cycle="true"
                :interval="4000">
                <v-carousel-item
                    v-for="(item,i) in items"
                    :key="i"
                    :src="item.src"
                ></v-carousel-item>
            </v-carousel>
        </section>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                items:[
                    {src: require("../assets/1.png")},
                    {src: require("../assets/2.png")},
                    {src: require("../assets/3.png")},
                    {src: require("../assets/4.png")},
                    {src: require("../assets/5.png")},
                    {src: require("../assets/6.png")},
                ]
            }
        }
    }
</script>

<style css>
body {
    margin: 0;
    
}

/* section {
    height: 80vh;
    bottom: 0; */
    /* background: url(); */
/* } */

section:before{
    content: '';
    background: linear-gradient(to right,white,transparent);
    position: absolute;
    left: 0;
}

.v-window__next {
    background:rgba(241, 239, 239, 0.15);
    top:calc(50% - 33px);
    margin-left:96%;
    }
.v-window__prev {
    background:rgba(242, 240, 240, 0.15);
    top:calc(50% - 33px);
    /* margin-left:13%; */
    float: right;
}


.v-window__prev .v-btn__content,
.v-window__next .v-btn__content {
  color: rgb(84, 82, 82);
}

.background {
    height:100vh;
}

/* 
.v-window__prev:hover {
    display:block;
}
.v-window__next:hover {
    display:block;
} */



</style>