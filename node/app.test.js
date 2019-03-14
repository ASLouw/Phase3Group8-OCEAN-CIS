const expect = require('expect');
const request = require('supertest');

const  {app}  = require('./app');

describe('POST /clientID', ()=> {
    it('should get success flag true',(done) =>{
        request(app)
            .post('/clientID/5')
            .expect(200)
            .expect((res)=>{
                expect(res.body).toBe(false);
            })
            .end(done);
    })

    it('should get success flag true',(done) =>{
        request(app)
            .post('/clientID/4')
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
            .post('/email/5')
            .expect(200)
            .expect((res)=>{
                expect(res.body).toEqual({"email": "baba@mail"});
            })
            .end(done);
    })
})

describe('POST /logs', ()=> {
    it('should get success flag true',(done) =>{
        request(app)
            .post('/logs/1&2019-03-13 22:51:56&2019-03-21 22:51:56')
            .expect(200)
            .expect((res)=>{
                expect(res.body).toEqual({
                    "logs": [
                        {
                            "transaction_id": 1,
                            "client_id": 1,
                            "value_changed": "5",
                            "old_value": "100",
                            "new_value": "95",
                            "timestamp": "2019-03-14T15:38:21.000Z"
                        },
                        {
                            "transaction_id": 4,
                            "client_id": 1,
                            "value_changed": "10",
                            "old_value": "50",
                            "new_value": "40",
                            "timestamp": "2019-03-20T15:38:59.000Z"
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
            .expect((res)=>{console.log(res);
                expect(res.text).toBe("subscribed!");
            })
            .end(done);
    })
})


//console.log(res);