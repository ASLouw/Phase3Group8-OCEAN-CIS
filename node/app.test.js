const expect = require('expect');
const request = require('supertest');

const  {app}  = require('./app');

/*describe('POST /clientID', ()=> {
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
*/
describe('POST /email', ()=> {
    it('should get success flag true',(done) =>{
        request(app)
            .post('email/5')
            .expect(200)
            .expect((res)=>{
                expect(res.body).toBe('{"email": "baba@mail"}');
            })
            .end(done);
    })

})


//console.log(res);