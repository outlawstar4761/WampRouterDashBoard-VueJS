<template>
  <div class="hello">
    <md-toolbar class="md-primary">
      <h1>Wamp Router Dashboard</h1>
      <ConnectionStatus></ConnectionStatus>
    </md-toolbar>
    <div class="viewport">
      <md-toolbar class="md-title">
        <h1 class="md-title">Open Sessions</h1>
      </md-toolbar>
      <md-table>
        <md-table-head>Id</md-table-head>
        <md-table-head>Peer</md-table-head>
        <md-table-head>Realm</md-table-head>
        <Session
        v-for="session in sessions"
        v-bind:key="session.session"
        v-bind:session="session"></Session>
      </md-table>
    </div>
    <div class="viewport">
      <md-toolbar>
        <h1 class="md-title">Registered Functions</h1>
      </md-toolbar>
      <md-table>
        <md-table-row>
          <md-table-head>Id</md-table-head>
          <md-table-head>Name</md-table-head>
          <md-table-head>Registered</md-table-head>
        </md-table-row>
        <Registration
        v-for="registration in registrations"
        v-bind:key="registration.id"
        v-bind:registration="registration"></Registration>
      </md-table>
    </div>
    <div class="viewport">
      <md-toolbar>
        <h1 class="md-title">Active Subscriptions</h1>
      </md-toolbar>
      <md-table>
        <md-table-row>
          <md-table-head>Id</md-table-head>
          <md-table-head>Name</md-table-head>
          <md-table-head>Registered</md-table-head>
          <md-table-head>Subscribers</md-table-head>
        </md-table-row>
        <Subscription
        v-for="subscription in subscriptions"
        v-bind:key="subscription.id"
        v-bind:subscription="subscription"></Subscription>
      </md-table>
    </div>
  </div>
</template>

<script>

import ConnectionStatus from './ConnectionStatus.vue'
import Registration from './Registration.vue';
import Subscription from './Subscription.vue';
import Session from './Session.vue';
// import ClosedSession from './ClosedSession.vue';

export default {
  name: 'HelloWorld',
  components:{
    ConnectionStatus,
    Registration,
    Subscription,
    Session,
    // ClosedSession
  },
  props: {},
  computed:{
    registrations(){
      return this.$store.state.registrations;
    },
    subscriptions(){
      return this.$store.state.subscriptions;
    },
    sessions(){
      return this.$store.state.sessions;
    },
    closedSessions(){
      return this.$store.state.closedSessions;
    },
    randomNumber(){
      return this.$store.state.lastRandomNumber;
    }
  },
  //Example for subscribing within a component. Really no reason to do this.
  // wamp:{
  //   subscribe:{
  //     'wamp.subscription.on_create'(newSub){
  //       console.log(newSub);
  //       //console.log('New Subscription created...');
  //       this.$store.dispatch('clearSubscriptions');
  //       this.$store.dispatch('getSubscriptions');
  //     },
  // },
  mounted(){}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
