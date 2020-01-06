<template>
  <div id = "calender">
    <!-- 年份月份 -->
    <div class = "month">
      <ul>
        <li style="color: #ba2a3e" class="arrow"@click="pickPre(currentYear,currentMonth)"><</li>
        <li calss="year-month" @click="pickYear(currentYear,currentMonth)">
          <span class="choose-year">{{currentYear}}年</span>
          <span class="choose-month">{{currentMonth}}月</span>
        </li>
        <li style="color: #ba2a3e" class="arrow"@click="pickNext(currentYear,currentMonth)">></li>
      </ul>
    </div>
    <ul class="weekdays">
    <li>一</li>
    <li>二</li>
    <li>三</li>
    <li>四</li>
    <li>五</li>
    <li>六</li>
    <li>日</li>
    </ul>
    <ul class="days">
    <li @click="pick(day)" v-for="day in days" :class="getDayClass(day)">
      <div class="triangle"></div>
      <!--今天-->
      <span v-if="day.getMonth()+1 != currentMonth"class="other-month text-center">
        {{ day.getDate() }}
      </span>
      <span v-else class="text-center">
        {{ day.getDate() }}
      </span>
    </li>
  </ul>
  </div>
</template>

<script>
import _ from 'lodash'
import { formatDate, formatDate2 } from './tools'
export default {
  name: 'calender',
  data() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      chooseDay: "1970-01-01",
      today: "1970-01-01",
      borderchooseday: false,
      dateBorders: []
    };
  },
  created: function() {
    this.initData();
  },
  methods: {
    initData: function(cur) {
      var date = null;
      if (cur) {
        date = new Date(cur);
      } else {
        //初始化时获取当前日期所在月份的第一天
        date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        this.pick(new Date())
      }

      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
      this.currentWeek = date.getDay(); // 1...6,0
      if (this.currentWeek === 0) {
        this.currentWeek = 7;
      }
      var str = formatDate(this.currentYear, this.currentMonth, this.currentDay);
      var visableDays = []
      // 今天是周日，放在第一行第7个位置，前面6个
      for (var i = this.currentWeek - 1; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        visableDays.push(d);
        this.dateBorders.push("false");
      }
      for (var j = 1; j <= 42 - this.currentWeek; j++) {
        var d2 = new Date(str);
        d2.setDate(d2.getDate() + j);
        visableDays.push(d2);
        this.dateBorders.push("false");
      }
      this.$store.dispatch('saveVisableDays', visableDays)
    },

    pick(date) {
      this.chooseDay = formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
      this.$emit('pickDay', date);
    },

    /**
     * pickPre - 上一个月
     *
     * @param  {type} year  description
     * @param  {type} month description
     * @return {type}       description
     */
    pickPre(year, month) {
     // setDate(0); 上月最后一天
     // setDate(-1); 上月倒数第二天
     // setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(formatDate(year, month, 1));
      d.setDate(0);
      this.initData(formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },

    /**
     * pickNext - 下一个月
     *
     * @param  {type} year  description
     * @param  {type} month description
     * @return {type}       description
     */
    pickNext(year, month) {
      var d = new Date(formatDate(year, month, 1));
      d.setDate(35);
      this.initData(formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },

    /**
     * pickYear - 选择年
     *
     * @param  {type} year  description
     * @param  {type} month description
     * @return {type}       description
     */
    pickYear(year, month) {
      year
      month
      // alert(year + "," + month);
    },

    getDayClass(day) {
      var cls = '';
      // 包含事件的日期
      if(_.indexOf(this.eventdays, formatDate2(day)) >= 0) {
        cls += 'calender__eventDay '
      }
      // 日期是今天
      if(formatDate2(day) === formatDate2(new Date())) {
        cls += 'calender__today '
      }

      // 日期被选中
      if(formatDate2(day) === this.chooseDay) {
        cls += 'calender__chooseDay'
      }
      return cls
    }
  },
  computed: {
    // 包含事件的日期列表
    eventdays() {
      var events = [];
      this.$store.state.eventlists.events.forEach(data => {
        events.push(data.tipDate)
      })
      return events
    },
    aMonthAfterToday() {
      return formatDate(new Date().getFullYear(), new Date().getMonth() + 2, new Date().getDate())
    },
    // 所有可见的日期列表
    days() {
      return this.$store.state.eventlists.visableDays
    }
  }
}
</script>

<style scoped>

ul {
list-style-type: none;
}

.month {
width: 100%;
}

.month ul {
margin: 0;
padding: 0;
display: flex;
justify-content: space-between;
}

.year-month {
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
}

.year-month:hover {
background: rgba(150, 2, 12, 0.1);
}


.choose-year {
  text-align: center;
  font-size: 14px;
  line-height: center;
  color: #ba2a3e;
}

.choose-month {
text-align: center;
font-size: 14px;
  line-height: center;
  color: #ba2a3e;
}

.arrow {
color: #ba2a3e;
cursor: pointer;
user-select: none;
}

.arrow:hover {
background: rgba(100, 2, 12, 0.1);
}

.month ul li {
text-transform: uppercase;
letter-spacing: 3px;
}

.weekdays {
margin: 0;
padding: 10px 0;
display: flex;
flex-wrap: wrap;
justify-content: space-around;
}

.weekdays li {
display: inline-block;
width: 13.6%;
text-align: center;
}

.days {
padding: 0;
margin: 0;
display: flex;
flex-wrap: wrap;
justify-content: space-around;
border-top: 1px solid #dadada;
border-bottom: 1px solid #dadada;
}

.days li {
list-style-type: none;
display: inline-block;
width: 14.2%;
height: 33px;
border: 1px solid #dadada;
cursor: pointer;
}

.days li .other-month {
color: gainsboro;
}

.days li:hover {
  background: #e1e1e1;
}

.days li span {
  margin-top: 5px;
  display: block;
}

.calender__today{
  color: #ffffff;
  background-color: #be2e3e;
}
.days .calender__today:hover {
  color: #ffffff;
  background-color: #be2e3e;
}

.calender__chooseDay{
  border: 2px solid #be2e3e !important;
}

.calender__eventDay .triangle {
  position:absolute;
  width: 0px;
  height: 0px;
  border-top: 10px solid #be2e3e;
  border-right: 10px solid transparent;
}
</style>
