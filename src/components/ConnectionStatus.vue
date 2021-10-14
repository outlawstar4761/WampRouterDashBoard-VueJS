<template>
  <span v-bind:class="[$root.wampIsOpen ? 'greendDot':'',$root.wampIsRetrying ? 'orangeDot':'redDot']"></span>
  <!-- <span v-if="$root.wampIsOpen">Connected</span>
  <span v-else-if="$root.wampIsRetrying">Retrying...</span>
  <span v-else>Disconnected</span> -->
</template>

<script>
export default {
  name:'ConnectionStatus'
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
