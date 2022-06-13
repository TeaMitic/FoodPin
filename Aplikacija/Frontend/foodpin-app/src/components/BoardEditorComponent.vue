<template >
    <div class="row board-editor  justify-content-center align-items-center" v-on:click="hideComponent">
        <div v-if="!this.isDataLoaded">
            <AppSpinner />
        </div>
        <div v-else class="content my-5 col-6 " >
            <h1>Edit board</h1>
            <div class="cont-name d-flex flex-wrap my-1 py-2">
                <label for="name" class="label-name" >Name</label>
                <input type="text" class="input-name" v-model.trim="name" name="name" placeholder="Pizza, Sweets, Icecreams..." required>
            </div>
            <div class="cont-public d-flex my py-2 align-items-center" v-on:click="isPublic = !isPublic">
                <div class="cursor-pointer p-2 rounded-circle d-flex align-items-center justify-content-center">
                    <font-awesome-icon class=" mx-2 mb-1 icon-color fa-2x" :icon="['fa','lock-open']" v-if="isPublic"/>
                    <font-awesome-icon class=" mx-2 mb-1 icon-color fa-2x" :icon="['fa','lock']" v-else/>
                </div>
                <input type="checkbox" class="checkbox-public" v-model="isPublic" >
                <p v-if="isPublic" class="m-0 text">Make my board <b>private</b>.</p>
                <p v-else class="m-0 text">Make my board <b>public</b>.</p>
            </div>
            <div class="buttons-cont">
                <div class="cont-btn-delete">
                    <button class="btn-delete btn btn-lg btn-outline-danger" v-on:click="deleteBoard">Delete</button>
                </div>
                <div class="cont-btn-save">
                    <button class="btn-create btn btn-lg btn-primary text-white" v-on:click="saveBoard">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    props: { 
        board: Object
    },
    data() {
        return {
            isPublic: false,
            name: null,
            isDataLoaded: true
        }
    },
    created() {
        this.isPublic = this.board.public
        this.name = this.board.name
    },
    methods: {
        async saveBoard() { 
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
            let boardInfo = { 
                boardName: this.name,
                public: this.isPublic,
                userID: Vue.$cookies.get('userID')
            }
            // this.isDataLoaded = false
            await this.$store.dispatch('editBoard',boardInfo)
            // this.isDataLoaded = true
            this.$emit('toggleBoardEditor')
        },
        deleteBoard() { 
            let htmlMessage = 
                `<p>Are you sure you want to delete this board?
                <br>
                Pins are connected to 'All pins' board and will not be deleted.`
            let ans = confirm(htmlMessage)
            if (ans) { 
                let boardInfo = { 
                    toastMessage: "Board deleted.",
                    boardID: this.board.boardID
                }
                this.$store.dispatch('deleteBoard',boardInfo)
                this.$emit('toggleBoardEditor')
            }
        },
        hideComponent(event) { 
            let contentDiv = document.querySelector('.content')
            if(!contentDiv.contains(event.target)) {
                this.$emit('toggleBoardEditor')
            }
        }
    },
}
</script>
<style scoped>
.board-editor { 
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    padding:0;
    margin:0;
    z-index: 1000;
    top:0;
    left:0;

    width: 100%;
    height: 100%;

    overflow: hidden;
}

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

.content { 
    background-color: rgb(248, 245, 245);
    border-radius: 10px;
    height: 50%;
}
</style>