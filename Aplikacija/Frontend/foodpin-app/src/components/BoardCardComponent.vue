<template >
<!-- , params: {username: this.username, name: board.name} } -->
    <div class="card border-0 link"   @click="chosenBoard" >
        <div class="card-body d-flex ">
            <div class="card-body-left">
                <img class= "pin-image image-bigger" :src="this.images[0]" >
            </div>
            <div class="card-body-right">
                <div class="card-body-top  ">
                    <img class= "pin-image image-smaller top " :src="this.images[1]" >
                </div>
                <div class="card-body-bottom">
                    <img  class= "pin-image image-smaller bottom" :src="this.images[2]" >
                </div>
            </div>
        </div>
        <h5 class="card-title">{{board.name}}</h5>  
    </div>
</template>
<script>
import ImageConverter from '../helper/imageConverter' 
import Vue from 'vue'

export default {

    props: { 
        board: { 
            required: true,
            type: Object
        }
    },
    data() {
        return {
            images: null,
            username: null
        }
    },
    created() {
        this.username = Vue.$cookies.get('username')
        this.images = []
        this.board.pins.forEach(pin => {
            this.images.push(ImageConverter.fromByteArray(pin.image.data))
        });
    },
    methods: {
        chosenBoard() { 
            this.$store.dispatch('setChosenBoard', this.board)
            this.$router.push(`/board/${this.username}/${this.board.name}`)
        }
    },
}
</script>
<style scoped>

.pin-image { 
    object-fit: cover;
    border-radius: 10px;
    border: none;
    margin: 1px;
}
.image-bigger { 
    width: 9rem;
    height: 12rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.image-smaller {
    width: 5.9rem;
    height: 5.9rem;
}
.top { 
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.bottom { 
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
}
.card:hover { 
    background-color: rgb(211, 211, 211);
    cursor: pointer;
}
.link {
    text-decoration: none;
    /* z-index: -999; */
    /* padding: 0;   */
}
</style>