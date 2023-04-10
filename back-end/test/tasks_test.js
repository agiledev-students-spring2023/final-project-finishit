/* eslint-disable no-unused-expressions */
const { describe, it } = require('mocha')
const chai = require('chai')
const { expect, assert } = require('chai')
const chaiHttp = require('chai-http')
const express = require('express')
const { app } = require('../app')

const tasksRouter = require('../routes/tasks')

chai.use(chaiHttp)

describe('/tasks route', () => {
    it('should be an instance of express Router', done => {
        assert(Object.getPrototypeOf(tasksRouter.tasksRouter) === express.Router, 'tasksRouter should be an instance of express Router')
        done()
    })

    it('should return an array of tasks', done => {
        chai.request(app)
            .get('/tasks')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.tasks).to.be.an('array')
                done()
            })
    })

    it('should throw an error if something goes wrong', done => {
        tasksRouter.setError(true)
        chai.request(app).get('/tasks').end((err, res) => {
            // console.log(res)
            expect(res.error).to.be.instanceOf(Error)
            expect(res).to.be.json
            expect(res).to.have.status(500)
            done()
        })
    })
})
