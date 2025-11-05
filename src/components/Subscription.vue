<template>
  <tr>
    <td>{{subscription.id}}</td>
    <td>{{subscription.uri}}</td>
    <td>{{new Date(subscription.created).toLocaleString()}}</td>
    <td>{{subscription.subscriber_count}}</td>
  </tr>
</template>

<script>
export default {
  name:'Subscription',
  props:{
    subscription:Object
  }
}
</script>
