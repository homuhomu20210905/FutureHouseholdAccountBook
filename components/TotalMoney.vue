<template>
  <v-sheet rounded>
    <v-row>
      <v-col cols="12">
        <span>日数：{{ name }}<v-spacer /></span>
        金額：<span :class="changeColor"> {{ absMoney }}円</span>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
// import { times, timeCount, getComma, timePattern } from './Times'
export default {
  name: 'TotalMoney',
  props: {
    money: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
  },
  data () {
    return {}
  },
  computed: {
    changeColor () {
      if (this.money >= 0) {
        return ''
      } else {
        return 'teal lighten-4--text'
      }
    },
    absMoney () {
      return Math.abs(this.money)
    },
  },
  methods: {},
}
</script>
