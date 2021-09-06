<template>
  <div>
    <v-row
      justify="center"
      align="center"
    >
      <v-col cols="12">
        <v-scroll-y-reverse-transition
          mode="out-in"
          appear
          group
        >
          <div
            v-for="n in 10"
            :key="n"
          >
            <div
              v-if="n == point"
              cols="12"
              class="full-page"
            >
              {{ n }}シート目
              <component
                :is="tagName"
              />
            </div>
          </div>
        </v-scroll-y-reverse-transition>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          color=""
          dark
          bottom
          block
          @click="add"
        >
          <v-icon large>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import topmessage01 from '../components/topmessage01.vue'
export default {
  components: {
    topmessage01
  },
  data () {
    return {
      point: 1
    }
  },
  computed: {
    tagName () {
      const list = ['', 'topmessage01', 'topmessage02', 'topmessage03']
      return list[this.point]
    }
  },
  methods: {
    add () {
      this.point++
      if (this.point >= 10) {
        this.point = 1
      }
    }
  }
}
</script>

<style>
.full-page {
   height:80vh;
}
</style>
