<template >
    <div class="row board-builder  justify-content-center">
        <div v-if="!this.isDataLoaded">
            <!-- <AppSpinner /> -->
        </div>
        <div v-else class="content col-6 ">
            <h1>Create board</h1>
            <div class="cont-name d-flex flex-wrap my-4 py-2">
                <label for="name" class="label-name" >Name</label>
                <input type="text" class="input-name form-control" v-model.trim="name" name="name" placeholder="Pizza, Sweets, Icecreams..." required>
            </div>
            <div class="cont-public d-flex my-4 py-2 align-items-center" v-on:click="isPublic = !isPublic">
                <input type="checkbox" class="checkbox-public" v-model="isPublic" >
                <p class="m-0 text">Make my board <b>public</b>.</p>
            </div>
            <div class="cont-btn-create">
                <button class="btn-create" v-on:click="createBoard">Create</button>
            </div>
        </div>
    </div>
</template>
<script>
// import AppSpinner from './AppSpinerComponent.vue'
import Vue from 'vue'
export default {
    components: {
        // AppSpinner
    },
    data() {
        return {
            name: null,
            isPublic: false,
            isDataLoaded: true
        }
    },
    methods: {
        async createBoard() { 
            let input = document.querySelector('.input-name')
            let responseMessage = this.$helpers.validateInput(input)
            if (responseMessage != 'OK') { 
                Vue.toasted.show("Name field cannot be emtpy.",{ 
                    theme: "bubble",
                    position: "bottom-center",
                    duration: 3000,
                    allowHtml: true
                })
                return
            }
            let board = { 
                boardName: this.name,
                public: this.isPublic,
                userID: Vue.$cookies.get('userID')
            }
            // this.isDataLoaded = false
            await this.$store.dispatch('createBoard',board)
            // this.isDataLoaded = true
        }
    },
}
</script>
<style scoped>

.input-name { 
    width: 100%;
}
.checkbox-public { 
    height: 20px;
    width: 20px;
    margin-right: 1rem;
}
.cont-public:hover, .checkbox-public:hover { 
    cursor: pointer;
}
.text { 
    font-size:x-large;
}
.btn-create { 

}
</style>