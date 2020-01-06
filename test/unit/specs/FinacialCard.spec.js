import { createTest, destroyVM } from '../util';
import FinancialCard from '@/components/FinancialCard'

describe('FinancialCard.vue', () => {
  let vm = null;
  afterEach(() => {
    destroyVM(vm);
  });
  it('productName', () => {
    vm = createTest(FinancialCard, {
      productName: '1231212'
    });
    //console.log(vm.$el);
    //console.log(vm.$el.querySelector('.boc-card__img').to.property('textContent').to.include('1231212'));
    expect(vm.$el.querySelector('.boc-card__img')).to.property('textContent').to.include('1231212');
  });

  it('rate', () => {
    vm = createTest(FinancialCard, {
      rate: '10.3'
    });
    //console.log(vm.$el);
    //console.log(vm.$el.querySelector('.boc-card__img').to.property('textContent').to.include('1231212'));
    expect(vm.$el.querySelector('.boc-card__rate')).to.property('textContent').to.include('10.3');
  });

  it('financialdate', () => {
    vm = createTest(FinancialCard, {
      financialdate: '无'
    });
    //console.log(vm.$el);
    //console.log(vm.$el.querySelector('.boc-card__img').to.property('textContent').to.include('1231212'));
    expect(vm.$el.querySelector('.boc-card__date')).to.property('textContent').to.include('无');
  });

  it('financialamount', () => {
    vm = createTest(FinancialCard, {
      financialamount: '20'
    });
    //console.log(vm.$el);
    //console.log(vm.$el.querySelector('.boc-card__img').to.property('textContent').to.include('1231212'));
    expect(vm.$el.querySelector('.boc-card__amout')).to.property('textContent').to.include('20');
  });

})
