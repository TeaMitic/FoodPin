<template>
    <div >
        <!-- board builder  -->
        <BoardBuilder v-if="showBoardBuilder" @toggleBoardBuilder="toggleBoardBuilder"/>
        <!-- Navigation-->
        <UserHeader  v-if="!showBoardBuilder" />
        <!-- Main container -->
        <div class="container my-3 py-5 ">
           
            <!-- User info -->
            <div v-if="!this.isDataLoaded">
                <AppSpinner />
            </div>
            <div v-else class="profile-cont">
                <div class="user-info ">
                    
                    <div class="cont-user-image">
                     <img v-if="!this.hasImage" class="user-image img-fluid rounded-circle" src= "../assets/img/blank_profile.png" alt="User profile image">
                     <img v-else class="user-image img-fluid rounded-circle " :src= this.imageUrl alt="User profile image">
                    </div>
                    <div class="cont-user-fullname mt-1">
                        <h2 class="user-fullname">{{user.name}} {{user.surname != undefined ? user.surname : ""}}</h2>
                    </div>
                    <div class="cont-user-username">
                        <p class="user-username m-0"><b>@{{user.username}}</b></p>
                    </div>
                    <div class="cont-user-follows row justify-content-center">
                        <span class="cont-user-followers d-flex justify-content-end col-2 " >
                            <p class="user-follows">Followers: <b>{{user.followers}}</b></p>
                            <!-- <FollowersField v-if="showFollowersField" :followersNum="user.followers" :userID="user.userID" /> -->
                        </span>
                        <span class="cont-user-following d-flex justify-content-start col-2 " >
                            <p class="user-follows">Following: <b>{{user.following}}</b></p>
                            <!-- <FollowingField v-if="showFollowingField"  :followingNum="user.following" :userID="user.userID" /> -->
                        </span>
                    </div>
                    <div class="cont-user-website mb-1" v-if="user.website != undefined">
                        <a class="user-website link" v-bind:href="user.website" target="_blank" rel="noopener">
                            <font-awesome-icon :icon="['fa','link']" class="mx-1 fa-lg" />
                            <b>{{user.website | trim-web}}</b>
                        </a>
                    </div>
                    <div class="cont-user-about row justify-content-center" v-if="user.about != undefined">
                        <div class="col-6">
                            <q class="user-about">{{user.about}}</q>
                        </div>
                    </div>
                    <div class="cont-user-buttons row justify-content-center">
                        <div v-if="this.editable" class=" col-2 p-2  ">
                            <router-link :to="{name: 'settings'}" class="edit-button rounded link d-flex justify-content-center align-items-center">
                                <font-awesome-icon class=" mx-2 mb-1 fa-2x " :icon="['fa','user-edit']" />
                            </router-link>
                        </div>
                        <div v-else  class="edit-button col-6">
                            <button class="follow-button mx-1" v-if="!this.isFollowing">Follow</button>
                            <button class="follow-button mx-1" v-else>Unfollow</button>
                            <button class="chat-button mx-1">Message</button>
                        </div>
                    </div>
                </div>
                <!-- Boards -->
                <div class="cont-boards">
                    <div class="cont-boards-add row justify-content-end" v-if="this.editable">
                        <!-- add board or pin ikonica -->
                        <button class="add-btn rounded-circle d-flex" v-on:click="toggleCreateField">
                            <font-awesome-icon class="icon-color fa-2x" :icon="['fa','plus']"/>
                        </button>
                        <div class="create-field" v-if="showCreateField">
                            <div class="row align-items-left ">
                                <label class="d-flex mt-2 mx-1">Create</label>
                                <router-link :to="{name: 'pin-builder'}" class="link">
                                    <button class="create-field-option my-1 mx-1">
                                        <h3>Pin</h3>
                                    </button>
                                </router-link>
                                <button class="create-field-option mx-1 mb-1" v-on:click="toggleBoardBuilder">
                                    <h3>Board</h3>
                                </button>
                                
                            </div>
                        </div>
                    </div>  
                    <div class="cont-boards-all row flex-wrap justify-content-center">
                        <BoardCard v-for="board in allBoards" :key="board.boardID" :board="board" class= "col-3 m-3"/>
                    </div>
                </div>
            </div>
            
        </div>
    </div>

</template>

