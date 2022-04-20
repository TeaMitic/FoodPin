<template>
    <div class="wrapper PrijavaRow col-lg-8 col-12  ">
        <div class="col-lg-8 col-10">
            <form class="form-signin" @submit.prevent>
                <h2 class="form-signin-heading text-white font-weight-bold">Sign in</h2>
                <hr class="divider" />
                <!-- <h2 class="form-signin-heading text-center">Sign in</h2> -->
                <input type="text" class="form-control "  name="username" placeholder="Username" autofocus="">           
                <input type="password" class="form-control"  name="sifra" placeholder="Password"/>                
                <a class="btn btn-primary btn-xl">Login</a>
                <!-- @click="login"  v-model="loginInfo.password" v-model="loginInfo.username" -->
            </form>
            <div class="row nemanalog">
                <p class="text-light mt-5">Don't have an account? <router-link :to="{name:'Register'}"><a class="nav-link" href="#!">Sign up</a></router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {

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