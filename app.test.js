const expect = require('expect');
const request = require('supertest');

const  {app}  = require('./app');

describe('POST /clientID', ()=> {
    it('should get success flag true',(done) =>{
        request(app)
            .post('/clientID/1')
            .expect(200)
            .expect((res)=>{
                expect(res.body).toBe(false);
            })
            .end(done);
    })

    it('should get success flag true',(done) =>{
        request(app)
            .post('/clientID/1')
            .expect(200)
            .expect((res)=>{
                expect(res.body).toBe(true);
            })
            .end(done);
    })

})

describe('POST /email', ()=> {
    it('should get success flag true',(done) =>{
        request(app)
            .post('/email/21')
            .expect(200)
            .expect((res)=>{
                expect(res.body).toEqual({"email": "mi.carrim@yahoo.com"});
            })
            .end(done);
    })
})

describe('POST /logs', ()=> {
    it('should get success flag true',(done) =>{
        request(app)
            .post('/logs/21&2019-03-15 10:22:43&2019-03-15 10:22:43')
            .expect(200)
            .expect((res)=>{
                expect(res.body).toEqual({
                    "logs": [
                        {
                            "transaction_id": 2,
                            "client_id": 21,
                            "value_changed": "home_address",
                            "old_value": "347",
                            "new_value": "349 Van der Wall street, Erasmia",
                            "timestamp": "2019-03-15T08:22:43.000Z"
                        }
                    ]
                });
            })
            .end(done);
    })

})

describe('POST /subscribe', ()=> {
    it('should get success flag true',(done) =>{
        request(app)
            .post('/subscribe')
            .expect(200)
            .expect((res)=>{
                expect(res.text).toBe("subscribed!");
            })
            .end(done);
    })
})


//console.log(res);