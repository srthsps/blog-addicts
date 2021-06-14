const dummy = require('../utils/for_testing').dummy

test('Content will always be one',()=>{
    expect(dummy([1,2,3,4,5,6])).toBe(1)
})

test('Content will always be one',()=>{
    expect(dummy([5,6,3,4,1,5])).toBe(1)
})

test('Content will always be one',()=>{
    expect(dummy([4,5,6,9,8,7])).toBe(1)
})

test('Content will always be one',()=>{
    expect(dummy([1,2,3,4])).toBe(1)
})