import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import router from './router';
import AuthRepository from './api/AuthRepository'
import autobahn from 'autobahn-browser';

Vue.use(Vuex);

/*WEB CONFIG*/
const wampConn = new autobahn.Connection({
  url:'wss://api.outlawdesigns.io:9700/ws',
  realm:'realm1'
});
wampConn.onopen = (session) => {
  console.log('connected to wamp router!');
}
wampConn.onclose = (reason,details) => {
  console.error('WAMP connection closed:',reason, details);
}
wampConn.open();
/*WEB CONFIG*/

const state = {
  auth_token:null,
  wampConn:null,
  subscriptions:[],
  registrations:[],
  sessions:[],
  closedSessions:[],
  lastRandomNumber:0,
}
// const getters = {};
const actions = {
  authenticate({commit},payload){
    AuthRepository.authenticate(payload.username,payload.password).then((response)=>{
      if(!response.data['error']){
        commit('setAuthToken',response.data.token);
        this.dispatch('init');
        router.push('home');
      }else{
        console.log(response.data);
      }
    }).catch((err)=>{
      throw new Error(`API ${err}`);
    });
  },
  verifyToken({commit},payload){
    console.log(payload);
    AuthRepository.verify(payload.auth_token).then((response)=>{
      if(!response.data['error']){
        commit('setAuthToken',response.data.auth_token);
        if(router.currentRoute.path == '/'){
          this.dispatch('init');
          router.push('home');
        }
      }else{
        router.push('/');
        console.log(response.data);
      }
    }).catch((err)=>{
      throw new Error(`API ${err}`);
    });
  },
  init(){
    //get initial values
    this.dispatch('getRegistrations');
    this.dispatch('getSubscriptions');
    this.dispatch('getSessions');
    //subscribe to changes
    //SESSION
    this.dispatch('subscribeToNewSessions');
    this.dispatch('subscribeToLostSessions');
    //SUBSCRIPTIONS
    this.dispatch('subscribeToNewSubscriptions');
    this.dispatch('subscribeToLostSubscriptions');
    this.dispatch('subscribeToOnSubscribe');
    this.dispatch('subscribeToOnUnsubscribe');
    //REGISTRATIONS
    this.dispatch('subscribeToNewRegistrations');
    this.dispatch('subscribeToLostRegistrations');

    this.dispatch('subscribeToRandomNumber');
  },
  //GETTERS
  getRegistrations(){
    wampConn.session.call('wamp.registration.list').then((data)=>{
      data.exact.map((id)=>{
        this.dispatch('getRegistration',id);
      });
    });
  },
  getRegistration({commit},registrationId){
    wampConn.session.call('wamp.registration.get',[registrationId]).then((registration)=>{
      commit('addRegistration',registration);
    });
  },
  getSubscriptions(){
    wampConn.session.call('wamp.subscription.list').then((data)=>{
      data.exact.map((id)=>{
        this.dispatch('getSubscription',id);
      });
    });
  },
  getSubscription({commit},subscriptionId){
    wampConn.session.call('wamp.subscription.get',[subscriptionId]).then((sub)=>{
      sub['subscriber_count'] = 0
      commit('addSubscription',sub);
      this.dispatch('getSubscriberCount',subscriptionId);
    });
  },
  getSubscriberCount({commit},subscriptionId){
    wampConn.session.call('wamp.subscription.count_subscribers',[subscriptionId]).then((number)=>{
      commit('updateSubscriberCount',{subscriptionId:subscriptionId,number:number});
    }).catch(()=>{
      commit('removeSubscription',subscriptionId);
    });
  },
  getSessions(){
    wampConn.session.call('wamp.session.list').then((data)=>{
      data.map((id)=>{
        this.dispatch('getSession',id);
      });
    });
  },
  getSession({commit},sessionId){
    wampConn.session.call('wamp.session.get',[sessionId]).then((session)=>{
      commit('addSession',session);
    });
  },
  //SESSION SUBSCRIPTIONS
  subscribeToNewSessions(){
    wampConn.session.subscribe('wamp.session.on_join',(session)=>{
      this.dispatch('getSession',session[0].session);
    });
  },
  subscribeToLostSessions({commit}){
    wampConn.session.subscribe('wamp.session.on_leave',(sessionId)=>{
      commit('removeEndedSession',sessionId);
    });
  },
  //SUBSCRIPTION SUBSCRIPTIONS
  subscribeToNewSubscriptions(){
    wampConn.session.subscribe('wamp.subscription.on_create',(data)=>{
      this.dispatch('getSubscription',data[1].id);
      //this.dispatch('getSubscriberCount',data[1].id);
    });
  },
  subscribeToLostSubscriptions(){
    //last subscriber unsubsribed
    //really no reason to use this because we handle it all
    //on unsubscre
    wampConn.session.subscribe('wamp.subscription.on_delete',(data)=>{
      console.log('deleted: ' + data[1]);
    });
  },
  subscribeToOnSubscribe(){
    wampConn.session.subscribe('wamp.subscription.on_subscribe',(data)=>{
      this.dispatch('getSubscriberCount',data[1]);
    });
  },
  subscribeToOnUnsubscribe(){
    wampConn.session.subscribe('wamp.subscription.on_unsubscribe',(data)=>{
      console.log('unsubsribed: ' + data[1]);
      this.dispatch('getSubscriberCount',data[1]);
    });
  },
  //REGISTRATION SUBSCRIPTIONS
  subscribeToNewRegistrations(){
    wampConn.session.subscribe('wamp.registration.on_create',(data)=>{
      this.dispatch('getRegistration',data[1].id);
    });
  },
  subscribeToLostRegistrations({commit}){
    wampConn.session.subscribe('wamp.registration.on_delete',(data)=>{
      commit('removeRegistration',data[1]);
    });
  },
  //FOR TESTING ONLY
  subscribeToRandomNumber({commit}){
    wampConn.session.subscribe('io.outlawdesigns.test.random_number',(data)=>{
      commit('updateRandomNumber',data);
    });
  },
  //CLEANUP METHODS
  clearSubscriptions({commit}){
    commit('clearSubscriptions');
  },
  clearRegistrations({commit}){
    commit('clearRegistrations');
  }
};
const mutations = {
  setAuthToken(state,token){
    VueCookies.set('auth_token',token,'4h');
    state.auth_token = token;
  },
  addRegistration(state,registration){
    state.registrations.push(registration);
  },
  removeRegistration(state,registrationId){
    let indexToRemove = state.registrations.map(e => e.id).indexOf(registrationId);
    state.registrations.splice(indexToRemove,1);
  },
  addSubscription(state,subscription){
    state.subscriptions.push(subscription);
    console.log(state.subscriptions);
  },
  removeSubscription(state,subscriptionId){
    let indexToRemove = state.subscriptions.map(e => e.id).indexOf(subscriptionId);
    state.subscriptions.splice(indexToRemove,1);
  },
  addSession(state,session){
    state.sessions.push(session);
  },
  removeEndedSession(state,sessionId){
    let indexToRemove = state.sessions.map(e => e.id).indexOf(sessionId);
    state.sessions.splice(indexToRemove,1);
    //state.closedSessions.push(session);
  },
  clearRegistrations(state){
    state.registrations = [];
  },
  clearSubscriptions(state){
    state.subscriptions = [];
  },
  clearSessions(state){
    state.sessions = [];
  },
  updateSubscriberCount(state,data){
    let targetIndex = state.subscriptions.map(e => e.id).indexOf(data.subscriptionId);
    state.subscriptions[targetIndex]['subscriber_count'] = data.number;
  },
  updateRandomNumber(state,number){
    state.lastRandomNumber = number[0];
  }
}
export default new Vuex.Store({
  state,
  actions,
  mutations
});
