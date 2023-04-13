/* eslint-disable no-unused-expressions */
const { describe, it } = require('mocha')
const chai = require('chai')
// const { expect, assert } = require('chai')
// const chaiHttp = require('chai-http')
const { expect, assert } = require('chai')
const chaiHttp = require('chai-http')
const express = require('express')
const { app } = require('../app')
const editRouter = require('../routes/EditTask')

chai.use(chaiHttp)

describe('editrouter', () => {
    it('should be an instance of express Router', done => {
        assert(Object.getPrototypeOf(editRouter.editrouter) === express.Router, 'newRouter should be an instance of express Router')
        done()
    })

    it('should return a response in json format', done => {
        chai.request(app).get('/badges').end((err, res) => {
            expect(res).to.be.json
            done()
        })
    })

    it('should throw an error if something goes wrong', done => {
        editRouter.setError(true)
        chai.request(app).get('/tasks').end((err, res) => {
            // console.log(res)
            expect(res.error).to.be.instanceOf(Error)
            expect(res).to.be.json
            expect(res).to.have.status(500)
            done()
        })
    })
})
