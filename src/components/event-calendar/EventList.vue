<template>
  <div class="eventList">
    <ul v-for="data in tableData" class="eventlist-line">
      <li class="col-xs-1">
        <div class="eventlist-icon">
          <img :src="getImgUrl(data.type)"/>
        </div>
      </li>
      <li class="col-xs-6">
        <div class="eventlist-events">
          {{data.title}}
          <br>
          本期金额&nbsp;:&nbsp;{{data.content}}
        </div>
      </li>
      <li class="col-xs-3">
        <div class="eventlist-lastdate">
          {{ getDateDiff(data.tipDate) }}
        </div>
      </li>
      <li class="col-xs-3">
        <div class="eventlist-linkto">
          {{ getAction(data.type) }}&nbsp;>
        </div>
      </li>
    </ul>
    <!-- table中无数据显示暂无数据 -->
    <ul class="eventlist-empty" v-show="noData">
      <li>暂无数据</li>
    </ul>
 </div>
</template>

<script>
  import { formatDate2 }from '../../components/event-calendar/tools'
  export default{
    name: "EventList",
    data() {
      return{
        noData: false
      }
    },
    computed: {
      tableData() {
        var allEvents = this.$store.state.eventlists.events;
        var events = []
        // 如果选中日期是今天，则展示今天以后所有事件，否则只展示选中那天的事件
        if(formatDate2(this.chooseDay) === formatDate2(new Date())) {
          allEvents.forEach(event => {
            // 比较两个日期大小
            if(new Date(event.tipDate) > new Date() || event.tipDate === formatDate2(new Date())) {
              events.push(event)
            }
          })
        }else {
          allEvents.forEach(event => {
            if(event.tipDate === formatDate2(this.chooseDay)) {
              events.push(event)
            }
          })
        }
        if(events.length === 0) {
          this.noData = true
        }else {
          this.noData = false
        }
        return events
      }
    },
    props: {
      chooseDay: {
        type: Date,
        default: new Date()
      }
    },
    methods: {
      getImgUrl(typeId) {
        var imgUrl = null;
        switch(typeId) {
        case "1":
          imgUrl = "../../../static/img/icon-salary.png";
          break;
        case "2":
          imgUrl = "../../../static/img/icon-houseloan.png";
          break;
        default:
          imgUrl = "../../../static/img/icon-others.png";
          break;
        }
        return imgUrl;
      },
      getDateDiff(tipDay) {
        //将tipDay转化为date格式
        var tipDate = new Date(tipDay);
        //获取tipDate的0点
        var tipDate0 = new Date(tipDate.getFullYear(), tipDate.getMonth(), tipDate.getDate());
        var today = new Date();
        //获取今日的0点
        var today0 = (new Date(today.getFullYear(), today.getMonth(), today.getDate()));
        //获得两个日期0点的时间差，单位为毫秒
        var timeDiff = tipDate0.getTime() - today0.getTime();
        //获得相差的天数
        var dateDiff = parseInt(timeDiff / (24 * 3600 * 1000));

        if(dateDiff === 0) {
          return "今日"
        }
        if(dateDiff > 0) {
          return "剩余" + dateDiff + "天";
        }
        if(dateDiff < 0) {
          return "已过" + Math.abs(dateDiff) + "天";
        }
      },
      getAction(typeId) {
        var actitonType = null;
        switch (typeId) {
        case "1":
          actitonType = "查看详情";
          break;
        case "2":
          actitonType = "立刻还款";
          break;
        default:
          actitonType = "查看详情2";
        }
        return actitonType;
      }
    }
  }
</script>

<style scoped>
.eventList{

}
.eventList li{
  list-style-type: none;
}
.eventlist-line{
  padding: 0;
  width: 100%;
  margin: 0;
  min-height: 49.5px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dadada;
}
.eventlist-linkto{
  float: right;
  padding-right: 4px;
  cursor: pointer;
  color: #bc2c3e;
}
.eventlist-empty{
  padding: 0;
  display: flex;
  justify-content: center;
}
</style>
