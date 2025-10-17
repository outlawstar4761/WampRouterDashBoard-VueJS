<template>
  <span v-bind:class="[connectionOpen ? 'greendDot':'redDot']"></span>
</template>

<script>
export default {
  name:'ConnectionStatus',
  computed:{
    connectionOpen(){
      //it'd be nice to capture isRetrying and use and orangeDot
      return this.$store.state.wampSession?.isOpen ?? false;
    }
  }
}
</script>

<style>
.redDot {
  height: 25px;
  width: 25px;
  background-color: #f00707;
  border-radius: 50%;
  display: inline-block;
  margin-left: 1%;
}
.greendDot {
  height: 25px;
  width: 25px;
  background-color:#69f542;
  border-radius: 50%;
  display: inline-block;
  margin-left: 1%;
}
.orangeDot {
  height: 25px;
  width: 25px;
  background-color: #fac400;
  border-radius: 50%;
  display: inline-block;
  margin-left: 1%;
}
</style>
