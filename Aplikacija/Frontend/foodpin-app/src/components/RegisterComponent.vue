<template>
    <!-- <h1>Not done</h1> -->
     <div class="wrapper PrijavaRow col-lg-8 col-12 mx-5">
        <div class="col-lg-8 col-10">
            <form class="form-signin" @submit.prevent>
                <h2 class="form-signin-heading text-white font-weight-bold">Sign up</h2>
                <hr class="divider" />
                <!-- <h2 class="form-signin-heading text-center">Sign in</h2> -->
                <input type="text" class="form-control "  name="name" placeholder="Name" autofocus="" required
                  v-model.trim="registerInfo.name"> 
                <input type="text" class="form-control "  name="surname" placeholder="Surname" autofocus="" 
                  v-model.trim="registerInfo.surname"> 
                <input type="text" class="form-control "  name="username" placeholder="Username" autofocus=""
                  v-model="registerInfo.username" required>           
                <input type="password" class="form-control"  name="password" placeholder="Password" required 
                  v-model="registerInfo.password"/>   
                <input type="password" class="form-control"  name="repeatedPassword" placeholder="Confirm password" required
                  v-model="registerInfo.repeatedPassword"/>     

                <button @click="register" type="submit" class="btn btn-primary btn-xl">Register</button>
            </form>
            <div class="row nemanalog">
              <!-- ne treba router link vec komunikacija sa komponentama -->
                <p class="text-light mt-5">Already have an account? <a class="nav-link" href="#" @click="pushData">Sign in</a></p>
            </div>
        </div>
  </div>
</template>

<script>
import Vue  from 'vue'
export default {
  data() {
    return {
      registerInfo: { 
        name: '',
        surname: '',
        username: '',
        password: '',
        repeatedPassword: ''
      }
    }
  },
  mounted() {
    let nameInput = document.querySelector('input')
    nameInput.focus()
  },
  methods:{
    pushData(){
      this.$emit('childToParentYes', 'Login')
    },
    validateInputs() { 
      let inputs = document.querySelectorAll('input')
      let valid = false
      for (let element of inputs) { 
        let responseMessage = this.$helpers.validateInput(element)
        if (responseMessage != 'OK') {
          valid = false
          break
        }
        valid = true
      }
      return valid
    },
    validatePasswords() { 
      let responseMessage = this.$helpers.validatePassword(this.registerInfo.password,this.registerInfo.repeatedPassword)
      if (responseMessage != 'OK') {
        Vue.toasted.show(responseMessage, { 
          theme: "bubble",
          position: "bottom-center",
          duration: 3000
        })
        return false
      }
      return true
    },
    async register() { 
      if (!this.validateInputs()) {
        return
      }
      if (!this.validatePasswords()) { 
        return 
      }
      await this.$store.dispatch('register', JSON.stringify(this.registerInfo))
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