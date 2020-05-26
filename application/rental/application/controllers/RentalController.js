'use strict'

const User = require('../../contract/lib/user.js')
const Estate = require('../../contract/lib/estate.js')
const Lease = require('../../contract/lib/lease.js')
const gateway = require('../gateways/Org1Gateway')

class RentalController {

  static async queryUser(ctx) {
  let res
   try {
     res = await gateway.contract.submitTransaction('queryUser', ctx.params.id)
   } catch (e) {
     console.log(e.stack)
   }
    ctx.body = User.fromBuffer(res)
  }

  static async createUser(ctx) {
    let {id, name} = ctx.request.body
    let res = await gateway.contract.submitTransaction('createUser', id, name)
    ctx.body = User.fromBuffer(res)
  }

  static async queryEstate(ctx) {
    let res = await gateway.contract.submitTransaction('queryEstate', ctx.params.id)
    res = Estate.fromBuffer(res)
    res.metadata = JSON.parse(res.metadata)
    ctx.body = res
  }

  static async estateEnroll(ctx) {
    let {id, owner, price, metadata} = ctx.request.body
    let res = await gateway.contract.submitTransaction('estateEnroll', id, owner, price, JSON.stringify(metadata))
    ctx.body = Estate.fromBuffer(res)
  }

  static async queryLease(ctx) {
    const res = await gateway.contract.submitTransaction('queryLease', ctx.params.id, ctx.params.owner, ctx.params.tenant)
    ctx.body = Lease.fromBuffer(res)
  }

  static async createLease(ctx) {
    let {id, estate, tenant, startDate, endDate} = ctx.request.body
    let res = await gateway.contract.submitTransaction('createLease', id, estate, tenant, startDate, endDate)
    ctx.body = Lease.fromBuffer(res)
  }

}

module.exports = RentalController
