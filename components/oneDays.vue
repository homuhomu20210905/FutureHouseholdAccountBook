<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col
          v-for="(moneyInfo, mIndex) in periods"
          :key="item.value + moneyInfo.name + mIndex"
          lg="4"
          cols="6"
          md="4"
        >
          <number
            :tab="tab"
            :name="moneyInfo.name"
            :money="moneyInfo.money"
            :valid-flag="
              moneyInfo.validFlag"
            @change-value="
              setNumber(item.value,
                        mIndex,
                        $event)"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Number from '../components/Number.vue'

export default {
  components: { Number },
  props: {
    periods: {
      type: Object,
      require: true,
      default: () => ({ }) // Objectを生成する関数を指定する
    },
    tab: {
      type: Number,
      require: true,
      default: 0,
    },
    item: {
      type: Object,
      require: true,
      default: () => ({})
    }
  },
  data () {
    // console.log(this.periods)
    return {}
  },
  methods: {
    setNumber (value, index, $event) {
      // console.log('number value set...')
      $event.$index = index
      this.$emit('change-value2', $event)
    }
  }
}
</script>
