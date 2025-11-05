<template>
  <tr>
    <td>{{session.session}}</td>
    <td>{{session.transport.peer}}</td>
    <td>{{session.realm}}</td>
  </tr>
</template>

<script>
export default {
  name:'Session',
  props:{
    session:Object
  }
}
</script>
