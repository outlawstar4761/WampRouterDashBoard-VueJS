<template>
  <form>
    <div class="imgcontainer">
        <img src="http://loe.outlawdesigns.io/Pictures/error/logo.png" alt="avatar" class="avatar">
    </div>
    <div class="container">
        <!-- <h5 style="color:red">{{login.errorMsg}}</h5> -->
        <label><b>Username:</b></label>
        <input type="text" class="loginput" v-model="username" required placeholder="Username">
        <label><b>Password:</b></label>
        <input type="password" class="loginput" v-model="password" required placeholder="Password">
        <button v-on:click="login">Login</button>
    </div>
</form>
</template>

<script>
export default {
  name: 'Login',
  props: {},
  computed:{},
  data:function(){
    return{
      username:'',
      password:''
    }
  },
  methods:{
    login(event){
      if(event){
        event.preventDefault();
      }
      this.$store.dispatch('authenticate',{username:this.username,password:this.password});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form{
    border:3px solid #f1f1f1;
}
.loginput{
    width:100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border:1px solid #ccc;
    box-sizing: border-box;
}
button{
    background-color: #4CAF50;
    color:white;
    padding:14px 20px;
    margin:8px 0;
    border:none;
    cursor: pointer;
    width:100%;
}
button:hover{
    opacity: 0.8;
}
.cancelbtn{
    width:auto;
    padding: 10px 18px;
    background-color: #f44336;
}
.imgcontainer{
    text-align: center;
    margin:24px 0 12px 0;
}
img.avatar{
    /* width:40%; */
    border-radius: 50%;
    height: 350px;
    width: 350px;
}
span.psw{
    float:right;
    padding-top:16%;
}
@media screen and (max-width: 300px){
    span.psw {
        display: block;
        float: none;
    }
    .cancelbtn {
        width: 100%;
    }
}
</style>
