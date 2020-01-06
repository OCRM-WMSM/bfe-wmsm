import { createTest, destroyVM } from '../util';
import RecentTrans from '@/components/RecentTrans'

describe('RecentTrans.vue', () => {
  let vm = null;
  afterEach(() => {
    destroyVM(vm);
  });
  it('transactiontype', () => {
    vm = createTest(RecentTrans, {
      transactiontype: '转账汇款'
    });
    expect(vm.$el.querySelector('.recent-trans__detailleft')).to.property('textContent').to.include('转账汇款');
  });

  it('transaction', () => {
    vm = createTest(RecentTrans, {
      transaction: '活期转账2000元'
    });
    expect(vm.$el.querySelector('.recent-trans__detailright')).to.property('textContent').to.include('活期转账2000元');
  });

})
