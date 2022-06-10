<template>
    <div>
        <UserHeader />
        <!-- Masthead-->
        <header class="masthead">
            <div class="container px-4 px-lg-5 mt-5">
                <div v-if="!isDataLoaded">
                    <AppSpinner />
                </div>
                <div v-else>
                    <div class="row">
                        <div class="back col-2">
                             <button> BACK </button>
                        </div>
                        <div class="pin col-8">
                            <div class="row pinRow">
                                <div class="col-6 img">
                                    image
                                    <!-- ili ovde da ide img tag, mozda je to bolje da bude kao popunjen div -->
                                </div>
                                <div class="col-6 info">
                                    <div class="row board-save justify-content-end mx-4">
                                        <div class="col-4">
                                            <select v-model="selected_board" class="select">
                                                <option v-for="board in boards" :key="board.boardID" :value="board.name">{{board.name}}</option>
                                            </select>
                                        </div>
                                        <div class="col-4">
                                            <button class="button" @click= "savePin">Save pin</button>
                                        </div>
                                    </div>
                                    <div class="row pinName justify-content-center my-1">
                                        <h3 class="h3">{{pin.title}}</h3>
                                    </div>
                                    <div class="row username-follow justify-content-center align-items-center">
                                        <div class="col-6 img-username">
                                            <div class="profile">
                                                <img v-if="!this.hasImage" class="profile" src= "../assets/img/blank_profile.png" alt="User profile image">
                                                <img v-else class="profile" :src= this.imageUrl alt="User profile image">
                                            </div>
                                            <p class="mx-3">{{user.name}} {{user.surname}}</p>
                                        </div>
                                        <div class="col-6">
                                            <button class="button btn-follow" @click="follow">Follow</button>
                                        </div>
                                        <!-- Username and Follow -->
                                    </div>
                                    <div class="row likes-comments">
                                        <div class="likes">
                                            <font-awesome-icon :icon="['fa','heart']" /> <p class="likes-p">{{pin.likes}} Likes</p>
                                        </div>
                                        <div class="comments-div justify-content-center">
                                            <div v-if="otherComments" class="comments">
                                                others comments - component
                                            </div>
                                            <div class="post-comment">
                                                <input class="input-comm" type="text" v-model="comment">
                                                <button class="button btn-post">Post</button>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="row original-user align-items-end">
                                        Original: @username
                                    </div> -->
                                    <!-- 5 rows -->
                                    <!-- board save -->
                                    <!-- pin name -->
                                    <!-- username follow -->
                                    <!-- likes and comments -->
                                    <!-- original user -->
                                    <!-- info -->
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </header>

   
    </div>
</template>

<script>
import UserHeader from '@/components/UserHeaderComponent.vue'
import AppSpinner from '@/components/AppSpinnerComponent.vue'
import ImageConverter from '../helper/imageConverter' 
import Vue from 'vue'

export default {
    components:{
        UserHeader,
        AppSpinner
    },
    data(){
        return{
            isDataLoaded: false,
            otherComments: true,
            selected_board: 'All pins',
            comment: "",
            boards: null,
            pin: null,
            user: null,
            imageUrl:  null, 
            hasImage: false,

        }
    },
    methods:{
        savePin(){
            if(this.selected_board != ""){
                const obj={
                userID: Vue.$cookies.get('userID'),
                pinID: this.pin.pinID,
                boardName: this.selected_board
                }
                this.$store.dispatch('savePin', obj)
            

            }
            else{
                Vue.toasted.show('You must select a board', {
                theme: "bubble",
                position: "top-center",
                duration: 2500
                })
            }
        },
        follow(){

        }
    },
    async created(){
        let pinParams = this.$route.params.pinID 
        await this.$store.dispatch('getPinById', pinParams)
        this.pin = this.$store.getters['getPin']

        await this.$store.dispatch('getUserById', this.pin.creatorID)
        this.user = this.$store.getters['getUser']
        if (this.user.hasImage) { 
            this.imageUrl =  ImageConverter.fromByteArray(this.user.image.data)
            this.hasImage = true
        }


        const userID = Vue.$cookies.get('userID')
        await this.$store.dispatch('getBoardsForUserNoImages', userID)
        this.boards = this.$store.getters['getBoardsForUserNoImages']
        this.isDataLoaded = true
        // this.imageUrl = imageConverter.fromByteArray(this.pin.image.data)
        // console.log(this.imageUrl);
        // this.cssProps.backgroundImage = `url(${this.imageUrl})`
    }


}
</script>

<style scoped>
:root{
  --clr-orange: #f4623a;
  --clr-neutral-100: hsl(0,0%,100%);  
}
.pin{
    background-color: beige;
    height: 30rem;
    border-radius: 20px;
    overflow: hidden;
}
.pinRow{
    height: inherit;
}
.h3{
    margin-top: 5%;
    margin-bottom: 5%;
    color:#f1334f;
    text-decoration: overline;
    
}
.info{
    background-color: white;
}
.img{
    /* background-color: blueviolet; */
    background-image: url("../assets/img/foodpin2.jpg");
    background-size: cover;
}
.select{
  background-color: transparent;
  border: 0;
  width: 100px;
  color: #e60023;
}
.button{
  cursor: pointer;
  position: inherit;
  display: inline-block;
  text-decoration: none;
  color: hsl(0,0%,100%);
  background-color: #e60023 ;
  border: var(--clr-orange);
  margin-top: 2%;
  margin-right: 2%;
  border-radius: 10%;
}

.button:hover, .button:focus {
    background-color: rgb(190 188 188 / 0.7);
}
.btn-post{
    margin: 0;
    height: auto;
    margin-top: auto;
    margin-left: 1%;
}
.btn-follow{
    margin: 0;
    height: 45px;
    width: inherit;
    margin-top: auto;
    margin-left: 1%;
}

.profile{
    border-radius: 50%;
    background-color: rgb(145, 145, 145);
    width: 60px;
    height: 60px;
}

.img-username{
    display: flex;
    align-items: center;
}
.likes-comments{
    display: flex;
    flex-wrap: wrap;
}
.likes{
    display: flex;
    align-items: center;
    margin-top: 10%;
}
.likes-p{
    display: flex;
    padding-left: 1%;
    align-self: center;
    padding: 0;
    margin:0;
}
.comments{
    border: 1px solid black;
    overflow-y: scroll;
    height: 200px;
}
.input-comm{
    width: 100%;
    margin-top: 1%;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 2px black;
    background-color: rgb(190, 188, 188);
}
.post-comment{
    display: flex;
}
</style>