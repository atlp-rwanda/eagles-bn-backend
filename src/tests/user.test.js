import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import bcrypt from 'bcrypt'
import { User as _user } from "../database/models/index"

chai.use(chaiHttp);
var expect=chai.expect;
var request=chai.request;

describe("USER SIGNUP TESTS",()=>{
      beforeEach((done)=>{
        _user.destroy({
            where: {},
            truncate: true
          });

            _user.create({
            first_name:"Solange",
            last_name:"Iyubu",
            email: "s@ymail.com",
            password: "solasola"
          })
          done()

    });

    describe("POST/signup",()=>{
        it("it should signUp a user", done=>{
             request(app).post('/api/signup')
             .send({
                first_name: "Gahozo",
                last_name : "Ntwari",
                email: "sinang@gmail.com",
                password: "123456789",
                confirmPassword: "123456789"
             })
             .end((err,res)=>{
                 expect(res.status).to.equal(201)
                 expect(res).to.be.json;
                 done();
             })
        })
    })
 
    describe("POST/signup",()=>{
        it("it should raise email existance error", done=>{
             request(app).post('/api/signup')
             .send({
                first_name: "Gahozo",
                last_name : "Ntwari",
                email: "s@ymail.com",
                password: "123456789",
                confirmPassword: "123456789"
             })
             .end((err,res)=>{
                 console.log(res.body)
                 expect(res.status).to.equal(403)
                 expect(res).to.be.json;
                 expect(res.body).to.be.a('object');
                 done();
             })
        })  
    })


    describe("POST/signup",()=>{
        it("it should raise email format error", done=>{
            request(app).post('/api/signup')
            .send({
               first_name: "Gahozo",
               last_name : "Ntwari",
               email: "sos@ymail",
               password: "123456789",
               confirmPassword: "123456789"
            })
            .end((err,res)=>{
                expect(res.status).to.equal(200)
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property("error",'"email" must be a valid email')
                
                done();
            })
       })
    })

    describe("POST/signup",()=>{
        it("it should first_name validation error", done=>{
            request(app).post('/api/signup')
            .send({
               first_name: "",
               last_name : "Ntwari",
               email: "g@ymail",
               password: "123456789",
               confirmPassword: "123456789"
            })
            .end((err,res)=>{
                expect(res.status).to.equal(200)
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property("error",'"first_name" is not allowed to be empty')
                done();
            })
       })
    })

    describe("POST/signup",()=>{
        it("it should first_name validation error", done=>{
            request(app).post('/api/signup')
            .send({
               first_name: "Gahozo",
               last_name : "",
               email: "g@ymail",
               password: "123456789",
               confirmPassword: "123456789"
            })
            .end((err,res)=>{
                expect(res.status).to.equal(200)
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property("error",'"last_name" is not allowed to be empty')
                done();
            })
       })
    })


   
})