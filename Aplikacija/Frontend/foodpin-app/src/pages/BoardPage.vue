<template >
    <div>
        <BoardEditor v-if="showBoardEditor" @toggleBoardEditor="toggleBoardEditor"/>
        <UserHeader />
        <div class="board-contianer">
            <div v-if="!isDataLoaded">
                <AppSpinner />
            </div>
            <div v-else class="board-header row p-3 my-5 justify-content-center mt-5 ">
                <div class="edit-icon-cont col-2">
                    <div class="cursor-pointer p-2 rounded-circle d-flex align-items-center justify-content-center">
                        <font-awesome-icon class=" mx-2 mb-1 icon-color fa-2x" :icon="['fa','edit']"  @click="toggleBoardEditor"/>
                    </div>
                </div>
                <div class="board-name-cont col-2">
                    <h2>{{board.name}}</h2>
                </div>
                <div class="lock-icon-cont col-2">
                    <div class="cursor-pointer p-2 rounded-circle  align-items-center justify-content-center">
                        <font-awesome-icon class=" mx-2 mb-1 icon-color fa-2x" :icon="['fa','lock-open']"   @click="toggleBoardEditor" v-if="isPublic"/>
                        <font-awesome-icon class=" mx-2 mb-1 icon-color fa-2x" :icon="['fa','lock']"   @click="toggleBoardEditor" v-else/>
                    </div>
                </div>
            </div>
            <div class="board-pins row">
                <div class="pins-header row justify-content-end">
                    <h4 class="pins-num ">{{pinsNum}}</h4>
                    <router-link :to="{name: 'pin-builder'}" class="link add-btn rounded-circle " >
                        <font-awesome-icon class="icon-color fa-2x" :icon="['fa','plus']"/>
                    </router-link>
                </div>
                <div class="pins-body row ">
                   <PinCard v-for="pin in pins" :key="pin.pinID" :pin ="pin" :boards="allBoardsNames" /> 
                </div>
            </div>
        </div>  
    </div>
</template>
<script>
import UserHeader from '../components/UserHeaderComponent.vue'
import AppSpinner from '../components/AppSpinnerComponent.vue'
import BoardEditor from '../components/BoardEditorComponent.vue'
import PinCard from '../components/PinCardComponent.vue'
import Vue from 'vue'

export default {
    components: { 
        UserHeader,
        AppSpinner,
        BoardEditor,
        PinCard
    },
    data() {
        return {
            board: null,
            allBoardsNames: null,
            pins: null,
            isPublic: false,
            pinsNum: null,
            isDataLoaded: false,
            showBoardEditor: false,

        }
    },

    async created() {

        let userID = Vue.$cookies.get('userID')

        if (!this.$store.getters['getCurrentBoard']) { 
            let boardName = this.$route.params.name
            let boardInfo = { 
                userID: userID,
                boardName: boardName
            }
            await this.$store.dispatch('getBoardByName', boardInfo )
        }
        this.board = this.$store.getters['getCurrentBoard']
        this.isPublic = this.board.public
        await this.$store.dispatch('getPinsForBoard',this.board.boardID)
        await this.$store.dispatch('getBoardsForUserNoImages', userID)
        this.pins = this.$store.getters['getPinsForBoard']
        this.pinsNum = this.pins.length
        this.allBoardsNames = this.$store.getters['getBoardsForUserNoImages']
        this.isDataLoaded = true
        
        
    },
    methods: {
        toggleBoardEditor() { 
            this.showBoardEditor = !this.showBoardEditor
        },
    },
}
</script>
<style scoped >
#app{
    margin-top: 0%;
    overflow-x: hidden;
}
.nav-link { 
    font-size: 1.2rem !important;
}
.no-border:focus {
    outline: none;
    box-shadow: none;
}
.btn-margins { 
    padding: 0px !important;
    margin: 0px 10px 0px 10px;
}
.menu-divider  {
    width: 30%;
}
.board-header { 
    background-color: white;
}
.add-btn { 
    height: 70px;
    width: 70px;
    background-color: transparent;
    padding: 0;
    border: none;
    justify-content: center;
    align-items: center;
}
.add-btn:hover { 
    background-color: rgb(209, 207, 207);
    transition: 0.2s ease-out;
}
.icon-color { 
    color: #f4623a;
}
.icon-color:hover { 
    color: #c34e2e;
}
.cursor-pointer { 
    /*beacusse it is a div*/
    border-radius: 15px;
}
.cursor-pointer:hover{ 
    cursor: pointer;
    /*beacusse it is a div*/
    background-color: antiquewhite;
}

</style>