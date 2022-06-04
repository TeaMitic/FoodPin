<template>
    <div >
        <!-- Navigation-->
        <!-- <UserHeaderComponent @childToParentYes="onChildClickYes" /> -->
        <!-- Main container -->
        <div class="container">
            <!-- User info -->
            <div v-if="!this.isDataLoaded">
                <AppSpinner />
            </div>
            <div v-else>
                <div class="user-info">
                    <div class="cont-user-image">
                     <img class="user-image" :src= this.imageUrl alt="User profile image">
                    </div>
                    <div class="cont-user-fullname">
                        <h2 class="user-fullname">{{user.name}} {{user.surname != undefined ? user.surname : ""}}</h2>
                    </div>
                    <div class="cont-user-username">
                        <p class="user-username">{{user.username}}</p>
                    </div>
                    <div class="cont-user-follows">
                        <div class="cont-user-followers"><p class="user-follows">{{user.followers}}</p></div>
                        <div class="cont-user-following"><p class="user-follows">{{user.following}}</p></div>
                    </div>
                    <div class="cont-user-buttons"></div>
                    </div>
                    <!-- Created or saved pins option -->
                    <div class="cont-pin-options">

                </div>
                <!-- Boards -->
                <div class="cont-boards">
                    <div class="cont-boards-add"></div>
                    <div class="cont-boards-all"></div>
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
// import UserHeaderComponent from '../components/UserHeaderComponent.vue'
import AppSpinner from '../components/AppSpinerComponent.vue'
import ImageConverter from '../helper/imageConverter' 

export default({ 
    title: "FoodPin - Profile",
    components: { 
        // UserHeaderComponent
        AppSpinner
    },
    data() { 
        return {
            isDataLoaded: false,
            user: null,
            boards: null,
            visiting: false,
            editable: false,
            imageUrl:  "assets\\img\\blank-profile.png" //Aplikacija\Frontend\foodpin-app\src\assets\img\blank-profile.png


        }
    },
    methods: {
      
    },
    async created() {
        let usernameCookie = Vue.$cookies.get('username')
        let usernameParam = this.$route.params.username 
        usernameCookie === usernameParam ? this.editable = true : this.editable = false //validating if personl acc 
        await this.$store.dispatch("getUserByUsername", usernameParam)
        this.user = this.$store.getters["getUser"]
        await this.$store.dispatch("getBoardsForUser", this.user.userID)
        this.boards = this.$store.getters["getBoardsForUser"]
        this.isDataLoaded = true;
        
        if (this.user.image != null) { 
            this.imageUrl =  ImageConverter.fromByteArray(this.user.image.data)
        }

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