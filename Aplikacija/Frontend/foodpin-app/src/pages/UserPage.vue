<template>
  <div>
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
                                >Profile</button>
                            <!-- <router-link class="text-decoration-none nav-link" :to="{name: 'Login'}">
                                Login
                            </router-link> -->
                        </li>
                        <hr class="mx-0 my-1 menu-divider">
                        <li class="nav-item">
                            <button v-on:click="page='Register'" class="no-border btn-margins btn nav-link"
                                >Chat</button>

                            <!-- <router-link class="text-decoration-none nav-link" :to="{name: 'Register'}">
                                Register
                            </router-link> -->
                        </li> 
                        <li class="nav-item">
                            <button v-on:click="page='Register'" class="no-border btn-margins btn nav-link"
                                >Logout</button>

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
            <!-- <div class="container px-4 px-lg-5 h-100 ">
                <div class="row gx-4 gx-lg-5 h-100 align-items-center  ">                   
                </div>
            </div> -->
            <div class="container px-4 px-lg-5 mt-5">
                    <div class="row">
                        <div class="col-3 pin">
                            <PinCard />
                            <!-- v-for="store in allStores" 
                                            :key="store.id" 
                                            :store="store"/ -->

                        </div>
                         <div class="col-3 pin">
                            <PinCard />
                            <!-- v-for="store in allStores" 
                                            :key="store.id" 
                                            :store="store"/ -->

                        </div>
                        <div class="col-3 pin">
                            <PinCard />
                            <!-- v-for="store in allStores" 
                                            :key="store.id" 
                                            :store="store"/ -->

                        </div>
                        <div class="col-3 pin">
                            <PinCard />
                            <!-- v-for="store in allStores" 
                                            :key="store.id" 
                                            :store="store"/ -->

                        </div>
                          <div class="col-3 pin">
                            <PinCard />
                            <!-- v-for="store in allStores" 
                                            :key="store.id" 
                                            :store="store"/ -->

                        </div>
                          <div class="col-3 pin">
                            <PinCard />
                            <!-- v-for="store in allStores" 
                                            :key="store.id" 
                                            :store="store"/ -->

                        </div>
                          <div class="col-3 pin">
                            <PinCard />
                            <!-- v-for="store in allStores" 
                                            :key="store.id" 
                                            :store="store"/ -->

                        </div>
                          <div class="col-3 pin">
                            <PinCard />
                            <!-- v-for="store in allStores" 
                                            :key="store.id" 
                                            :store="store"/ -->

                        </div>
                          <div class="col-3 pin">
                            <PinCard />
                            <!-- v-for="store in allStores" 
                                            :key="store.id" 
                                            :store="store"/ -->

                        </div>
                          <div class="col-3 pin">
                            <PinCard />
                            <!-- v-for="store in allStores" 
                                            :key="store.id" 
                                            :store="store"/ -->

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
import PinCard from '@/components/PinCard.vue'
export default {
  components: {
    PinCard
  }
}
</script>

<style>
.pin{
    /* width: 100%; */
    height: 100%;
    margin-bottom: 2.5%;
}
</style>