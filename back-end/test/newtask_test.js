/* eslint-disable no-unused-expressions */
const { describe, it } = require('mocha')
const chai = require('chai')
const { expect, assert } = require('chai')
const chaiHttp = require('chai-http')
const express = require('express')
const { app } = require('../app')
const newRouter = require('../routes/NewTask')

chai.use(chaiHttp)

describe('newrouter', () => {
    it('should be an instance of express Router', done => {
        assert(Object.getPrototypeOf(newRouter.newrouter) === express.Router, 'newRouter should be an instance of express Router')
        done()
    })

    it('creating task should return have no errors', done => {
        chai.request(app).post('/newtask').send(
            {
                stringname: 'test',
                dateduedate: '2023-04-20',
                dateremdate: '2023-04-14'
            }
        ).end((err, res) => {
            expect(res).to.have.status(200)
            done()
        })
    })
})
