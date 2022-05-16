<template>
    <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div class="container px-4 px-lg-5">
                <button v-on:click="pushData('Home')" class="no-border  btn-margins btn no navbar-brand"
                    >FoodPin</button>
                <button  class="btnMenu navbar-toggler " type="button"  data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class=" collapse navbar-collapse " id="navbarResponsive">
                    <ul class="navbar-nav ms-auto my-2 my-lg-0 align-items-end  ">
                        <li class="nav-item ">
                            <button v-on:click="pushData('Notifications')" class="no-border btn-margins btn nav-link "
                                >Notifications</button>
                        </li>
                        <li class="nav-item ">
                            <button v-on:click="pushData('Chat')" class="no-border btn-margins btn nav-link "
                                >Chat</button>
                        </li>
                        <li class="nav-item ">
                            <button v-on:click="pushData('Profile')" class="no-border btn-margins btn nav-link "
                                >Profile</button>
                        </li>
                        <hr class="mx-0 my-1 menu-divider">
                        <li class="nav-item">
                            <button v-on:click="pushData('Logout')" class="no-border btn-margins btn nav-link"
                                >Logout</button>
                        </li> 
                    </ul>
                </div>
            </div>
        </nav>
</template>
<script>

export default({ 
    title: "FoodPin",
    components: { 
        
    },
    data() { 
        return { 
            page: 'Home'
        }
    },
    methods: {
   
        pushData(value){
            this.$emit('childToParentYes', value)
        },

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
</style>