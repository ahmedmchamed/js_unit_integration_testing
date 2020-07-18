var Calculator = require('../../public/js/calculator.js')
var assert = require('assert')

describe('calculator', function () {
  beforeEach(function () {
    calculator = new Calculator()
  });

  // write unit tests here in the form of "it should do something..."
  it('it has a sample test', function(){
    assert.equal(true, true)
  })

  it('should add two numbers together', function () {
    //manually assign the previousTotal
    calculator.previousTotal = 1;
    calculator.add(4);
    assert.strictEqual(5, calculator.runningTotal);
  })

  it('should subtract two numbers', function () {
    calculator.previousTotal = 7;
    calculator.subtract(3);
    assert.strictEqual(4, calculator.runningTotal);
  })

  it('should multiply two numbers', function () {
    calculator.previousTotal = 5;
    calculator.multiply(3);
    assert.strictEqual(15, calculator.runningTotal);
  })

  it('should divide two numbers', function () {
    calculator.previousTotal = 21;
    calculator.divide(7);
    assert.strictEqual(3, calculator.runningTotal);
  })

  it('should register number button clicks', function () {
    //perform operation to test that runningTotal, newTotal
    //get cleared after an operation and a number is clicked
    calculator.add(4);
    calculator.newTotal = true;
    calculator.numberClick(5);
    assert.strictEqual(5, calculator.runningTotal);
  })

  it('should register the operator clicks', function () {
    //check the operators get registered
    calculator.operatorClick('+');
    assert.strictEqual('+', calculator.previousOperator);
    calculator.operatorClick('-');
    assert.strictEqual('-', calculator.previousOperator);
    calculator.operatorClick('*');
    assert.strictEqual('*', calculator.previousOperator);
    calculator.operatorClick('/');
    assert.strictEqual('/', calculator.previousOperator);

    //check that previousOperator gets set to null if '=' 
    //was the last input
    calculator.operatorClick('=');
    assert.strictEqual(null, calculator.previousOperator);
  })

  it('should clear the input field', function () {
    //previousTotal should be preserved even if
    //the input field is cleared
    calculator.previousTotal = 2;
    calculator.add(10); //testing that runningTotal 
    calculator.clearClick();
    assert.strictEqual(2, calculator.previousTotal);
    assert.strictEqual(0, calculator.runningTotal);
  })

});
