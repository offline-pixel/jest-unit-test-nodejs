const exer = require('../exercise1')
// Exercise fizzBuzz
describe('fizzBuzz', ()=> {
    it('should throw an exception if input is not a number', ()=> {
        const args = [ null, undefined, {}, 'a' ]
        args.forEach(el =>{
            expect(()=> { exer.fizzBuzz(el) }).toThrow()
        })
    })
    it('should return FizzBuzz if input is divisible by 3 && 5', ()=> {
        const result = exer.fizzBuzz(15)
        expect(result).toMatch(/FizzBuzz/)
    })
    it('should return Fizz if input is only divisible by 3', ()=> {
        const result = exer.fizzBuzz(3)
        expect(result).toMatch(/Fizz/)
    })
    it('should return Buzz if input is only divisible by 5', ()=> {
        const result = exer.fizzBuzz(10)
        expect(result).toMatch(/Buzz/)
    })
    it('should return input if input is not divisible by 3 or 5', ()=> {
        const result = exer.fizzBuzz(8)
        expect(result).toBe(8)
    })
})