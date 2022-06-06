<template>
  <div class="card">
    <div class="card-content">
      <div class="row">
        <div class="col-6">
          <!-- Treba da bude selectbox -->
          <h2 class="card-title">Board</h2> 
        </div>
        <div class="col-6">
          <button class="button">Save pin</button>
        </div>
      </div>
      <div class="row">
        <h2 class="card-title">Pin Name</h2>
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
export default {

}
</script>

<style>
:root{
  --clr-orange: #f4623a;
  --clr-neutral-100: hsl(0,0%,100%);  
}

.card{
  color: var(--clr-neutral-100);
  font-family: var(--bs-body-font-family);
  background-image: url("../assets/img/foodpin3.jpg");
  background-size:cover;
  /* padding: 0.5rem 0 0.5rem; */
  max-width: 35ch;
  overflow: hidden;
  transition: transform 500ms ease;
}

.card:hover{
  transform: scale(1.05);
}

.card:hover .card-content{
  transform: translateY(0);
}

.card-content{
  background: hsl(0 0% 0% / 0.2); /*ovo treba da bude za hover, animaciju*/  
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
  margin-right: 0.5%;
  border-radius: 10%;
}

.button:hover, .button:focus {
  background-color: rgb(244 98 58 / 0.7);
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