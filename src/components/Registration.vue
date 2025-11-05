<template>
  <tr>
    <td>{{registration.id}}</td>
    <td>{{registration.uri}}</td>
    <td>{{new Date(registration.created).toLocaleString()}}</td>
  </tr>
</template>

<script>
export default {
  name:'Registration',
  props:{
    registration:Object
  }
}
</script>
