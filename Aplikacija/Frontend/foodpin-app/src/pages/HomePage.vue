<template>
    <div >
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div class="container px-4 px-lg-5">
                <button v-on:click="page = 'Home'" class="no-border  btn-margins btn no navbar-brand"
                    >FoodPin</button>
                <!-- <router-link  class="navbar-brand text-decoration-none" :to="{name: 'HomePage'}"> 
                    FoodPin
                </router-link> -->
                <button  class="btnMenu navbar-toggler " type="button"  data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class=" collapse navbar-collapse " id="navbarResponsive">
                    <ul class="navbar-nav ms-auto my-2 my-lg-0 align-items-end  ">
                        <li class="nav-item ">
                            <button v-on:click="page='Login'" class="no-border btn-margins btn nav-link "
                                >Login</button>
                            <!-- <router-link class="text-decoration-none nav-link" :to="{name: 'Login'}">
                                Login
                            </router-link> -->
                        </li>
                        <hr class="mx-0 my-1 menu-divider">
                        <li class="nav-item">
                            <button v-on:click="page='Register'" class="no-border btn-margins btn nav-link"
                                >Register</button>

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
            <div class="container px-4 px-lg-5 h-100 ">
                <div class="row gx-4 gx-lg-5 h-100 align-items-center  ">
                <!-- <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center"> -->
                    <div v-if="pageType == 'Home'" > 
                        <HomePageComponent @childToParentYes="onChildClickYes" />
                    </div>
                    <div v-else-if="pageType == 'Login'" class="d-flex justify-content-center"> 
                        <LoginComponent @childToParentYes="onChildClickYes" />
                    </div>
                    <div v-else-if="pageType == 'Register'" class="d-flex justify-content-center" > 
                        <RegisterComponent @childToParentYes="onChildClickYes" />
                    </div>
                   
                </div>
            </div>
        </header>

        <!-- Footer-->
        <footer class="bg-light py-5 row ">
            <div class="  container px-4 px-lg-5 ">
                <div class="small text-center text-muted">Copyright &copy; 2022 - FoodPin</div>
            </div>
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