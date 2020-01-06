<template>
  <div v-loading='loading' :refreshFn="reload" :hasError="netError">
    <pic-carousel :piccarouseldata="piccarouseldata" :heightpx="heightpx" :coords="coords"></pic-carousel>
  </div>
</template>

<script>
  import PicCarousel from '@components/PicCarousel'

  export default {
    name: 'PictureCarousel',
    // 组合其它组件
    extends: {},
    // 组件属性、变量
    props: {

    },
    // 变量
    data() {
      return {
        piccarouseldata: {},
        heightpx: '350px',
        coords: "20,20,400,400",
        loading: true,
        netError: false
      }
    },
    computed: {
    },
    // 使用其它组件
    components: {
      'PicCarousel': PicCarousel
    },
    // 方法
    watch: {},
    methods: {
      piccarouseldatas() {
        this.loading = true;
        this.$bfw.post('MDgetSliders', {

        }).then(res => {
          this.loading = false;
          this.piccarouseldata = res.data.result;
          return this.piccarouseldata;
        }).catch(err => {
          this.loading = false;
          this.netError = true;
          err
        })
      },
      reload() {
        this.piccarouseldatas()
      }
    },
    // 生命周期函数
    beforeCreate() {

    },
    mounted() {
      this.piccarouseldatas()
    },
    beforeMounted() {

    }
  };
</script>
