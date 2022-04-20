<template>
    <div>
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div class="container px-4 px-lg-5">
                <button v-on:click="page = 'Home'" class="btn  navbar-brand">FoodPin</button>
                <!-- <router-link  class="navbar-brand text-decoration-none" :to="{name: 'HomePage'}"> 
                    FoodPin
                </router-link> -->
                <button  class=" navbar-toggler " type="button"  data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class=" collapse navbar-collapse  " id="navbarResponsive">
                    <ul class="navbar-nav ms-auto my-2 my-lg-0">
                        <li class="nav-item ">
                            <button v-on:click="page='Login'" class="btn nav-link ">Login</button>
                            <!-- <router-link class="text-decoration-none nav-link" :to="{name: 'Login'}">
                                Login
                            </router-link> -->
                        </li>
                        <li class="nav-item">
                            <button v-on:click="page='Register'" class="btn nav-link">Register</button>

                            <!-- <router-link class="text-decoration-none nav-link" :to="{name: 'Register'}">
                                Register
                            </router-link> -->
                        </li> 
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Masthead-->
        <header class="masthead">
            <div class="container px-4 px-lg-5 h-100">
                <div class="row gx-4 gx-lg-5 h-100 align-items-center  ">
                <!-- <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center"> -->
                    <div v-if="pageType == 'Home'" > 
                        <HomePageComponent
                            @childToParentYes="onChildClickYes"
                        />
                    </div>
                    <div v-else-if="pageType == 'Login'" > 
                        <LoginComponent/>
                    </div>
                    <div v-else-if="pageType == 'Register'" > 
                        <RegisterComponent />
                    </div>
                   
                </div>
            </div>
        </header>

        <!-- Footer-->
        <footer class="bg-light py-5">
            <div class="container px-4 px-lg-5"><div class="small text-center text-muted">Copyright &copy; 2022 - FoodPin</div></div>
        </footer>
    </div>

</template>

<script>
import HomePageComponent from '../components/HomePageComponent.vue'
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'

export default({ 
    title: "FoodPin",
    components: { 
        HomePageComponent,
        LoginComponent,
        RegisterComponent
    },
    data() { 
        return { 
            isCollapsed: true,
            page: 'Home'
        }
    },
    computed: { 
        pageType() { 
            return this.page
        }
    },
    methods: {
       onChildClickYes(value){
           this.page = value
       }
    },
})

</script>

<style >
#app{
    margin-top: 0%;
}
.nav-link { 
    font-size: 1.2rem !important
}


</style>