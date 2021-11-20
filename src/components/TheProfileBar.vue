<template>
  <div>
    <div class="dropdown">
      <a class="btn btn-line pt-0 dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
        My Profile
      </a>

      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li><router-link :to="{ name: 'Signup'}" class="dropdown-item" >Signup</router-link></li>
        <li><router-link :to="{ name: 'Login'}" class="dropdown-item">Login</router-link></li>

        <li><router-link :to="{ name: 'MyProfile'}" class="dropdown-item" >My Profile</router-link></li>
        <li><router-link to="." class="dropdown-item" @click.native="logout">Logout</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheProfileBar',
  data: function(){
    return{
    }
  },
  methods:{
    logout:function(){
      this.$emit('logout')
      localStorage.removeItem('jwt')
      this.$store.dispatch('removeLoginUser')
      this.$router.push({name:'Login'})
      this.$store.dispatch('Logout')
    }
  }
}
</script>




<style>
</style>
