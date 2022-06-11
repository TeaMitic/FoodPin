<template>
    <div class="mainDiv" >
        <!-- Navigation-->
        <UserHeader  />
        <!-- Main container -->
        <div class="container my-3 py-5 d-flex justify-content-center">
            <!-- User info -->
            <div v-if="!this.isDataLoaded">
                <AppSpinner />
            </div>
            <div v-else class="col-6 p-4 user-info-cont ">
                <div class="user-info">
                    <div class="contt-user-image d-flex justify-content-center my-3 p-3">
                        <div class="d-flex">
                            <input type="file" class="p-0 input-file" id="image-input" @change="onFileSelected($event)">
                            <div class="edit-icon-cont ">
                                <div class="cursor-pointer p-2 rounded-circle d-flex align-items-center justify-content-center">
                                    <font-awesome-icon class=" mx-2 mb-1 edit-icon" :icon="['fa','edit']"  @click="triggerFileInput"/>
                                </div>
                            </div>
                            <img v-if="!this.hasImage" class="user-image" src= "../assets/img/blank_profile.png" alt="User profile image">
                            <img v-else class="user-image" :src= this.imageUrl alt="User profile image">
                        </div>
                        <div class="save-img-cont d-flex flex-column justify-content-end" v-if="btnUploadEnabled">
                            <button class="btn-img-save" @click="saveImage">Upload</button>
                        </div>
                    </div>
                    <div class="user-info-rest d-flex align-items-stretch">
                        <div class="cont-user-username">
                            <label>Username:</label>
                            <input class="user-username " :placeholder="user.username" disabled >
                        </div>
                        <div class="cont-user-fullname">
                            <div class="cont-user-name">
                                <label for="name">Name:</label>
                                <input type="text" name="name" class="user-name inputFields " :placeholder="user.name" v-model="user.name">
                            </div>
                            <div class="cont-user-surname">
                                <label for="surname">Surname:</label>
                                <input type="text" name="surname" class="user-surname inputFields " :placeholder="user.surname" v-model="user.surname">
                            </div>
                        </div>
                        <div class="cont-user-website">
                            <label for="website">Website:</label>
                            <input type="text" name="website" class="user-website " :placeholder="user.website" v-model="user.website">
                            <!-- <a class="user-website" v-bind:href="user.website" target="_blank" rel="noopener"><b>{{user.website | trim-web}}</b></a> -->
                        </div>
                        <div class="cont-user-about">
                            <label for="about">About you:</label>
                            <textarea name="about"  rows="3" class="user-about " :placeholder="user.about" v-model="user.about"></textarea>
                        </div>
                    </div>
                    <div class="save-cont p-3">
                        <button class="btn-save " @click="saveEdit">Save</button>
                    </div>
                </div>
            </div>
            
        </div>

        <!-- Footer-->
        <footer class="bg-light py-5 row ">
            <div class="  container px-4 px-lg-5 ">
                <div class="small text-center text-muted">Copyright &copy; 2022 - FoodPin</div>
            </div>
        </footer>
    </div>

</template>

<script>
import Vue from 'vue'
import UserHeader from '../components/UserHeaderComponent.vue'
import AppSpinner from '../components/AppSpinnerComponent.vue'
import ImageConverter from '../helper/imageConverter' 


export default({ 
    title: "FoodPin - Settings",
    components: { 
        UserHeader,
        AppSpinner,

    },
    data() { 
        return {
            isDataLoaded: false,
            user: null,
            editable: false,
            imageUrl:  null, 
            imageUrlOrg: null,
            hasImage: false,
            imageFile: null,
            btnUploadEnabled: false



        }
    },
 
    async created() {
        let userID = Vue.$cookies.get('userID')

        await this.$store.dispatch("getUserByID",userID)
        this.user = this.$store.getters["getUser"]
        this.isDataLoaded = true;
        if (this.user.hasImage) { 
            this.imageUrlOrg =  ImageConverter.fromByteArray(this.user.image.data)
            this.imageUrl = this.imageUrlOrg
            this.hasImage = true
        }
    },
    methods: {
        
        onFileSelected(event) { 
            this.imageFile = event.target.files[0];
            if (!this.checkImageSize(this.imageFile)) { 
                return
            }
            var reader = new FileReader();

            reader.onload = (event)  => {
                this.imageUrl = event.target.result;
                this.btnUploadEnabled = true
            };
            reader.readAsDataURL(this.imageFile);

        },
        checkImageSize(image) {
            let size = image.size
            var i = parseInt(Math.floor(Math.log(size) / Math.log(1024)));
            let sizeInMB = size / Math.pow(1024, i)
            if (sizeInMB > 3) { 
                Vue.toasted.show("Image size to large. Maximum size iz 3 MB.", { 
                    theme: "bubble",
                    position: "top-center",
                    duration: 2500
                })
                this.imageUrl = this.imageUrlOrg

                this.btnUploadEnabled = false

                return false
            } 
            return true
        },
        triggerFileInput() { 
            let fileInput = document.getElementById('image-input')
            fileInput.click()
        },
        validateInputs() { 
            let inputs = document.querySelectorAll('.inputFields')
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
        async saveEdit() { 
            if (!this.validateInputs()) {
                Vue.toasted.show("Cannot edit profile. Some fields are not valid.", { 
                    theme: "bubble",
                    position: "top-center",
                    duration: 2500
                })
                return
            }
            await this.$store.dispatch('updateProfile',this.user)
        },
        async saveImage() { 
            let form = new FormData()
            form.append('image',this.imageFile)
            let imgInfo = { 
                username: this.user.username,
                image: form
            }
            await this.$store.dispatch('uploadUserImage',imgInfo)
            Vue.toasted.show('Image uploaded.',{
                theme: "bubble",
                position: "bottom-center",
                duration: 2000,
            })
        }

    },
  
   
})

</script>

<style scoped>

#app{
    margin-top: 0%;
    overflow-x: hidden;

}
.mainDiv { 
    background-color: rgb(216, 216, 216);
    /* position: absolute;
    padding:0;
    margin:0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -999; */   
    
}
.cont-user-image { 
    display: flex !important;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    align-items: flex-end;
}
.input-file { 
    display: none;
}
.user-image { 
    border-radius: 50%;
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-top: 1rem;
}

.edit-icon-cont { 
    display: flex;
    flex-direction: column;
}
.edit-icon { 
    height: 30px !important;
    width: 30px !important;
    position: relative;
    left: 8%;
}
.edit-button { 
    background-color: gray;
}
.user-info-cont { 
    background-color: white;
    border-radius: 20px;
}
.user-info-rest { 
    display: flex;
    flex-direction: column;
    
}
[class^="cont-user"] { 
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 2% 0;
}
.cont-user-fullname { 
    /* display: flex; */
    flex-direction: column;
    align-items: stretch;
}
.user-about { 
    width: -webkit-fill-available;
}



</style>