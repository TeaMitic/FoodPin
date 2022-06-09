<template>
  <div v-if="isDataLoaded" class="card col-2" :style="cssProps">
  <!-- { 'background-image': `url(${require(imageUrl)})`} -->
    <div class="card-content">
      <div class="row row1">
        <div class="col-6">
          <!-- Treba da bude selectbox -->
          <!-- <h2 class="card-title">Board</h2>  -->
          <!-- <select name="board">
            <option value="Paste">Paste</option>
            <option value="Smoothies">Smoothies</option>
            <option value="Salads">Salads</option>
            <option value="Sweets">Sweets</option>
          </select> -->
            <select v-model="selected_board" class="select">
              <option v-for="board in boards" :key="board.boardID" :value="board.name">{{board.name}}</option>
            </select>
        </div>
        <div class="col-6">
          <button class="button" @click= "savePin">Save pin</button>
        </div>
      </div>
      <div class="row row2">
        <h4 class="card-title">{{pin.title}}</h4>
      </div>
    </div>
  </div>
  <!-- <div class="col mb-5"> -->
        <!-- <router-link :to="{name:'StoreMenu',params:{id:store.uuid}}"> -->
          <!-- class="card h-100" @click="open" v-bind:id="store.uuid" -->
            <!-- <div class="back slikaHover"> -->
                <!-- <img class="card-img-top slika" src="../assets/img/foodpin4.jpg" alt="..." /> -->
                <!-- <div class="middle"> -->
                  <!-- <h2><span class="badge badge-danger text">Proba</span></h2>  -->
                <!-- </div> -->
                <!-- <div class="card-body pb-3 pr-4 pl-4">
                    <div class="text-center">
                    </div>
                </div> -->
            <!-- </div> -->
        <!-- </router-link> -->
    <!-- </div> -->
</template>

<script>
import imageConverter from '@/helper/imageConverter'
import Vue from 'vue'

export default {
  props:{
    pin:{
      required:true,
      type: Object
    },
  },
  data(){
    return{
      isDataLoaded: false,
      boards: null,
      selected_board: '',
      imageUrl: null,
      cssProps: {
        backgroundImage: ''
      }
    }
  },
  methods:{
    savePin(){
      if(this.selected_board != ""){
        const obj={
          userID: Vue.$cookies.get('userID'),
          pinID: this.pin.pinID,
          boardName: this.selected_board
        }
        this.$store.dispatch('savePin', obj)
       

      }
      else{
        Vue.toasted.show('You must select a board', {
          theme: "bubble",
          position: "top-center",
          duration: 2500
        })
      }
    }
  },
  async created(){
    const userID = Vue.$cookies.get('userID')
    await this.$store.dispatch('getBoardsForUser', userID)
    this.boards = this.$store.getters['getBoardsForUser']
    this.imageUrl = imageConverter.fromByteArray(this.pin.image.data)
    // console.log(this.imageUrl);
    this.cssProps.backgroundImage = `url(${this.imageUrl})`
    this.isDataLoaded = true
  }

}
</script>

<style  scoped>
:root{
  --clr-orange: #f4623a;
  --clr-neutral-100: hsl(0,0%,100%);  
}

.card{
  color: var(--clr-neutral-100);
  font-family: var(--bs-body-font-family);
  /* background-image: url("../assets/img/foodpin3.jpg"); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  /* padding: 0.5rem 0 0.5rem; */
  object-fit:fill;
  max-width: 40ch;
  height: 15rem; /*auto */
  width: inherit; /*auto */
  margin-bottom: 2.5%;
  margin-left: 2.5%;
  overflow: hidden;
  transition: transform 500ms ease;
}

.card:hover{
  transform: scale(1.05);
}

.card:hover .card-content{
  transform: translateY(0);
}

.card-title{
  display: flex;
  justify-content: center;
  align-items:flex-end;
}

.card-content{
  background: hsl(0 0% 0% / 0.2); /*ovo treba da bude za hover, animaciju*/  
  height: 15rem;
  width: inherit;
  transform: translateY(100%);
  transition: transform 500ms ease;
}


/* u tutorijalu je ovo bilo za liniju ispod teksta
 .card-title::after{
  content: "";
  position: absolute;
} */

.button{
  cursor: pointer;
  position: inherit;
  display: inline-block;
  text-decoration: none;
  color: var(--clr-neutral-100);
  background-color: var(--clr-orange);
  border: var(--clr-orange);
  margin-top: 2%;
  margin-right: 2%;
  border-radius: 10%;
}

.button:hover, .button:focus {
  background-color: rgb(244 98 58 / 0.7);
}

.select{
  background-color: rgb(255, 98, 58);
  width: 75px;
  color: white;
}

.row1{
  margin-top: 5%;
}

.row2{
  margin-top: 10%;
}


/* .back{
  background:  url("../assets/img/foodpin4.jpg");
  height: 150px;
  border-radius: 15%; 
  position: relative;

} 
 .slika{
  border-radius: 15%;
  opacity: 1;
  transition: .5s ease;
  backface-visibility: hidden;
  
} */
/* .middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
} */
/* .slikaHover:hover .image {
  opacity: 0.3;
}

.slikaHover:hover .middle {
  opacity: 1;
}

.text {
  background-color: #04AA6D;
  color: white;
  font-size: 16px;
  padding: 16px 32px;
} */
/* .klase{
  color: transparent;
  display: block;
  position: absolute;
} */

</style>