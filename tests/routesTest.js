import { expect } from 'chai';
import request  from 'supertest';
import app from '../src/app.js';

describe('Route: GET /files/data', function () {
    it('GET should return complete info, an Array:', async function () {
        const response = await request(app)
                .get('/files/data')
        expect('Content-Type', /json/)
        expect(response.status).to.eql(200)
        expect(response.body).to.be.an('array')
    });
    it('GET should position [0] Array files names:', async function () {
        const response = await request(app)
                .get('/files/data')
        expect('Content-Type', /json/)
        expect(response.status).to.eql(200)
        expect(response.body[0].names).to.be.an('array')
    });  
    it('GET correct files Schema:', async function () {
        const response = await request(app)
                .get('/files/data')
        expect('Content-Type', /json/)
        expect(response.status).to.eql(200)
        response.body.slice(1, response.body.length).map((file) => {
            expect(file).to.have.property('file');
            expect(file).to.have.property('lines');
            expect(file.lines).to.be.an('array')
            expect(file.lines[0]).to.have.property('text');
            expect(file.lines[0]).to.have.property('number');
            expect(file.lines[0]).to.have.property('hex');
        })
    });   
});

describe('Route Query: GET /files/data?file=....', function () {

    it('GET Query should return complete info, an Array:', async function () {
        const response = await request(app)
                .get('/files/data')
                .query({
                    file: 'test3.csv'
                 })
        expect('Content-Type', /json/)
        expect(response.status).to.eql(200)
        expect(response.body).to.be.an('array')
    });
    it('GET Query should position [0] Array files names:', async function () {
        const response = await request(app)
                .get('/files/data')
                .query({
                    file: 'test3.csv'
                 })
        expect('Content-Type', /json/)
        expect(response.status).to.eql(200)
        expect(response.body[0].names).to.be.an('array')
    });  
    it('GET Query correct files Schema:', async function () {
        const response = await request(app)
                .get('/files/data')
                .query({
                    file: 'test3.csv'
                 })
        expect('Content-Type', /json/)
        expect(response.status).to.eql(200)
        response.body.slice(1, response.body.length).map((file) => {
            expect(file).to.have.property('file');
            expect(file).to.have.property('lines');
            expect(file.lines).to.be.an('array')
            expect(file.lines[0]).to.have.property('text');
            expect(file.lines[0]).to.have.property('number');
            expect(file.lines[0]).to.have.property('hex');
        })
    });   
    it('GET Query correct filter by query:', async function () {
        const response = await request(app)
                .get('/files/data')
                .query({
                    file: 'test3.csv'
                 })
        expect('Content-Type', /json/)
        expect(response.status).to.eql(200)
        response.body.slice(1, response.body.length).map((file) => {
            expect(file).to.have.property('file');
            expect(file.file).to.be.eql('test3.csv');
        })
    });   
});

describe('Route Original Info: GET /files/list', function () {

    it('GET Original info, an Array:', async function () {
        const response = await request(app)
                .get('/files/list')
        expect('Content-Type', /json/)
        expect(response.status).to.eql(200)
        expect(response.body).to.be.an('array')
    });
    it('GET Original info, should be a string:', async function () {
        const response = await request(app)
                .get('/files/list')
        expect('Content-Type', /json/)
        expect(response.status).to.eql(200)
        response.body.map((file) => {
            expect(file).to.be.an('string');
        })
    });
});