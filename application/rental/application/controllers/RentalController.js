'use strict'

const User = require('../../contract/lib/user.js')
const Estate = require('../../contract/lib/estate.js')
const Lease = require('../../contract/lib/lease.js')
const gateway = require('../gateways/Org1Gateway')

class RentalController {

  static async queryUser(ctx) {
    try {
      const queryResponse = await gateway.contract.submitTransaction('queryUser', ctx.params.id)
      ctx.body = User.fromBuffer(queryResponse)
    } catch (error) {
      console.log(error.stack)
    }
  }

  static async createUser(ctx) {
    ctx.body = ctx.request.body
  }

  static async queryEstate(ctx) {
    try {
      const queryResponse = await gateway.contract.submitTransaction('queryEstate', ctx.params.id)
      ctx.body = Estate.fromBuffer(queryResponse)
    } catch (error) {
      console.log(error.stack)
    }
  }

  static async estateEnroll(ctx) {
    ctx.body = ctx.request.body
  }

  static async queryLease(ctx) {
    try {
      const queryResponse = await gateway.contract.submitTransaction('queryLease', ctx.params.id, ctx.params.owner, ctx.params.tenant)
      ctx.body = Lease.fromBuffer(queryResponse)
    } catch (error) {
      console.log(error.stack)
    }
  }

  static async createLease(ctx) {
    ctx.body = ctx.request.body
  }

}

module.exports = RentalController
