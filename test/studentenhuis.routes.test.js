const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const assert = require('assert')

chai.should();
chai.use(chaiHttp);

describe('Studentenhuis API POST', () => {

    before(function(){
        global.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjczNDU4NjksImlhdCI6MTUyNjQ4MTg2OSwic3ViIjoianNtaXRAc2VydmVyLm5sIn0.VrP4kg3zkCkvtm8NwxwQeXlnd2gXARQ4TA_y0wQ8SWk";
    });

    it("should throw an error when using invalid JWT token", (done) => {
        let token = 'sjhgkjhdfkj65jsuusu43hkk8gkhghgsdjfkhgu4s73k7s3hsgjshfjvsncmbdft';

        chai.request(app)
            .post('/api/studentenhuis')
            .set('X-Auth-Token', token)
            .end( (err, res) => {
                res.should.have.status(401);
            });

        done();
    });

    it('should return a studentenhuis when posting a valid object', (done) => {
        let studentenhuis = {
            naam: 'Het huis van Developers',
            adres: 'Schoutstraat 10a Gorinchem'
        };

        chai.request(app)
            .post('/api/studentenhuis')
            .set('X-Auth-Token', global.token)
            .send(studentenhuis)
            .end( (err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('ID');
                res.body.should.have.property('Naam');
                res.body.should.have.property('Adres');
                res.body.should.have.property('UserID');
            });

        done();
    });

    it('should throw an error when naam is missing', (done) => {
        let studentenhuis = {
            adres: 'Schoutstraat 10a Gorinchem'
        };

        chai.request(app)
            .post('/api/studentenhuis')
            .set('X-Auth-Token', global.token)
            .send(studentenhuis)
            .end( (err, res) => {
                res.should.have.status(412);
            });

        done();
    });

    it('should throw an error when adres is missing', (done) => {
        let studentenhuis = {
            naam: 'Het huis van Developers'
        };

        chai.request(app)
            .post('/api/studentenhuis')
            .set('X-Auth-Token', global.token)
            .send(studentenhuis)
            .end( (err, res) => {
                res.should.have.status(412);
            });

        done();
    });
});

describe('Studentenhuis API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        let token = 'sjhgkjhdfkj65jsuusu43hkk8gkhghgsdjfkhgu4s73k7s3hsgjshfjvsncmbdft';

        chai.request(app)
            .get("/api/studentenhuis")
            .set("X-Auth-Token", token)
            .end( (err, res) => {
                res.should.have.status(401);
            });

        done();
    });

    it('should return all studentenhuizen when using a valid token', (done) => {
        chai.request(app)
            .get('/api/studentenhuis')
            .set('X-Auth-Token', global.token)
            .end( (err, res) => {
                res.body.should.be.a('array');
            });

        done();
    });
});

describe('Studentenhuis API GET one', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        let token = 'sjhgkjhdfkj65jsuusu43hkk8gkhghgsdjfkhgu4s73k7s3hsgjshfjvsncmbdft';

        chai.request(app)
            .get("/api/studentenhuis/1")
            .set("X-Auth-Token", token)
            .end( (err, res) => {
                res.should.have.status(401);
            });

        done();
    });

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        chai.request(app)
            .get('/api/studentenhuis/1')
            .set('X-Auth-Token', global.token)
            .end( (err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
            });


        done();
    });

    it('should return an error when using an non-existing huisId', (done) => {
        chai.request(app)
            .get('/api/studentenhuis/999')
            .send(studentenhuis)
            .set('X-Auth-Token', global.token)
            .end( (err, res) => {
                res.should.have.status(412)
            });

        done();
    });
});

describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        let token = 'sjhgkjhdfkj65jsuusu43hkk8gkhghgsdjfkhgu4s73k7s3hsgjshfjvsncmbdft';

        chai.request(app)
            .put('/api/studentenhuis/1')
            .set('X-Auth-Token', token)
            .end( (err, res) => {
                res.should.have.status(401);
            });

        done();
    });

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        let studentenhuis = {
            naam: 'Het huis van Developers',
            adres: 'Schoutstraat 10a Gorinchem'
        };

        chai.request(app)
            .put('/api/studentenhuis/7')
            .send(studentenhuis)
            .set('X-Auth-Token', global.token)
            .end( (err, res) =>{
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('ID');
            });

        done();
    });

    it('should throw an error when naam is missing', (done) => {
        let studentenhuis = {
            adres: 'Schoutstraat 10a Gorinchem'
        };

        chai.request(app)
            .put('/api/studentenhuis/7')
            .send(studentenhuis)
            .set('X-Auth-Token', global.token)
            .end( (err, res) => {
                res.should.have.status(412)
            });

        done();
    });

    it('should throw an error when adres is missing', (done) => {
        let studentenhuis = {
            naam: 'Het huis van Developers'
        };

        chai.request(app)
            .put('/api/studentenhuis/7')
            .send(studentenhuis)
            .set('X-Auth-Token', global.token)
            .end( (err, res) => {
                res.should.have.status(412)
            });

        done();
    });
});

describe('Studentenhuis API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        let token = 'sjhgkjhdfkj65jsuusu43hkk8gkhghgsdjfkhgu4s73k7s3hsgjshfjvsncmbdft';

        chai.request(app)
            .delete('/api/studentenhuis/1')
            .set('X-Auth-Token', token)
            .end( (err, res) => {
                res.should.have.status(401);
            });

        done();
    });

    it('should return a studentenhuis when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it('should throw an error when naam is missing', (done) => {
        let studentenhuis = {
            adres: 'Schoutstraat 10a'
        };

        chai.request(app)
            .delete('/api/studentenhuis/7')
            .send(studentenhuis)
            .set('X-Auth-Token', global.token)
            .end( (err, res) => {
                res.should.have.status(412)
            });

        done();
    });

    it('should throw an error when adres is missing', (done) => {
        let studentenhuis = {
            naam: 'Het huis van Developers'
        };

        chai.request(app)
            .delete('/api/studentenhuis/7')
            .send(studentenhuis)
            .set('X-Auth-Token', global.token)
            .end( (err, res) => {
                res.should.have.status(412)
            });

        done();
    });
});
