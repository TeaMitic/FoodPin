<template>
    <div >
        <!-- Navigation-->
        <UserHeaderComponent @childToParentYes="onChildClickYes"  />
        <!-- Main container -->
        <div class="container my-3 py-5">
            <!-- User info -->
            <div v-if="!this.isDataLoaded">
                <AppSpinner />
            </div>
            <div v-else>
                <div class="user-info">
                    <div class="cont-user-image">
                     <img v-if="!this.hasImage" class="user-image" src= "../assets/img/blank_profile.png" alt="User profile image">
                     <img v-else class="user-image" :src= this.imageUrl alt="User profile image">
                    </div>
                    <div class="cont-user-fullname">
                        <h2 class="user-fullname">{{user.name}} {{user.surname != undefined ? user.surname : ""}}</h2>
                    </div>
                    <div class="cont-user-username">
                        <p class="user-username"><b>@{{user.username}}</b></p>
                    </div>
                    <div class="cont-user-follows row justify-content-center">
                        <div class="cont-user-followers d-flex justify-content-center col-2"><p class="user-follows">Followers: <b>{{user.followers}}</b></p></div>
                        <div class="cont-user-following d-flex justify-content-center col-2"><p class="user-follows">Following: <b>{{user.following}}</b></p></div>
                    </div>
                    <div class="cont-user-website">
                        <a class="user-website" v-bind:href="user.website" target="_blank" rel="noopener"><b>{{user.website | trim-web}}</b></a>
                    </div>
                    <div class="cont-user-about">
                        <p class="user-about">{{user.about}}</p>
                    </div>
                    <div class="cont-user-buttons">
                        <div v-if="this.editable">
                            <button class="edit-button">Edit</button>
                        </div>
                        <div v-else>
                            <button class="follow-button mx-1">Follow/Unfollow</button>
                            <button class="chat-button mx-1">Message</button>
                        </div>
                    </div>
                </div>
                <!-- Created or saved pins option -->
                <!-- <div class="cont-pin-options row justify-content-center p-3">
                    <button v-on:click="showBoards('created')" class="col-2 mx-1">Created</button>
                    <button v-on:click="showBoards('saved')" class="col-2 mx-1">Saved</button>
                </div> -->
                <!-- Boards -->
                <div class="cont-boards">
                    <div class="cont-boards-add row justify-content-end">
                        <!-- add board or pin ikonica -->
                        <button class="add-btn rounded-circle">
                            <font-awesome-icon class="plus-icon" :icon="['fa','plus']"/>
                        </button>
                    </div>  
                    <div class="cont-boards-all row">
                        <!-- prvo ide All pins uvek pa onda ostale -->
                        <!-- All pins card component -->
                        <!-- Other boards card component -->
                        <BoardCard v-for="board in allBoards" :key="board.boardID" :board="board" class= "col-3 m-3"/>
                    </div>
                </div>
            </div>
            
        </div>

        <!-- Footer-->
        <footer class="bg-light py-5 row ">
            <div class="  container px-4 px-lg-5 ">
                <div class="small text-center text-muted">Copyright &copy; 2022 - FoodPin</div>
            </div>
        </footer>
    </div>

</template>

<script>
import Vue from 'vue'
import UserHeaderComponent from '../components/UserHeaderComponent.vue'
import AppSpinner from '../components/AppSpinerComponent.vue'
import ImageConverter from '../helper/imageConverter' 
import BoardCard from '../components/BoardCardComponent.vue'


export default({ 
    title: "FoodPin - Profile",
    components: { 
        UserHeaderComponent,
        AppSpinner,
        BoardCard

    },
    data() { 
        return {
            isDataLoaded: false,
            user: null,
            boards: null,
            visiting: false,
            editable: false,
            imageUrl:  null, 
            hasImage: false,
            // shownBoards: 'saved'


        }
    },
    computed: {
        allBoards() { 
            return  this.$store.getters["getBoardsForUser"]
        }
    },
    methods: {
        // showBoards(type) { 
        //     this.shownBoards = type
        // },
        onChildClickYes(value){
            console.log("REDIRECTED: ",value)
        }
    },
    async created() {
        let usernameCookie = Vue.$cookies.get('username')
        let usernameParam = this.$route.params.username 

        usernameCookie === usernameParam ? this.editable = true : this.editable = false //validating if personl acc 
        await this.$store.dispatch("getUserByUsername", usernameParam)
        this.user = this.$store.getters["getUser"]
        await this.$store.dispatch("getBoardsForUser", this.user.userID)
        this.isDataLoaded = true;
        
        if (this.user.image != null) { 
            this.imageUrl =  ImageConverter.fromByteArray(this.user.image.data)
            this.hasImage = true
        }
        // else { 
        //     this.hasImage =
        //     this.imageUrl = "../assets/img/blank_profile.png"
        // }

    },
  
   
})

</script>

<style >

#app{
    margin-top: 0%;
    overflow-x: hidden;

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
    border-radius: 50%;
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-top: 1rem;

}
.add-btn { 
    height: 70px;
    width: 70px;
    background-color: transparent;
    padding: 0;
    border: none;
}
.add-btn:hover { 
    background-color: rgb(209, 207, 207);
}
.plus-icon { 
    height: 50px !important;
    width: 50px !important;
}




</style>