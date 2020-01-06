/**
 * formatDate - 返回 类似 2016-01-02 格式的字符串
 *
 * @param  {type} year  description
 * @param  {type} month description
 * @param  {type} day   description
 * @return {type}       description
 */
export function formatDate(year, month, day) {
  var y = year;
  var m = month;
  if(m < 10) {
    m = "0" + m;
  }
  var d = day;
  if(d < 10) {
    d = "0" + d;
  }
  return y + "-" + m + "-" + d;
}

export function formatDate2(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  if(m < 10) {
    m = "0" + m;
  }
  var d = date.getDate();
  if(d < 10) {
    d = "0" + d;
  }
  return y + "-" + m + "-" + d;
}
