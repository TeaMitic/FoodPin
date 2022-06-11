<template>
    <div class="mainDiv" >
        <!-- Navigation-->
        <UserHeader  />
        <!-- Main container -->
        <div class="container my-3 py-5 d-flex justify-content-center">
            <!-- User info -->
            <div v-if="!this.isDataLoaded">
                <AppSpinner />
            </div>
            <div v-else class="col-6 p-4 user-info-cont ">
                <div class="user-info">
                    <div class="contt-user-image d-flex justify-content-center my-3 p-3">
                        <div class="d-flex">
                            <input type="file" class="p-0 input-file" id="image-input" @change="onFileSelected($event)">
                            <div class="edit-icon-cont ">
                                <div class="cursor-pointer p-2 rounded-circle d-flex align-items-center justify-content-center">
                                    <font-awesome-icon class=" mx-2 mb-1 edit-icon" :icon="['fa','edit']"  @click="triggerFileInput"/>
                                </div>
                            </div>
                            <img v-if="!this.hasImage" class="user-image" src= "../assets/img/blank_profile.png" alt="User profile image">
                            <img v-else class="user-image" :src= this.imageUrl alt="User profile image">
                        </div>
                        <div class="save-img-cont d-flex flex-column justify-content-end" v-if="btnUploadEnabled">
                            <button class="btn-img-save" @click="saveImage">Upload</button>
                        </div>
                    </div>
                    <div class="user-info-rest d-flex align-items-stretch">
                        <div class="cont-user-username">
                            <label>Username:</label>
                            <input class="user-username " :placeholder="user.username" disabled >
                        </div>
                        <div class="cont-user-fullname">
                            <div class="cont-user-name">
                                <label for="name">Name:</label>
                                <input type="text" name="name" class="user-name inputFields " :placeholder="user.name" v-model="user.name">
                            </div>
                            <div class="cont-user-surname">
                                <label for="surname">Surname:</label>
                                <input type="text" name="surname" class="user-surname inputFields " :placeholder="user.surname" v-model="user.surname">
                            </div>
                        </div>
                        <div class="cont-user-website">
                            <label for="website">Website:</label>
                            <input type="text" name="website" class="user-website " :placeholder="user.website" v-model="user.website">
                            <!-- <a class="user-website" v-bind:href="user.website" target="_blank" rel="noopener"><b>{{user.website | trim-web}}</b></a> -->
                        </div>
                        <div class="cont-user-about">
                            <label for="about">About you:</label>
                            <textarea name="about"  rows="3" class="user-about " :placeholder="user.about" v-model="user.about"></textarea>
                        </div>
                    </div>
                    <div class="save-cont p-3">
                        <button class="btn-save " @click="saveEdit">Save</button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style >
    
</style>