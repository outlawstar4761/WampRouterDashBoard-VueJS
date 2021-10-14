import Vue from 'vue'
import Vuex from 'vuex'
// import VueCookies from 'vue-cookies'
// import router from './Router';


Vue.use(Vuex);

const state = {
  subscriptions:[],
  registrations:[],
  sessions:[],
  closedSessions:[],
  lastRandomNumber:0,
}
// const getters = {};
const actions = {
  //GETTERS
  getRegistrations(){
    Vue.$wamp.call('wamp.registration.list').then((data)=>{
      data.exact.map((id)=>{
        this.dispatch('getRegistration',id);
      });
    });
  },
  getRegistration({commit},registrationId){
    Vue.$wamp.call('wamp.registration.get',[registrationId]).then((registration)=>{
      commit('addRegistration',registration);
    });
  },
  getSubscriptions(){
    Vue.$wamp.call('wamp.subscription.list').then((data)=>{
      data.exact.map((id)=>{
        this.dispatch('getSubscription',id);
      });
    });
  },
  getSubscription({commit},subscriptionId){
    Vue.$wamp.call('wamp.subscription.get',[subscriptionId]).then((sub)=>{
      sub['subscriber_count'] = 0
      commit('addSubscription',sub);
      this.dispatch('getSubscriberCount',subscriptionId);
    });
  },
  getSubscriberCount({commit},subscriptionId){
    Vue.$wamp.call('wamp.subscription.count_subscribers',[subscriptionId]).then((number)=>{
      commit('updateSubscriberCount',{subscriptionId:subscriptionId,number:number});
    }).catch(()=>{
      commit('removeSubscription',subscriptionId);
    });
  },
  getSessions(){
    Vue.$wamp.call('wamp.session.list').then((data)=>{
      data.map((id)=>{
        this.dispatch('getSession',id);
      });
    });
  },
  getSession({commit},sessionId){
    Vue.$wamp.call('wamp.session.get',[sessionId]).then((session)=>{
      commit('addSession',session);
    });
  },
  //SESSION SUBSCRIPTIONS
  subscribeToNewSessions(){
    Vue.$wamp.subscribe('wamp.session.on_join',(session)=>{
      this.dispatch('getSession',session[0].session);
    });
  },
  subscribeToLostSessions({commit}){
    Vue.$wamp.subscribe('wamp.session.on_leave',(sessionId)=>{
      commit('removeEndedSession',sessionId);
    });
  },
  //SUBSCRIPTION SUBSCRIPTIONS
  subscribeToNewSubscriptions(){
    Vue.$wamp.subscribe('wamp.subscription.on_create',(data)=>{
      this.dispatch('getSubscription',data[1].id);
      //this.dispatch('getSubscriberCount',data[1].id);
    });
  },
  subscribeToLostSubscriptions(){
    //last subscriber unsubsribed
    //really no reason to use this because we handle it all
    //on unsubscre
    Vue.$wamp.subscribe('wamp.subscription.on_delete',(data)=>{
      console.log('deleted: ' + data[1]);
    });
  },
  subscribeToOnSubscribe(){
    Vue.$wamp.subscribe('wamp.subscription.on_subscribe',(data)=>{
      this.dispatch('getSubscriberCount',data[1]);
    });
  },
  subscribeToOnUnsubscribe(){
    Vue.$wamp.subscribe('wamp.subscription.on_unsubscribe',(data)=>{
      console.log('unsubsribed: ' + data[1]);
      this.dispatch('getSubscriberCount',data[1]);
    });
  },
  //REGISTRATION SUBSCRIPTIONS
  subscribeToNewRegistrations(){
    Vue.$wamp.subscribe('wamp.registration.on_create',(data)=>{
      this.dispatch('getRegistration',data[1].id);
    });
  },
  subscribeToLostRegistrations({commit}){
    Vue.$wamp.subscribe('wamp.registration.on_delete',(data)=>{
      commit('removeRegistration',data[1]);
    });
  },
  //FOR TESTING ONLY
  subscribeToRandomNumber({commit}){
    Vue.$wamp.subscribe('io.outlawdesigns.test.random_number',(data)=>{
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
