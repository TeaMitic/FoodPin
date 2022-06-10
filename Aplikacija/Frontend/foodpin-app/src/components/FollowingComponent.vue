<template >
    <div class="row following-cont justify-content-center align-items-center" v-on:click="hideComponent">
        <div v-if="!this.isDataLoaded">
            <AppSpinner />
        </div>
        <div v-else class="content my-5 col-6 " >
            <h1><span v-if="followingNum != 1">{{followingNum}}</span> Following</h1>
            <div class="following-cont">
                <UserFollow v-for="user in followings" :key="user.userID" :user="user"/>
            </div>

        </div>
    </div>
</template>
<script>
import AppSpinner from './AppSpinnerComponent.vue'
import UserFollow from './UserFollowComponent.vue'
// import Vue from 'vue'

export default {
 
    props: { 
        followingNum: Number,
        userID: String
    },
    components: {
        AppSpinner,
        UserFollow
    },
    computed: { 
        followings() { 
            return this.$store.getters['getFollowings']
        }
    },
    data() {
        return {
            name: null,
            isDataLoaded: false,
            followingUsers: null,
        }
    },
    async created() {
        await this.$store.dispatch('getFollowings',this.userID)
        this.isDataLoaded = true

    },
    methods: {
       
        hideComponent(event) { 
            let contentDiv = document.querySelector('.content')
            if(!contentDiv.contains(event.target)) {
                this.$emit('toggleFollowingField')
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

.content { 
    background-color: rgb(248, 245, 245);
    border-radius: 10px;
    height: 50%;
}
.following-cont { 
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    padding:0;
    margin:0;
    z-index: 1000;
    top:0;
    left:0;

    width: 100%;
    height: 100%;
}
</style>