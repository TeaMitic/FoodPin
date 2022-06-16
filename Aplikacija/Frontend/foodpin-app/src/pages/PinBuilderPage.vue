<template >
    
    <div >
        <UserHeader />
        <div v-if="!isDataLoaded">
            <AppSpinner />
        </div>
        <div v-else class="builder-main card row m-5 " >
            <div class="board-options col-6 d-flex px-5 py-2 ">
                <!-- choose board  -->
                <select class="board-options-select" v-model="selected_board">
                    <option v-for="board in boards" :key="board.boardID" :value="board.name">{{board.name}}</option>
                </select>
            </div>
            <div class="content d-flex justify-content-between align-center col-6 px-3 py-2">
                <!-- add content -->
                <div class="col-6 p-3 d-flex justify-content-center flex-column">
                    <div class="pin-image-cont row flex-column ">
                        <div v-if="isFileLoaded" class="d-flex justify-content-center image-cont"> 
                            <img :src="imageUrl" class="pin-image">
                        </div>
                        <label v-if="!isFileLoaded"  for="image-file" class="p-0 label-upload " @click="triggerFileInput" >Click to upload
                            <input type="file" name="image-file" @change="onFileSelected($event)"  class="p-0 input-file" id="image-input">
                        </label>
                    </div>
                    <div class="pin-image-remove my-3 row justify-content-center">
                        <button v-if="isFileLoaded" class="btn-remove rounded-circle d-flex align-items-center justify-content-center " v-on:click="removeImage">
                            <font-awesome-icon :icon="['fa','trash']" class="icon-remove"/>
                        </button>                        
                    </div>
                </div>
                <div class="pin-info-cont p-3">
                    <div class="pin-info-title py-1">
                        <input type="text" name="pin-name" v-model.trim="pin.title" class="pin-title" placeholder="Add yout title" >
                    </div>
                    <div class="pin-info-ingredients py-1">
                        <input type="text" name="pin-ingredients" v-model.trim="pin.ingredients" class="pin-ingredients" placeholder="Eggs, butter... " >
                    </div>
                    <div class="pin-info-tags py-1">
                        <input type="text" name="pin-tags" v-model.trim="tags" class="pin-tags" placeholder="Sweet, yummy, brekfast... " >
                    </div>
                    <div class="pin-info-description py-1">
                        <textarea type="text" name="pin-description"  rows="5" v-model.trim="pin.description" class="pin-description" placeholder="Describe this meal" />
                    </div>
                    <div class="pin-info-instruction py-1">
                        <textarea type="text" name="pin-instruction" rows="5" v-model.trim="pin.instruction" class="pin-instruction" placeholder="How to prepare this meal" />
                    </div>
                </div>
            </div>
            <div class=" col-6 p-3">
                <button class="btn-create btn btn-large bg-secondary text-white" v-on:click="createPin">Create</button>
            </div>
        </div>
    </div>
</template>
<script>
import AppSpinner from '../components/AppSpinnerComponent.vue'
import UserHeader from '../components/UserHeaderComponent.vue'
import Vue from 'vue'

export default {
    components: {
        AppSpinner,
        UserHeader
    },
    data() {
        return {
            isDataLoaded: false,
            isFileLoaded: false,
            userID: null,
            boards: null,
            imgageUrl: null,
            imageFile: null,
            pin: { 
                title: null,
                description: null,
                instruction: null,
                ingredients: null,
            },
            tags: null,
            selected_board: 'All pins'

        }
    },
 
    
    async created() {
        this.userID = Vue.$cookies.get('userID')
        await this.$store.dispatch("getBoardsForUserNoImages", this.userID)
        this.boards = this.$store.getters["getBoardsForUserNoImages"]
        let boardsSimple = []
        this.boards.forEach(board => {
            boardsSimple.push( { 
                name: board.name,
                boardID: board.boardID
            })
        });
        this.isDataLoaded = true
    },
    methods: {
        onFileSelected(event) { 
            this.imageFile = event.target.files[0];
            // if (!this.checkImageSize(this.imageFile)) { 
            //     return
            // }
            var reader = new FileReader();

            reader.onload = (event)  => {
                this.imageUrl = event.target.result;
                this.isFileLoaded = true    
            };
            reader.readAsDataURL(this.imageFile);

        },
        checkImageSize(image) {
            let size = image.size
            var i = parseInt(Math.floor(Math.log(size) / Math.log(1024)));
            let sizeInMB = size / Math.pow(1024, i)
            console.log(sizeInMB,i)
            if (sizeInMB > 3) { 
                Vue.toasted.show("Image size to large. Maximum size iz 3 MB.", { 
                    theme: "bubble",
                    position: "top-center",
                    duration: 2500
                })
                this.removeImage()
                return false
            } 
            return true


        },
        removeImage() { 
            this.imageUrl = null
            this.imageFile = null
            this.isFileLoaded = false

        },
        async createPin() { 

            //aggregating data for createPin api
            let pinInfo = { 
                userID: this.userID,
                boardName: this.selected_board,
                pin: { 
                    creatorID: this.userID,
                    title: this.pin.title,
                    description: this.pin.description,
                    instruction: this.pin.instruction,
                    ingredients: this.pin.ingredients

                },
                tags: this.convertToTagJson(this.tags)
            }
            //calling api  
            this.isDataLoaded = false
            await this.$store.dispatch('createPin',pinInfo)
            let pin = this.$store.getters['getPin']
            //aggregating data for uploadImage api
            let form = new FormData()
            form.append('image',this.imageFile)
            let imgInfo = { 
                image: form,
                pinID: pin.pinID
            }
            await this.$store.dispatch('uploadPinImage',imgInfo)
            this.isDataLoaded = true
            this.$router.go(-1)
            // this.$router.push(`/profile/${Vue.$cookies.get('username')}`)
            Vue.toasted.show('Pin created.',{
                 theme: "bubble",
                position: "bottom-center",
                duration: 2000,
            })
            

        },
        triggerFileInput() { 
            let fileInput = document.getElementById('image-input')
            fileInput.click()
        },
        convertToTagJson(tagsString) { 
            let tagsArray = tagsString.split(/[, ]+/)
            let tagsJson = []
            tagsArray.forEach(tag => { 
                tagsJson.push({name: tag})
            })
            return tagsJson
        }

    },  
}
</script>
<style scoped>
/* div { 
    border: 1px solid black;
} */
body { 
    background-color: aquamarine;
}
.builder-main { 
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.board-options { 
    justify-content: flex-end;
}
.pin-image-cont { 
    width: 100%;
    background-color: rgb(216, 216, 216);
    align-content: center;
}

.pin-image {
    height: auto;
    width: inherit;
}
.btn-remove { 
    border: none;
    background-color: transparent;
    height: 55px !important;
    width: 55px !important;

}
.btn-remove:hover { 
    background-color: rgb(189, 189, 189);

}
.icon-remove { 
    height: 30px !important;
    width: 30px !important;
}
.label-upload { 
    cursor: pointer;
}
.input-file { 
    display: none;
}
.btn-create:hover { 
    background-color: rgb(192, 192, 192) !important;
}
textarea { 
    width: 100%;
}
</style>