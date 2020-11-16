process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Test Get Comments API
describe('/GET comments', () => {
    it('it should GET all the comments', (done) => {
        chai.request(server)
            .get('/comment/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
      });
    it('it should GET comment by id', (done) => {
          chai.request(server)
            .get('/comment/7')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('email');
                res.body.should.have.property('comment');
                res.body.should.have.property('id').eql(7);
                done();
            })             
      })
  });

/*
  * Test the /PUT - Create new comment
  */
 describe('/PUT comment', () => {
    it('it should CREATE a new comment', (done) => {
        const comment = {email: "test1@test.com", name: "Test User", comment: "Comment from test file"}
        chai.request(server)
            .put('/comment')
            .send(comment)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql('Comment created successfully');
                done();
        });
    });
    it('it should throw email already exist error', (done) => {
        const comment = {email: "test@test.com", name: "Test User", comment: "Comment from test file"}
        chai.request(server)
            .put('/comment')
            .send(comment)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Email already exists. Please use the diffrent email');
                done();
        });
    });
    it('it should throw invalid email format error', (done) => {
        const comment = {email: "test@test", name: "Test User", comment: "Comment from test file"}
        chai.request(server)
            .put('/comment')
            .send(comment)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Invalid email format');
                done();
        });
    });
});
