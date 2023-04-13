/* eslint-disable no-unused-expressions */
const { describe, it } = require('mocha')
const chai = require('chai')
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

    it('editing task should return have no errors', done => {
        chai.request(app).post('/edittask/1').send(
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

    it('should delete a task', done => {
        const taskId = 1
        chai.request(app)
            .post(`/tasks/${taskId}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('deleteSuccess').to.be.true
                done()
            })
    })

    it('should throw an error if something goes wrong', done => {
        editRouter.setError(true)
        chai.request(app).post('/tasks/1').end((err, res) => {
            expect(res.error).to.be.instanceOf(Error)
            expect(res).to.be.json
            expect(res).to.have.status(500)
            done()
        })
    })
})
