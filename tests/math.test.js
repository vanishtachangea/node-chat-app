const math  = require('../src/math')
test ('Should calculate Total with Tip',()=>{
    const total = math.calculateTip(12,0.5);
    expect(total).toBe(18);
    //if(total !== 18)
     //   throw new Error('Total should be 18')
})
test('Should calculate total with default tip',()=>{
    const total = math.calculateTip(10);
    expect(total).toBe(12.5)
})