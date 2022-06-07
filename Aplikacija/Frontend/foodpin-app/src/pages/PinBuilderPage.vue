<template >
    
    <div>
        <div v-if="!isDataLoaded">
            <AppSpinner />
        </div>
        <div class="builder-main card d-flex" >
            <div class="board-options">
                <!-- choose board  -->
                <select class="board-options-select" v-model="selected_board">
                    <option v-for="board in boards" :key="board.boardID" :value="board.name">{{board.name}}</option>
                </select>
            </div>
            <div class="content d-flex justify-content-center align-center">
                <!-- add content -->
                <div class="pin-image-cont">
                    <div class="pin-image row flex-direction-column ">
                        <div v-if="isFileLoaded"> 
                            <img :src="imageUrl" >
                        </div>
                        <label for="image-file" class="p-0" >Click to upload</label>
                        <input type="file" name="image-file" @change="onFileSelected($event)"  class="p-0">
                    </div>
                    <div class="pin-image-remove">
                        <button v-if="isFileLoaded" class="btn-remove" v-on:click="removeImage">Remove</button>                        
                    </div>
                </div>
                <div class="pin-info-cont">
                    <div class="pin-info-title">
                        <input type="text" name="pin-name" v-model="pin.title" class="pin-title" placeholder="Add yout title" >
                    </div>
                    <div class="pin-info-description">
                        <input type="text" name="pin-description" v-model="pin.description" class="pin-description" placeholder="Describe this meal" >
                    </div>
                    <div class="pin-info-instruction">
                        <input type="text" name="pin-instruction" v-model="pin.instruction" class="pin-instruction" placeholder="How to prepare this meal" >
                    </div>
                    <div class="pin-info-ingredients">
                        <input type="text" name="pin-ingredients" v-model="pin.ingredients" class="pin-ingredients" placeholder="Eggs, butter... " >
                    </div>
                    <div class="pin-info-tags">
                        <input type="text" name="pin-tags" v-model="tags" class="pin-tags" placeholder="Sweet, yummy, brekfast... " >
                    </div>
                </div>
            </div>
            <div class="btn-create">
                <button class="btn-create" v-on:click="createPin">Create</button>
            </div>
        </div>
    </div>
</template>
<script>
import AppSpinner from '../components/AppSpinerComponent.vue'
import Vue from 'vue'

export default {
    components: {
        AppSpinner
    },
    data() {
        return {
            isDataLoaded: false,
            isFileLoaded: false,
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
        let userID = Vue.$cookies.get('userID')
        await this.$store.dispatch("getBoardsForUser", userID)
        this.boards = this.$store.getters["getBoardsForUser"]
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
            var reader = new FileReader();

            reader.onload = (event)  => {
                this.imageUrl = event.target.result;
                this.isFileLoaded = true    
            };
            reader.readAsDataURL(this.imageFile);

        },
        removeImage() { 
            this.imageUrl = null
            this.imageFile = null
            this.isFileLoaded = false
            let fileInput = document.querySelector('input[type=file]')
            fileInput.value = ''
        },
        async createPin() { 
            console.log("NOT IMPLEMENTED");
        }
    },  
}
</script>
<style scoped>

</style>