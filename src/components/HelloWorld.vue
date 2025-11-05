<template>
  <div class="hello">
    <v-toolbar color="info" :elevation="4">
      <ConnectionStatus></ConnectionStatus>
      <v-toolbar-title>Wamp Router Dashboard</v-toolbar-title>
    </v-toolbar>
    <div class="viewport">
      <v-toolbar :elevation="4" title="Open Sessions"></v-toolbar>
      <v-table hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Peer</th>
            <th>Realm</th>
          </tr>
        </thead>
        <tbody>
          <Session
          v-for="session in sessions"
          v-bind:key="session.session"
          v-bind:session="session"></Session>
        </tbody>
      </v-table>
    </div>
    <div class="viewport">
      <v-toolbar :elevation="4" title="Registered Functions"></v-toolbar>
      <v-table hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Registered</th>
          </tr>
        </thead>
        <tbody>
          <Registration
          v-for="registration in registrations"
          v-bind:key="registration.id"
          v-bind:registration="registration"></Registration>
        </tbody>
      </v-table>
    </div>
    <div class="viewport">
      <v-toolbar :elevation="4" title="Active Subscriptions"></v-toolbar>
      <v-table hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Registered</th>
            <th>Subscribers</th>
          </tr>
        </thead>
        <tbody>
          <Subscription
          v-for="subscription in subscriptions"
          v-bind:key="subscription.id"
          v-bind:subscription="subscription"></Subscription>
        </tbody>
      </v-table>
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
.left-aligned {
  float: left;
}
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
