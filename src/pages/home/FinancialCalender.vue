<template>
  <bfe-card class="finicial-calender">
    <div slot="header">金融日历</div>
    <div class="fini-calender-body">
      <div class="col-md-4" style="min-width: 206px">
        <calender v-on:pickDay="chooseDay"></calender>
      </div><!--
   --><div class="col-md-8" style="min-width: 206px height: 160px">
       <div class="adv-msg">
         公告信息：<a class="daylyNews">关于销售国家开发银行2017年第四期金融债券的公告</a>
       </div>
       <div class="finicial-calender-wekanddate">
        <li>{{currentWeek}}<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>{{currentDay}}</li>
        <a class="button" @click="pickButton()">添加提醒&nbsp;+</a>
       </div>
       <div class="fini-cal-eventlist">
         <event-list :chooseDay="pickedDay"></event-list>
       </div>
      </div>
    </div>
  </bfe-card>
</template>

<script>
import _ from 'lodash'
import { formatDate2 } from '@components/event-calendar/tools'
import calender from "@components/event-calendar/Calender"
import EventList from "@components/event-calendar/EventList"
export default {
  name: "finicial-calender",
  components: {
    'calender': calender,
    'EventList': EventList
  },
  data() {
    return {
      currentDay: 1,
      currentWeek: 1,
      pickedDay: new Date()
    };
  },
  created() {
    this.initData(null);
  },
  methods: {
    initData: function(date0) {
      var date = null;
      if(!date0) {
        date = new Date();
      }else {
        date = date0;
      }
      this.currentDay = date.getDate();
      this.currentWeek = date.getDay(); // 1...6,0
      switch(this.currentWeek) {
      case 0:
        this.currentWeek = '星期日'
        break;
      case 1:
        this.currentWeek = '星期一'
        break;
      case 2:
        this.currentWeek = '星期二'
        break;
      case 3:
        this.currentWeek = '星期三'
        break;
      case 4:
        this.currentWeek = '星期四'
        break;
      case 5:
        this.currentWeek = '星期五'
        break;
      case 6:
        this.currentWeek = '星期六'
        break;
      default:
        this.currentWeek = '无'
      }
    },
    pickButton() {
      //alert("我是一个消息框！");
    },
     // 处理选中一天事件
    chooseDay(day) {
      this.initData(day);
      this.pickedDay = day;
    },
    getEventLists(beginDate, endDate) {
      this.$bfw.post('MDgetfinaCalender', ({
        beginDate: beginDate,
        endDate: endDate
      }))
      .then(res => {
        if(this.$CU.isSuccess(res)) {
          this.$store.dispatch('saveEventlists', this.$CU.getResData(res).finaList);
        }else {
          this.$alert(res.code, '日历有错误', {
            confirmButtonText: '确定'
          })
        }
      })
      .catch(err => {
        err
      })
    }
  },
  watch: {
    days: function(newdays) {
      this.getEventLists(
        formatDate2(_.first(newdays)),
        formatDate2(_.last(newdays))
      )
    }
  },
  computed: {
    today() {
      return new Date()
    },
    // 所有可见的日期列表
    days() {
      return this.$store.state.eventlists.visableDays
    }
  }
}
</script>

<style>
.finicial-calender{
  padding-bottom: 20px;
}
/*.finicial-calender-text{
  font-size: 16px;
}*/
.fini-calender-body{
  width: 100%;
  height: 100%;
}
.adv-msg{
  line-height: inherit;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 16px;
  padding-right: 16px;
  color: #bc2c3e;
  line-height: 20px;
}
.daylyNews{
  color: black;
  cursor: pointer;
}
.button{
  display: inline-block;
  float: right;
  cursor: pointer;
  color: #bc2c3e;
}
.finicial-calender-wekanddate{
  line-height: inherit;
  display: flex;
  align-items: center;
  justify-content:space-between;
  padding-left: 16px;
  padding-right: 16px;
  line-height: 40px;
}
.finicial-calender-wekanddate li{
  list-style-type: none;
}
.fini-cal-eventlist{
  align-items: center;
  min-height: 200px;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #dadada;
  justify-content: center;
}
</style>
