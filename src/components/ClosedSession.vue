<template>
  <tr>
    <td>{{sessionStats[0].session}}</td>
    <!-- <td>{{session.transport.peer}}</td> -->
    <td>{{sessionStats[0].realm}}</td>
    <td>{{sessionStats[1].bytes}}</td>
    <td>{{sessionStats[1].messages}}</td>
    <td>{{sessionStats[1].rated_messages}}</td>
    <td>{{sessionStats[1].duration}}</td>
  </tr>
</template>

<script>
export default {
  name:'ClosedSession',
  props:{
    sessionStats:Array
  }
}
</script>
