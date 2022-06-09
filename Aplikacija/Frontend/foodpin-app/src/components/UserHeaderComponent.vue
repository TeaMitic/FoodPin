<template>
    <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div class="container px-4 px-lg-5">
                <button v-on:click="home" class="no-border  btn-margins btn no navbar-brand"
                    >FoodPin</button>
                <button  class="btnMenu navbar-toggler " type="button"  data-bs-toggle="collapse"
                        data-bs-target="#navbarResponsive" aria-controls="navbarResponsive"   
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                    </span>
                </button>
                <div class=" collapse navbar-collapse " id="navbarResponsive">
                    <ul class="navbar-nav ms-auto my-2 my-lg-0 align-items-end  ">
                        <li class="nav-item ">
                            <button v-on:click="pushData('Notifications')" class="no-border btn-margins btn nav-link "
                                >Notifications</button>
                        </li>
                        <router-link :to="{ name: 'chatpage', params: {username:  this.username} } " class="link">
                            <li class="nav-item">
                                <button class="no-border btn-margins btn nav-link">Chat</button>
                            </li>
                        </router-link>
                        <router-link :to="{ name: 'profilepage', params: {username:  this.username} } " class="link">
                            <li class="nav-item">
                                <button class="no-border btn-margins btn nav-link">Profile</button>
                            </li>
                        </router-link>
                        <hr class="mx-0 my-1 menu-divider">
                        <router-link :to="{ name: 'homepage' } " class="link">
                            <li class="nav-item">
                                <button @click="logout" class="no-border btn-margins btn nav-link">Logout</button>
                            </li>
                        </router-link>
                    </ul>
                </div>
            </div>
        </nav>
</template>
<script>
import Vue from 'vue'

export default({ 
    components: { 
        
    },
    data() { 
        return { 
            page: 'Home',
            username: null,
        }
    },
    methods: {     
        pushData(value){
            this.$emit('childToParentYes', value)
        },
        logout(){
            console.log("usao u logout");
            this.$store.dispatch('logout')
        },
        home() { 
            if (this.$route.path != '/userpage') { 
                this.$router.push('/userpage')
            }
        }
    },
    created() {
        this.username = Vue.$cookies.get('username')  
    },
   
})

</script>
<style scoped>
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

.link{
    text-decoration: none;
}
/* #mainNav { 
    background-color: rgb(41, 155, 98);
} */
</style>