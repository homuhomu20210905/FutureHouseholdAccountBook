<template>
  <v-row
    justify="center"
    align="center"
  >
    <v-col cols="12">
      <h2>このアプリについて</h2>
      <p>用途と金額を入力することで大体の使用金額がわかるアプリです。</p>
      <p>具体的には、平日●●円、休日●●円使用した場合に「年間いくらになるのか？</p>
      <p>平日、休日、固定費を集計した場合にどこにコストがかかっているのか？</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      point: 1
    }
  },
  methods: {
  }
}
</script>
