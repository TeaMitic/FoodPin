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
                    <div class="cont-user-buttons">
                        <div v-if="this.editable">
                            <button class="edit-button">Edit</button>
                        </div>
                        <div v-else>
                            <button class="follow-button">Follow/Unfollow</button>
                            <button class="chat-button">Message</button>
                        </div>
                    </div>
                </div>
                <!-- Created or saved pins option -->
                <div class="cont-pin-options row justify-content-center p-3">
                    <button v-on:click="showBoards('created')" class="col-2 mx-1">Created</button>
                    <button v-on:click="showBoards('saved')" class="col-2 mx-1">Saved</button>
                </div>
                <!-- Boards -->
                <div class="cont-boards">
                    <div class="cont-boards-add">
                        <!-- dve ikonice jedna sort boards (levo) i druga add pin/board (desno) -->
                        <!-- sort boards ne radi za all pins, on je uvek na pocetku  -->
                        
                    </div>  
                    <div class="cont-boards-all">
                        <!-- prvo ide All pins uvek pa onda ostale -->
                        <!-- All pins card component -->
                        <!-- Other boards card component -->
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


export default({ 
    title: "FoodPin - Profile",
    components: { 
        UserHeaderComponent,
        AppSpinner,

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
            shownBoards: 'saved'


        }
    },
    methods: {
        showBoards(type) { 
            this.shownBoards = type
        },
        onChildClickYes(value){
            console.log("REDIRECTED: ",value)
        }
    },
    async created() {
        let usernameCookie = Vue.$cookies.get('username')
        let usernameParam = this.$route.params.username 
        console.log("USERNAME COOKIE:",usernameCookie)
        console.log("USERNAME COOKIE:",usernameParam)
        usernameCookie === usernameParam ? this.editable = true : this.editable = false //validating if personl acc 
        await this.$store.dispatch("getUserByUsername", usernameParam)
        this.user = this.$store.getters["getUser"]
        await this.$store.dispatch("getBoardsForUser", this.user.userID)
        this.boards = this.$store.getters["getBoardsForUser"]
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





</style>