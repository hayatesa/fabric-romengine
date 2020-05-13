/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

// UserNet specifc classes
const User = require('./user.js');
const Estate = require('./estate.js');
const Lease = require('./lease.js');
const UserList = require('./userlist.js');
const EstateList = require('./estatelist.js');
const LeaseList = require('./leaselist.js');

/**
 * A custom context provides easy access to list of all rentals
 */
class RentalContext extends Context {

    constructor() {
        super();
        // All users are held in a list of users
        this.userList = new UserList(this);
        this.estateList = new EstateList(this);
        this.leaseList = new LeaseList(this);
    }

}

/**
 * Define rental smart contract by extending Fabric Contract class
 *
 */
class RentalContract extends Contract {

    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.rentalnet.rental');
    }

    /**
     * Define a custom context for rental
    */
    createContext() {
        return new RentalContext();
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiate(ctx) {
        // No implementation required with this example
        // It could be where data migration is performed, if necessary
        console.log('Instantiate the contract');
    }

    async queryUser(ctx, id) {

        if (!id || id === '') {
            throw new Error(`id should not be empty`);
        }

        // Must return a serialized user to caller of smart contract
        return await ctx.userList.getUser(User.makeKey([id]));
    }

    /**
     * Create user rental
     *
     * @param {Context} ctx the transaction context
     * @param {String} id
     * @param {String} name
    */
    async createUser(ctx, id, name) {

        if (!id || id === '') {
            throw new Error(`id should not be empty`);
        }

        if (!name || name === '') {
            throw new Error(`name should not be empty`);
        }

        // create an instance of the user
        let user = User.createInstance(id, name, []);

        // Add the user to the list of all similar rentals in the ledger world state
        await ctx.userList.addUser(user);

        // Must return a serialized user to caller of smart contract
        return user;
    }

    async queryEstate(ctx, id) {

        if (!id || id === '') {
            throw new Error(`id should not be empty`);
        }

        // Must return a serialized user to caller of smart contract
        return await ctx.estateList.getEstate(Estate.makeKey([id]));
    }

    /**
     * Create estate
     *
     * @param {Context} ctx the transaction context
     * @param {String} id
     * @param {String} owner
     * @param {Number} price
     * @param {JSON} metadata
    */
    async estateEnroll(ctx, id, owner, price, metadata) {

        let ownerKey = User.makeKey([owner]);
        let ownerObj = await ctx.userList.getUser(ownerKey);
        // Validate owner
        if (!ownerObj) {
            throw new Error(`Owner ${owner} dose not exist`);
        }

        let estateKey = Estate.makeKey([id]);
        let esateObj = await ctx.estateList.getEstate(estateKey);
        if (esateObj) {
            throw new Error(`Estate ${id} already exists`);
        }

        esateObj = Estate.createInstance(id, owner, '', price, metadata);
        let estates = owner.getEstates() || [];
        estates.push(id);
        ownerObj.setEstates(estates);

        await ctx.userList.updateUser(ownerObj);
        await ctx.estateList.addEstate(esateObj);

        return { esateObj, ownerObj };
    }

    async queryLease(ctx, id, owner, tenant) {

        if (!id || id === '') {
            throw new Error(`id should not be empty`);
        }

        // Must return a serialized user to caller of smart contract
        return await ctx.leaseList.getLease(Lease.makeKey([id, owner, tenant]));
    }

    /**
     * rental
     *
     * @param {Context} ctx the transaction context
     * @param {String} id
     * @param {String} estate
     * @param {String} owner
     * @param {String} tenant
     * @param {String} startDate
     * @param {String} endDate
    */
    async createLease(ctx, id, estate, owner, tenant, startDate, endDate) {

        if (!id || id === '') {
            throw new Error(`id should not be empty`);
        }
        if (!estate || estate === '') {
            throw new Error(`estate should not be empty`);
        }
        if (!owner || owner === '') {
            throw new Error(`owner should not be empty`);
        }
        if (!tenant || tenant === '') {
            throw new Error(`tenant should not be empty`);
        }
        if (!startDate || startDate === '') {
            throw new Error(`startDate should not be empty`);
        }
        if (!endDate || endDate === '') {
            throw new Error(`endDate should not be empty`);
        }

        let ownerKey = User.makeKey([owner])
        let ownerObj = await ctx.userList.getUser(ownerKey);
        if (!ownerObj) {
            throw new Error(`Owner ${owner} dose not exist`);
        }

        let tenantKey = User.makeKey([owner])
        let tenantObj = await ctx.userList.getUser(tenantKey);
        if (!tenantObj) {
            throw new Error(`Owner ${tenant} dose not exist`);
        }

        let estateKey = Estate.makeKey([id]);
        let estateObj = await ctx.estateList.getEstate(estateKey);
        if (!estateObj) {
            throw new Error(`Estate ${estate} dose not exist`);
        }
        let leaseKey = Lease.makeKey([id, owner, tenant]);
        let leaseObj = await ctx.leaseList.getLease(leaseKey);
        if (leaseObj) {
            throw new Error(`Lease ${leaseKey} already exists`);
        }

        leaseObj = Lease.createInstance(id, estate, owner, tenant, estateObj.getPrice(), startDate, endDate);
        return leaseObj;

    }

}

module.exports = RentalContract;
