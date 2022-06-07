<template >
    <div class="row board-builder  justify-content-center" v-on:click="hideComponent">
        <div v-if="!this.isDataLoaded">
            <AppSpinner />
        </div>
        <div v-else class="content my-5 col-6 " >
            <h1>Create board</h1>
            <div class="cont-name d-flex flex-wrap my-1 py-2">
                <label for="name" class="label-name" >Name</label>
                <input type="text" class="input-name" v-model.trim="name" name="name" placeholder="Pizza, Sweets, Icecreams..." required>
            </div>
            <div class="cont-public d-flex my py-2 align-items-center" v-on:click="isPublic = !isPublic">
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
            this.$emit('toggleBoardBuilder')
        },
        hideComponent(event) { 
            let contentDiv = document.querySelector('.content')
            if(!contentDiv.contains(event.target)) {
                this.$emit('toggleBoardBuilder')
            }
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
.content { 
    background-color: rgb(248, 245, 245);
    border-radius: 10px;
    height: 50%;
}
.board-builder { 
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>