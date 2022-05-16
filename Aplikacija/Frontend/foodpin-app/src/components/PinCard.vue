<template>
  <div class="col mb-5">
        <!-- <router-link :to="{name:'StoreMenu',params:{id:store.uuid}}"> -->
          <!-- class="card h-100" @click="open" v-bind:id="store.uuid" -->
            <div class="back slikaHover">
                <img class="card-img-top slika" src="../assets/img/foodpin4.jpg" alt="..." />
                <div class="middle">
                  <h2><span class="badge badge-danger text">Proba</span></h2> 
                </div>
                <!-- <div class="card-body pb-3 pr-4 pl-4">
                    <div class="text-center">
                    </div>
                </div> -->
            </div>
        <!-- </router-link> -->
    </div>
</template>

<script>
export default {

}
</script>

<style>
.back{
  /* background:  url("../assets/img/foodpin4.jpg"); */
  /* height: 150px; */
  border-radius: 15%; 
  position: relative;

}
.slika{
  border-radius: 15%;
  opacity: 1;
  transition: .5s ease;
  backface-visibility: hidden;
  
}
.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  /* transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%); */
  text-align: center;
}
.slikaHover:hover .image {
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
}
/* .klase{
  color: transparent;
  display: block;
  position: absolute;
} */
</style>