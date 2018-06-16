<template>
  <div class="postit">
    <h1>Postit</h1>
    <nuxt-link class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-mid-gray" to="/">New Photo</nuxt-link>
    <div class="overview">
      <div class="main overiew__main" v-if="mainImage.url !== ''">
        <div class="image-wrapper">
          <img :src="mainImage.url" ref="mainImageEl" />
          <canvas class="areas" ref="areas" @click="canvasClick"></canvas>
        </div>
      </div>
      <div class="detail overiew__detail" v-if="detailImage.url !== ''">
        <img :src="detailImage && detailImage.url" />
      </div>
      <div class="meta overiew__meta">
        <p v-show="detailImage.text">
          {{detailImage.text}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      factor: 1
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'clientId',
      'postits',
      'mainImage',
      'detailImage'
    ]),
    ...mapActions(['setDetailImage'])
  },
  methods: {
    drawRect(x, y, width, height, ctx) {
      console.log(x * this.factor, y * this.factor, width * this.factor, height * this.factor)
      ctx.strokeStyle="#ff0000";
      ctx.strokeRect(x * this.factor, y * this.factor, width * this.factor, height * this.factor);
    },
    canvasClick(event) {
      const coordsRel = this.getRelativeCoords(event.x, event.y)
      const filteredPostit = this.isInPostitArea(coordsRel.x, coordsRel.y)
      if (filteredPostit.length > 0) {
        this.$store.dispatch('setDetailImage', filteredPostit[0])
      }
    },
    getRelativeCoords(x, y) {
      const xRel = x - this.$refs.areas.getBoundingClientRect().x
      const yRel = y - this.$refs.areas.getBoundingClientRect().y

      return {x: xRel, y: yRel}
    },
    isInPostitArea (x, y) {
      return this.postits.filter((postit) => {
        return x >= this.factor * postit.x && x < this.factor * postit.x + this.factor * postit.width
            && y >= this.factor * postit.y && y < this.factor * postit.y + this.factor * postit.height
      })
    }
  },
  // watch: {
  //   mainImage() {
  //       setTimeout(() => {
  //         if (this.$refs.mainImageEl) {
  //           this.factor = this.$refs.mainImageEl.clientHeight / this.mainImage.height
  //           if (this.$refs.areas && this.$refs.areas.getContext) {
  //             this.$refs.areas.width = this.$refs.mainImageEl.clientWidth
  //             this.$refs.areas.height = this.$refs.mainImageEl.clientHeight
  //             const ctx = this.$refs.areas.getContext('2d')
  //             for (let i = 0;i < this.postits.length;i++) {
  //               const postit = this.postits[i]
  //               this.drawRect(postit.x, postit.y, postit.width, postit.height, ctx)
  //             }
  //           }
  //         }
  //       }, 10)
  //   }
  // },
  mounted: function () {
        setTimeout(() => {
          if (this.$refs.mainImageEl) {
            this.factor = this.$refs.mainImageEl.clientHeight / this.mainImage.height
            if (this.$refs.areas && this.$refs.areas.getContext) {
              this.$refs.areas.width = this.$refs.mainImageEl.clientWidth
              this.$refs.areas.height = this.$refs.mainImageEl.clientHeight
              const ctx = this.$refs.areas.getContext('2d')
              for (let i = 0;i < this.postits.length;i++) {
                const postit = this.postits[i]
                this.drawRect(postit.x, postit.y, postit.width, postit.height, ctx)
              }
            }
          }
        }, 100)
  }
}
</script>
<style scoped lang="scss">
  .image-wrapper {

    position: relative;
      // max-width: 50%;
      margin: 1rem auto;

    & img {
      display: block;
      max-width: 100%;
    }

    .areas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .overview {
    display: grid;
    grid-template-columns: 40fr 40fr 20fr;
    grid-template-areas: "main detail meta";
    grid-column-gap: 1rem;

    &__main {
      grid-area: main;
    }

    &__detail {
      grid-area: detail;
    }

    &__meta {
      grid-area: meta;
    }
  }
</style>
