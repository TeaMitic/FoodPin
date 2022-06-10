<template >
    <div class="row justify-content-between">
        <div class="user-info row justify-content-start">
            <img v-if="user.hasImage" :src="imageUrl" class="rounded-circle user-image">
            <img v-else src="../assets/img/blank_profile.png" class="rounded-circle user-image">
            <h3>{{user.surname != undefined ? user.surname : ""}}</h3>
        </div>
        <div v-if="user.isFollowed"><button class="btn-unfollow" @click="unfollow">Unfollow</button></div>
        <div v-else><button class="btn-follow" @click="follow">Follow</button></div>
              
    </div>
</template>
<script>
import imageConverter from '../helper/imageConverter'
export default {
    props: { 
        // user =  { 
        //     userID
        //     isFollowed
        //     image
        //     hasImage
        //     name
        //     surname

        // }
        user: Object
    },
    data() {
        return {
            currentUser: null,
            isFollowed: false,
            imageUrl: null,
        }
    },
    created() {
        if (!this.$store.getter['getUser']) { 
            this.currentUser = this.$store.getter['getUser']
        }
        if (this.user.hasImage) { 
            this.imageUrl = imageConverter.fromByteArray(this.user.image.data)
        }
        this.isFollowed = this.user.isFollowed



    },
    methods: {
        async follow() { 
            let followInfo = { 
                currentUser: this.currentUser.userID,
                followedUser: this.user.userID
            }
            await this.$store.dispatch('followUser',followInfo)
            this.isFollowed = true
        },
        async unfollow() { 
            let unfollowInfo = { 
                currentUser: this.currentUser.userID,
                followedUser: this.user.userID
            }
            await this.$store.dispatch('unfollowUser',unfollowInfo)
            this.isFollowed = false
        }
    },

}
</script>
<style scoped>
.btn-follow { 
    background-color: #f4623a;
}
.btn-unfollow { 
    background-color: #747474;
}
.user-image { 
    border-radius: 50%;
    width: 30px;
    height: 30px;
    object-fit: cover;
    /* margin-top: 1rem; */

}
</style>