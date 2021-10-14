<template>
  <md-table-row>
    <md-table-cell>{{registration.id}}</md-table-cell>
    <md-table-cell>{{registration.uri}}</md-table-cell>
    <md-table-cell>{{new Date(registration.created).toLocaleString()}}</md-table-cell>
  </md-table-row>
</template>

<script>
export default {
  name:'Registration',
  props:{
    registration:Object
  }
}
</script>
