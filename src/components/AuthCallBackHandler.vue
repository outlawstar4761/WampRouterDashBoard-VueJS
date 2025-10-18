<template>
  <div v-if="error.error">
    <h1>If you see this screen something has gone wrong:</h1>
    <h3>{{error.error}}</h3>
    <p>
      {{error.errorDescription}}
    </p>
  </div>
</template>

<script>

export default {
  name: 'AuthCallBackHandler',
  props: {},
  computed:{},
  data:function(){
    return{
      error:{
        error:null,
        errorDescription:null
      },
    }
  },
  methods:{
  },
  created(){
    if(this.$route.query.code){
      this.$store.dispatch('swapAuthorizationCode',this.$route.query.code);
    }else if(this.$route.query.error){
      this.error.error = this.$route.query.error;
      this.error.errorDescription = this.$route.query.error_description;
    }else{
      this.error.error = "An Unknown Error Has occurred";
      this.error.errorDescription = "Please try again later.";
    }
  }
}
</script>
