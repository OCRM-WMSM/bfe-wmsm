<template>
  <div class="box-card">
    <bfe-card  :body-style="{ padding: '0px'}">
      <div>
        <bfe-carousel id="carousel" :interval='6000' class="carousel" :height= "heightpx">
          <bfe-carousel-item v-for="item in picdatas" :key="item.id">
            <img :src="item.imgUrl" usemap="#mymap" height="100%" width="100%">
            <map name="mymap">
              <area shape="rect" :href="item.href" :coords="coords"/>
            </map>
          </bfe-carousel-item>
        </bfe-carousel>
      </div>
    </bfe-card>
  </div>

</template>

<script>
export default{
  props: {
    piccarouseldata: {
      type: Object,
      default: ''
    },
    heightpx: {
      type: String,
      default: ''
    },
    coords: {
      type: String,
      default: "200,20,400,400"
    }
  },
  beforeMount() {

  },
  data() {
    return{
      items: []
    }
  },
  computed: {
    picdatas() {
      if (JSON.stringify(this.piccarouseldata) === "{}") {
        var picurl = [];
        var picobj = {
          coords: "200,20,400,400",
          title: "固定广告1",
          crtDate: "2017-03-28",
          imgUrl: "./static/img/am1.png",
          href: "http://127.0.0.1/http://22.11.64.64:2000/"
        }
        picurl.push(picobj);
        this.items = picurl;
      } else {
        this.items = [];
        var data = this.piccarouseldata;
        for (var i = 0; i < data.adviseList.length; i++) {
          var obj = {
            imgUrl: data.adviseList[i].imageUrl,
            href: data.adviseList[i].linkUrl,
            coords: [data.x, data.y, data.urlwight, data.urlheight]
          };
          this.items.push(obj)
        }

      }
      return this.items
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style scoped>
  .bfe-carousel__item
  h3{
    color: #475669;
    font-size:18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .bfe-carousel__item:nth-child(2n) {
    background-color:#99a9bf;
  }
  .bfe-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
    }
    .carousel{
      min-height: 300px
    }
</style>
