<template>
  <div>
    <v-chip-group column>
      <v-chip
        v-for="(item,index) in list"
        :key="item"
        active-class="light-blue darken-3"
        @click="setNumber(index)"
      >
        {{ item }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    position: {
      type: Number,
      require: true
    }
  },
  data () {
    const list = ['浪費', '消費', '投資']
    return { list, select: 0 }
  },
  computed: {
    current () {
      return this.list[this.select]
    }
  },
  methods: {
    setNumber (index) {
      this.select = index
      const position = this.position
      this.$emit('select', { position, index })
    }
  }
}
</script>
