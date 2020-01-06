import Mock from 'mockjs'
// import qs from 'qs'

import { user } from './mock.user.js'
// import { account } from './mock.account.js'
import { pie } from './mock.pie.js'
import { piechart } from './mock.piechart.js'
import {carousel} from './mock.carousel.js'
import {financialdata} from './mock.financialcard.js'
import {fundcard} from './mock.fundcard.js'
import {insurancecard} from './mock.insurancecard.js'
//import { todolists } from './mock.todolists.js'
import { financialInfo } from './mock.financialinfo.js'
//import { userlogin } from './mock.userlogin.js'
import { recentTrans } from './mock.recentTrans.js'
import {exchangeQuotation} from './mock.exchangequotation.js'

var bfwMocks = [];
/* istanbul ignore next */
function addToMock(list) {
  list.forEach(n => {
    if (n.method) {
      bfwMocks.push(n)
    }

    if (n.path) {
      Mock.mock(n.path, n.data)
    }
  })
}
addToMock(pie);
addToMock(user);
addToMock(carousel);
// addToMock(account);
addToMock(financialdata);
addToMock(piechart);
addToMock(fundcard);
addToMock(insurancecard);
//addToMock(todolists);
addToMock(financialInfo);
//addToMock(userlogin);
addToMock(recentTrans);
addToMock(exchangeQuotation);
/* istanbul ignore next */
if(bfwMocks.length !== 0) {
  bfwMocks.forEach(n => {
    Mock.mock('/api/_bfwajax.do?method=' + n.method, 'post', function() {
      return n.data;
    })
  })
}
export default Mock;
