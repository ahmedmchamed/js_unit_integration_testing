const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { element, browser } = require('protractor');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('calculator functionality', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:3000');
  });

  // write integration tests here in the form of "it should do something..."
  it('should have working number buttons', function(){
    running_total = element(by.css('#running_total'))
    element(by.css('#number2')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('2')
  })

  it('should update the runningTotal for a single arithmetic operation', function () {
    running_total = element(by.css('#running_total'));
    element(by.css('#number9')).click();
    element(by.css('#operator_multiply')).click();
    element(by.css('#number5')).click();
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('45')
  })

  it('should chain numbers and an operator to perform a calculation', function () {
    running_total = element(by.css('#running_total'));
    element(by.css('#number9')).click();
    element(by.css('#operator_multiply')).click();
    element(by.css('#number5')).click();
    element(by.css('#operator_equals')).click();
    //get a number for first calc
    element(by.css('#operator_divide')).click();
    element(by.css('#number2')).click();
    //perform another calcuation based on last one
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('22.5')
  })

  it('should display positive, negative, decimals and large values in the input field', function () {
    running_total = element(by.css('#running_total'));
    //display positive value and clear
    element(by.css('#operator_add')).click();
    element(by.css('#number1')).click();
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('1');
    element(by.css('#clear')).click();
    //display negative value
    element(by.css('#number1')).click();
    element(by.css('#operator_subtract')).click();
    element(by.css('#number2')).click();
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('-1');
    element(by.css('#clear')).click();
    //display decimal value
    element(by.css('#number1')).click();
    element(by.css('#operator_divide')).click();
    element(by.css('#number2')).click();
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('0.5');
    element(by.css('#clear')).click();
    //display large value using a for loop
    element(by.css('#number1')).click();
    for (let i = 0; i < 8; i++) {
      element(by.css('#number0')).click();
    }
    element(by.css('#operator_multiply')).click();
    element(by.css('#number2')).click();
    element(by.css('#operator_equals')).click();
    expect(running_total.getAttribute('value')).to.eventually.equal('200000000');
    element(by.css('#clear')).click();
  })

  it('should alert the user of a division by zero exception', function () {
    //unmodified, the calculator displays an error of 'infinity'
    //in protractor.
    //I would like it to alert the user that they cannot divide 
    //by zero
    running_total = element(by.css('#running_total'));
    element(by.css('#number1')).click();
    element(by.css('#operator_divide')).click();
    element(by.css('#number0')).click();
    element(by.css('#operator_equals')).click();
    browser.switchTo().alert().then(
      function(browserAlert) {
        browserAlert.accept(); 
        expect(running_total.getAttribute('value')).to.eventually.equal('Division by zero not possible');
      }
    );
  })
});
