<template>
  <div>
    <div class="pie-chart__main" style="width :300px"></div>
  </div>
</template>

<script>
// 导入echarts
  import echarts from 'echarts'

  export default {
    props: {
      piechartdata: {
        type: Function
      }
    },
    beforeMount() {
      this.piechartdata()
    },
    data() {
      return {
        func: function() {
          return this.piechartdata()
        }
      }
    },
    methods: {
      // 绘图
      piedata(data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
          sum = sum + Number(data[i].amount);
        }
        return sum;
      },
      piename(data) {
        var name = [];
        for (var i = 0; i < data.length; i++) {
          var obj = {
            icon: 'circle',
            name: data[i].title
          };
          name.push(obj);
        }
        return name;
      },
      datapie(data) {
        var datapie = [];
        for (var i = 0; i < data.length; i++) {
          var obj = {
            value: data[i].amount,
            name: data[i].title
          };
          datapie.push(obj);
        }
        return datapie;
      },
      piechartname(data) {
        var chartname = [];
        if (data[1].type === "0") {
          chartname = "资产总览"
        }else {
          chartname = "负债总览"
        }
        return chartname;
      },
      drawGraph() {
        // 绘图方法
        this.chart = echarts.init(this.$el.querySelector('.pie-chart__main')/*document.getElementById(id)*/)
        // 皮肤添加同一般使用方式
        //var pielist1 =this.piechartdata();
        this.chart.showLoading()
        var that = this;
        this.piechartdata(function(data) {
          var nub = that.piedata(data)
          var name = that.piename(data)
          var datapie = that.datapie(data)
          var charttittle = that.piechartname(data)
          that.chart.setOption({
            title: {
              center: ['20%', '20%'],
              text: charttittle + ":" + (nub) + '元'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: "55%",
              data: name
            },
            color: ["#FFCC4E", '#55C78F', '#9DE056', '#CFF463', '#7BC7FF', '#4EAAE7', '#59D5D8', '#FF8273', '#FF9652'],
            series: [
              {
                name: '资产分类',
                type: 'pie',
                electedMode: 'single',
                radius: ['25%', '55%'],
                center: ['30%', '45%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    testStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: datapie
              }
            ]
          })
        });
        this.chart.hideLoading()
      }
    },
    // keypoint：执行方法
    // “将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。”
    mounted() {
      this.$nextTick(function() {
        this.drawGraph()
      })
    }
  }

</script>

<style scoped>
  .content {
    width: 900px;
    /*自行添加样式即可*/
  }


  .pie-chart__main {
    /*需要制定具体高度，以px为单位*/
    min-height: 240px;
  }
</style>
