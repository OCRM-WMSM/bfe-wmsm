import { createTest, destroyVM } from '../util';
import ExchangeQuotationCard from '@/components/ExchangeQuotationCard'

describe('ExchangeQuotationCard.vue', () => {
  let vm = null;
  afterEach(() => {
    destroyVM(vm);
  });
  it('currency', () => {
    vm = createTest(ExchangeQuotationCard, {
      currency: '美元'
    });
    expect(vm.$el.querySelector('.exchange-quotation__detailleft')).to.property('textContent').to.include('美元');
  });

  it('buyamount', () => {
    vm = createTest(ExchangeQuotationCard, {
      buyamount: '101.3'
    });
    expect(vm.$el.querySelector('.exchange-quotation__detailmiddle')).to.property('textContent').to.include('101.3');
  });

  it('saleamount', () => {
    vm = createTest(ExchangeQuotationCard, {
      saleamount: '111.3'
    });
    expect(vm.$el.querySelector('.exchange-quotation__detailright')).to.property('textContent').to.include('111.3');
  });

})
