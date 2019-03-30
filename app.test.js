const expect = require('expect');
const request = require('supertest');

const  {app}  = require('./app');

//won't create user
describe('POST /createUser', ()=> {
    it('should get success flag true with text: Systems notified of client added',(done) =>{        
        request(app)
            .post('/createUser')
            .send({"system":"CIS","client_id":"1"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toEqual("Systems notified of client added");                
            })
            .end(done);
    }).timeout(5000)

    it('should get success flag true with text: access denied: specified system does not have access to this request',(done) =>{
        request(app)
            .post('/createUser')
            .send({"system":"NS","client_id":"1"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toEqual("access denied: specified system does not have access to this request");                
            })
            .end(done);
    }).timeout(5000)

    it('should get success flag true with text: access denied: access denied: system undefined',(done) =>{
        request(app)
            .post('/createUser')
            .send({"client_id":"1"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toEqual("access denied: system undefined");                
            })
            .end(done);
    }).timeout(5000)
})

//won't reactivate user
describe('POST /reactivate', ()=> {
    it('should get success flag true with text: Systems notified of re-activation',(done) =>{
        request(app)
            .post('/reactivate')
            .send({"system":"CIS","client_id":"1"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toEqual("Systems notified of re-activation");                
            })
            .end(done);
    }).timeout(5000)

    it('should get success flag true with text: Client already active',(done) =>{
        request(app)
            .post('/reactivate')
            .send({"system":"CIS","client_id":"61"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toEqual("Client already active");                
            })
            .end(done);
    }).timeout(5000)

    it('should get success flag true with text: access denied: specified system does not have access to this request',(done) =>{
        request(app)
            .post('/reactivate')
            .send({"system":"NS","client_id":"1"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toEqual("access denied: specified system does not have access to this request");                
            })
            .end(done);
    }).timeout(5000)

    it('should get success flag true with text: access denied: access denied: system undefined',(done) =>{
        request(app)
            .post('/reactivate')
            .send({"client_id":"1"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toEqual("access denied: system undefined");                
            })
            .end(done);
    }).timeout(5000)
})

describe('POST /email', ()=> {
    it('should get success flag true with text: {"email":"john@mail.com"}',(done) =>{
        request(app)
            .post('/email')
            .send({"system":"NS","client_id":"1"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toBe("{\"email\":\"john@mail.com\"}");                
            })
            .end(done);
    }).timeout(5000)

    it('should get success flag true with text: cleint does not exist',(done) =>{
        request(app)
            .post('/email')
            .send({"system":"NS","client_id":"10"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toEqual("cleint does not exist");                
            })
            .end(done);
    }).timeout(5000)

    it('should get success flag true with text: access denied: system undefined',(done) =>{
        request(app)
            .post('/email')
            .send({"client_id":"10"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toEqual("access denied: system undefined");                
            })
            .end(done);
    }).timeout(5000)

    it('should get success flag true with text: access denied: specified system does not have access to this request',(done) =>{
        request(app)
            .post('/email')
            .send({"system":"CIS","client_id":"10"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toEqual("access denied: specified system does not have access to this request");                
            })
            .end(done);
    }).timeout(5000)
})

describe('POST /clientID', ()=> {
    it('should get success flag true with body: false',(done) =>{
        request(app)
            .post('/clientID')
            .send({"system":"CAS","client_id":"1"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toEqual("false");                
            })
            .end(done);
    }).timeout(5000)

    it('should get success flag true with body: true',(done) =>{
        request(app)
            .post('/clientID')
            .send({"system":"CAS","client_id":"61"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toEqual("true");                
            })
            .end(done);
    }).timeout(5000)

    it('should get success flag true with body: cleint does not exist',(done) =>{
        request(app)
            .post('/clientID')
            .send({"system":"CAS","client_id":"10"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toEqual("cleint does not exist");                
            })
            .end(done);
    }).timeout(5000)

    it('should get success flag true with text: access denied: specified system does not have access to this request',(done) =>{
        request(app)
            .post('/clientID')
            .send({"system":"CIS","client_id":"1"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toEqual("access denied: specified system does not have access to this request");                
            })
            .end(done);
    }).timeout(5000)

    it('should get success flag true with text: access denied: system undefined',(done) =>{
        request(app)
            .post('/clientID')
            .send({"client_id":"1"})
            .expect(200)
            .expect((res)=>{
                expect(res.text).toEqual("access denied: system undefined");                
            })
            .end(done);
    }).timeout(5000)
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
