const lib = require('../lib')
const db = require('../db')
const mail = require('../mail')
    // Too general
    // expect(result).toBeDefined()
    // expect(result).not.toBeNull()
    // Too Specific
    // expect(result[0]).toBe('USD')
    // expect(result[1]).toBe('AUD')
    // expect(result[2]).toBe('INR')
    // expect(result.length).toBe(3)
    // proper way
    // expect(result).toContain('INR')

// Testing Numbers
describe("absolute", ()=>{
    it("should return a positive number if input is positive", ()=> {
        const result = lib.absolute(1)
        expect(result).toBe(1)
    })
    it("should return a positive number if input is negative", ()=> {
        const result = lib.absolute(-1)
        expect(result).toBe(1)
    })
    it("should return 0 if input is not positive and negative", ()=> {
        const result = lib.absolute(0)
        expect(result).toBe(0)
    })
})

// Testing Strings
describe('greet', ()=> {
    it('should return the greeting message', ()=> {
        const result = lib.greet("mosh")
        expect(result).toMatch(/mosh/)
        // expect(result).toContain(/Mosh/)
    })
})

// Testing Arrays
describe('getCurrencies', ()=> {
    it('should return supported currencies', ()=> {
        const result = lib.getCurrencies()
        expect(result).toEqual(expect.arrayContaining(['INR', 'USD']))
    })
})

// Testing Objects
describe('getProducts', ()=> {
    it('should return product with the given id', ()=> {
        const result = lib.getProduct(1)
        // expect(result).toEqual({id: 1, price: 10})
        expect(result).toMatchObject({id: 1, price: 10})
        expect(result).toHaveProperty('id', 1)
    })
})

// Testing Exception
describe('registerUser', ()=> {
    it('should throw if username is falsy', ()=> {
        // null, undefined, NaN, '', 0,  false
        // At the time of code practice, parameterized test are not supported by jest :(
        // Alternate approach can be
        const args = [ null, undefined, NaN, '', 0,  false ]
        args.forEach(el =>{
            expect(()=> { lib.registerUser(el) }).toThrow()
        })
    })
    it('should return a user object if valid username is passed', ()=> {
        const result = lib.registerUser('mosh')
        expect(result).toMatchObject({ username: 'mosh' })
    })
})

// Mock functions
describe('applyDiscount', ()=> {
    it('should apply 10% discount if customer has more than 10 points', ()=> {
        db.getCustomerSync = (customerId)=> {
            console.log('Fake reading a customer...');
            return { id: customerId, points: 20 }
        }
        const order = { customerId: 1, totalPrice: 10 }
        lib.applyDiscount(order)
        expect(order.totalPrice).toBe(9)
    })
})

// Mock functions
describe('notifyCustomer', ()=> {
    it('should send an email to the customer', ()=> { //async 
        // jest in-built mock function
        // const mockFunc = jest.fn()
        // mockFunc.mockReturnValue(1)
        // const result = mockFunc()

        // also has promise based results
        // mockFunc.mockResolvedValue(1)
        // mockFunc.mockRejectedValue(new Error('...'))
        // const result = await mockFunc() // should be in try catch block
        
        // re-write using jest.fn() of below mock functions
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' })
        mail.send = jest.fn()
        // Interaction of one object to other object
        // db.getCustomerSync = (customerId)=> {
        //     console.log('Fake reading a customer...');
        //     return { email: 'a' }
        // }
        // let mailSent = false
        // mail.send = (email, message)=> {
        //     mailSent = true
        // }

        lib.notifyCustomer({ customerId: 1 })

        expect(mail.send).toHaveBeenCalled()
        // expect(mail.send).toHaveBeenCalledWith('a', '...')
        // expect(mail.send.mock.calls[0][0]).toBe('a')
        // expect(mail.send.mock.calls[0][1]).toMatch(/order/)
        // expect(mailSent).toBe(true)
    })
})


// next to see on integration testing
// why integration testing (External dependencies)
// for real http request (req, res, next)={} we have to create lots of jest.fn()...
// code will become fat... and for this to resolve `integration testing` come to rescue :)