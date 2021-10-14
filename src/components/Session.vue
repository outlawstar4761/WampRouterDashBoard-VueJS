<template>
  <md-table-row>
    <md-table-cell>{{session.session}}</md-table-cell>
    <md-table-cell>{{session.transport.peer}}</md-table-cell>
    <md-table-cell>{{session.realm}}</md-table-cell>
  </md-table-row>
</template>

<script>
export default {
  name:'Session',
  props:{
    session:Object
  }
}
</script>
