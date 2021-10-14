<template>
  <md-table-row>
    <md-table-cell>{{subscription.id}}</md-table-cell>
    <md-table-cell>{{subscription.uri}}</md-table-cell>
    <md-table-cell>{{new Date(subscription.created).toLocaleString()}}</md-table-cell>
    <md-table-cell>{{subscription.subscriber_count}}</md-table-cell>
  </md-table-row>
</template>

<script>
export default {
  name:'Subscription',
  props:{
    subscription:Object
  }
}
</script>
