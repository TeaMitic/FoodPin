<template>
    <div class="d-flex flex-column align-items-center" >
         <div class="col-lg-8 ">
         <!-- <div class="col-lg-8 align-self-end"> -->
            <h1 class="text-white font-weight-bold">FoodPin your favorite receipes</h1>
            <hr class="divider" />
        </div>
        <div class="col-lg-8 ">
        <!-- <div class="col-lg-8 align-self-baseline"> -->
            <p class="text-white-75 mb-5">This is where your cooking addiction begins!</p>
            <!-- Register treba da izmeni u data promenljivu -->
            <!-- <router-link :to="{name: 'Register'}" @click="pushData"> -->
                <button class="btn btn-primary btn-xl" @click="pushData">Register</button>
            <!-- </router-link> -->
        </div>
    </div>
</template>

<script>
export default {
    methods:{
      pushData(){
          this.$emit('childToParentYes', 'Register')
      }  
    }
}
</script>

<style>
.btn { 
    border-radius: 15px;
}



</style>