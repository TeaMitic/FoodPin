<template>
  <div>
    <!-- <h1>Not done</h1> -->
     <div class="wrapper PrijavaRow col-lg-8  ">
        <div class="col-lg-8">
            <form class="form-signin" @submit.prevent>
                <h2 class="form-signin-heading text-white font-weight-bold">Sign up</h2>
                <hr class="divider" />
                <!-- <h2 class="form-signin-heading text-center">Sign in</h2> -->
                <input type="text" class="form-control "  name="name" placeholder="Name" autofocus=""> 
                <input type="text" class="form-control "  name="surname" placeholder="Surname" autofocus=""> 
                <input type="text" class="form-control "  name="username" placeholder="Username" autofocus="">           
                <input type="password" class="form-control"  name="sifra" placeholder="Password"/>   
                <input type="password" class="form-control"  name="sifra" placeholder="Confirm password"/>  

                <a class="btn btn-primary btn-xl">Register</a>
                <!-- @click="login"  v-model="loginInfo.password" v-model="loginInfo.username" -->
            </form>
            <div class="row nemanalog">
              <!-- ne treba router link vec komunikacija sa komponentama -->
                <p class="text-light mt-5">Already have an account? <a class="nav-link" href="#!" @click="pushData">Sign in</a></p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    pushData(){
      this.$emit('childToParentYes', 'Login')
    }
  }
}
</script>

<style>
.PrijavaRow{
  display: flex;
  justify-content: center;
  padding-top:1.5rem;
  border-radius: 15px;
  /* opacity: 0.7; */
  background: rgba(255, 255, 255, 0.5);
}

.form-control{
    margin-top:1.2rem;
    margin-bottom: 1.2rem;
}

.dugme, .nemanalog{
    margin: top 0.8rem;
    margin-bottom: 0.8rem;
}
</style>