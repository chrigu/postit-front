<template>
  <div class="example-simple">
    <h1>Postit</h1>
    <div class="overview" v-if="mainImage.url !== ''">
      <div class="image-wrapper">
        <img :src="mainImage.url" ref="mainImageEl" />
        <canvas class="areas" ref="areas" @click="canvasClick"></canvas>
      </div>
    </div>
    <div class="detail" v-if="detailImage.url !== ''">
      <img :src="detailImage && detailImage.url" />
      <p v-show="detailImage.text">
        {{detailImage.text}}
      </p>
    </div>
  </div>
</template>
<style>
.example-simple label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}
</style>

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
        }, 10)
    // this.$store.dispatch('setMainImage', {
    //   url: 'http://localhost:4000/overview.jpg',
    //   height: 4032,
    //   width: 3024
    // })
  //   setTimeout(() => this.$store.dispatch('setPostits', [ {
  //   path: 'http://localhost:4000/85.jpg',
  //   x: 1207,
  //   y: 1914,
  //   w: 550,
  //   h: 344 },
  // {
  //   path: 'http://localhost:4000/86.jpg',
  //   x: 561,
  //   y: 1908,
  //   w: 547,
  //   h: 337 },
  // {
  //   path: 'http://localhost:4000/87.jpg',
  //   x: 1228,
  //   y: 1509,
  //   w: 551,
  //   h: 344 },
  // {
  //   path: 'http://localhost:4000/88.jpg',
  //   x: 598,
  //   y: 1531,
  //   w: 550,
  //   h: 343 },
  // {
  //   path: 'http://localhost:4000/89.jpg',
  //   x: 785,
  //   y: 2336,
  //   w: 545,
  //   h: 330 },
  // {
  //   path: 'http://localhost:4000/90.jpg',
  //   x: 1594,
  //   y: 2246,
  //   w: 607,
  //   h: 439 },
  // {
  //   path: 'http://localhost:4000/91.jpg',
  //   x: 1903,
  //   y: 1822,
  //   w: 577,
  //   h: 357 },
  // {
  //   path: 'http://localhost:4000/92.jpg',
  //   x: 1917,
  //   y: 1377,
  //   w: 574,
  //   h: 366 } ]), 0)
  }
}
</script>
<style scoped lang="scss">
  .image-wrapper {

    position: relative;
      max-width: 50%;
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
</style>
