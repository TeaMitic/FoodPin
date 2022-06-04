<template>
    <div >
        <!-- Navigation-->
        <UserHeaderComponent @childToParentYes="onChildClickYes" />
        <!-- Main container -->
        <div class="container">
            <!-- User info -->
            <div class="user-info">
                <div class="cont-user-image">
                    <img class="user-image" :src= user.imageUrl alt="User profile image">
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
import ImageConverter from '../helper/imageConverter' 

export default({ 
    title: "FoodPin - Profile",
    components: { 
        UserHeaderComponent
    },
    data() { 
        return {
            isDataLoaded: false,
            user: null,
            boards: null,
            visiting: false

        }
    },
    methods: {
      
    },
    async created() {
        // let userID = Vue.$cookies.get('userID') //ne moze iz cookija ako gledam tudji profil 
        let userID = this.$route.params.username //ne moze iz cookija ako gledam tudji profil 
        await this.$store.dispatch("getUserByID", userID)
        this.user = this.$store.getters["getUserByID"]
        await this.$store.dispatch("getBoardsForUser", userID)
        this.boards = this.$store.getters["getBoardsForUser"]
        this.isDataLoaded = true;
        
        if (this.user.image != null) { 
            this.user.profileImageUrl = ImageConverter.getUrl(this.user.image.data)
        }
        else { 
            this.user.profileImageUrl = '../assets/img/blank-profile.png'
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





</style>