<script>
import Vue from 'vue'
import UserHeader from '../components/UserHeaderComponent.vue'
import AppSpinner from '../components/AppSpinnerComponent.vue'
import ImageConverter from '../helper/imageConverter' 
import BoardCard from '../components/BoardCardComponent.vue'
import BoardBuilder from '../components/BoardBuilderComponent.vue'


export default({ 
    title: "FoodPin - Profile",
    components: { 
        UserHeader,
        AppSpinner,
        BoardCard,
        BoardBuilder,

    },
    data() { 
        return {
            isDataLoaded: false,
            user: null,
            boards: null,
            visiting: false,
            editable: true,
            imageUrl:  null, 
            hasImage: false,
            // shownBoards: 'saved'
            showCreateField: false,
            showBoardBuilder: false,
            // showFollowersField: false,
            // showFollowingField: false
            isFollowing: false,


        }
    },
    computed: {
        allBoards() { 
            return  this.$store.getters["getBoardsForUserWithImages"]
        }
    },
    methods: {
        // showBoards(type) { 
        //     this.shownBoards = type
        // },
        toggleCreateField() { 
            this.showCreateField = !this.showCreateField
        },
        toggleBoardBuilder() { 
            this.showBoardBuilder = !this.showBoardBuilder
            this.showCreateField = !this.showCreateField
        },
        // toggleFollowersField() { 
        //     this.showFollowersField = !this.showFollowersField
        // },
        // toggleFollowingField() { 
        //     this.showFollowingField = !this.showFollowingField
        // }
        isVisitor(usernameParam) { 
            let usernameCookie = Vue.$cookies.get('username')
            let isVisiting
            usernameCookie !== usernameParam ? isVisiting = true : isVisiting = false //validating if personl acc 
            return isVisiting
        },
        async isFollowingThem(usernameParam) { 
            let followInfo = { 
                user: Vue.$cookies.get('username'),
                followed: usernameParam 
            }
            await this.$store.dispatch('isFollowing',followInfo)
            return await this.$store.getters['getIsFollowing']
        }
    },
    async created() {
        let usernameParam = this.$route.params.username 
        if (this.isVisitor(usernameParam)) { 
            this.editable = false
            this.isFollowing = await this.isFollowingThem(usernameParam)  
        } 
        await this.$store.dispatch("getUserByUsername", usernameParam)
        this.user = this.$store.getters["getUser"]
        await this.$store.dispatch("getBoardsForUserWithImages", this.user.userID)
        this.isDataLoaded = true;
        if (this.user.hasImage) { 
            this.imageUrl =  ImageConverter.fromByteArray(this.user.image.data)
            this.hasImage = true
        }
    },
  
   
})

</script>

<style scoped>

#app{
    margin-top: 0%;
    overflow-x: hidden;
}

.profile-cont { 
    background-color: #fff;
    border-radius: 1%;
    padding: 3%;
}
.nav-link { 
    font-size: 1.2rem !important;
}
.no-border:focus {
    outline: none;
    box-shadow: none;
}
.btn-margins { 
    padding: 0px !important;
    margin: 0px 10px 0px 10px;
}
.menu-divider  {
    width: 30%;
}
.user-image { 
    margin-top: 1rem;
    height: 15em;
    width: 15em;
}
.add-btn { 
    height: 70px;
    width: 70px;
    background-color: transparent;
    padding: 0;
    border: none;
    justify-content: center;
    align-items: center;
}
.add-btn:hover { 
    background-color: rgb(209, 207, 207);
    transition: 0.2s ease-out;
}
.icon-color { 
    color: #f4623a;
}
.icon-color:hover { 
    color: #c34e2e;
}

.create-field { 
    display:flex;
    align-items: flex-end;
    flex-direction: column;
    position: absolute;
    bottom: 30%;
    width: fit-content;
}
.create-field > div { 
    background-color: rgb(246 246 246);
    border-radius: 8px;
}
.create-field-option { 
    background-color: gainsboro;
    display: flex;
    border-radius: 5px;
    width: -webkit-fill-available;
}
.create-field-option:hover { 
    background-color: hsl(0, 0%, 60%);
    transition: 0.2s ease-out;
}
.link {
    text-decoration: none;
    padding: 0;
}
.cursor-pointer { 
    /*beacusse it is a div*/
    border-radius: 15px;
}
.cursor-pointer:hover{ 
    cursor: pointer;
    /*beacusse it is a div*/
    background-color: antiquewhite;
}

@media screen {
    
}


</style>