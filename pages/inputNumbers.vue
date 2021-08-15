<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      金額を入力してください。
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item.name">
        {{ item.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.name">
        <v-card color="basil" flat>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(moneyInfo, mIndex) in timeMoneys[item.time]"
                :key="moneyInfo.name + mIndex"
                cols="12"
              >
                <number
                  :tab="tab"
                  @change-value="moneyInfo.money = $event"
                ></number>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col>
                <h1>{{ item.name }}の合計金額{{ total(item.time) }}円</h1>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { times, timeCount, getComma, timePattern } from '../components/Times'
import Number from '../components/Number.vue'
export default {
  components: {
    Number,
  },
  data() {
    const items = times()
    const timeMoneys = {}
    items.forEach((item) => {
      timeMoneys[item.time] = []
      for (var i = 0; i < 10; i++) {
        timeMoneys[item.time].push({ name: '', money: 0 })
      }
    })
    return {
      tab: null,
      items,
      timeMoneys,
    }
  },
  computed: {},
  methods: {
    total(value) {
      let result = 0
      this.timeMoneys[value].forEach((item) => {
        result += item.money
      })
      return getComma(result)
    },
  },
}
</script>
