<template>
    <div >
       <RegularHeaderComponent @childToParentYes="onChildClickYes" />
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
import RegularHeaderComponent from '../components/RegularHeaderComponent.vue'

export default({ 
    title: "FoodPin",
    components: { 
        HomePageComponent,
        LoginComponent,
        RegisterComponent,
        RegularHeaderComponent
    },
    data() { 
        return { 
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


</style>