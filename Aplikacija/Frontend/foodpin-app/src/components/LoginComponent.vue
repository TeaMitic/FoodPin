<template>
    <div class="wrapper PrijavaRow col-lg-8 col-12  ">
        <div class="col-lg-8 col-10">
            <form class="form-signin" @submit.prevent>
                <h2 class="form-signin-heading text-white font-weight-bold">Sign in</h2>
                <hr class="divider" />
                <!-- <h2 class="form-signin-heading text-center">Sign in</h2> -->
                <input type="text" class="form-control "  name="username" placeholder="Username" autofocus=""
                    v-model.trim="loginInfo.username" v-model="loginInfo.username" required>           
                <input type="password" class="form-control"  name="sifra" placeholder="Password" 
                    v-model.trim="loginInfo.password" v-model="loginInfo.password" required>
                <button v-on:click="login" type="submit" class="btn btn-primary btn-xl">Login</button>
            </form>
            <div class="row nemanalog">
                <!-- ne treba router link vec komunikacija sa komponentama -->
                <p class="text-light mt-5">Don't have an account? <a class="nav-link" href="#" @click="pushData">Sign up</a></p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            loginInfo: { 
                username: '',
                password: ''
            },
        }
    },
    methods:{
        validateIntputs() { 
            let inputs = document.querySelectorAll('input')
            let valid = false
            for (let element of inputs) { 
                let responseMessage = this.$helpers.validateIntput(element)
                if (responseMessage != 'OK') {
                    valid = false
                    break
                }
                valid = true
            }
            return valid 
        },
        pushData(){
            this.$emit('childToParentYes', 'Register')
        },
        async login() { 
            if (!this.validateIntputs()) { 
                return
            }
            await this.$store.dispatch('login', { 
                loginInfo: this.loginInfo
            })
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