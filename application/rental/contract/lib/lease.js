/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('./../ledger-api/state.js');

/**
 * Lease class extends State class
 * Class will be used by application and smart contract to define a lease
 */
class Lease extends State {

    constructor(obj) {
        super(Lease.getClass(), [obj.id, obj.owner, obj.tenant]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
    */
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getEstate() {
        return this.estate;
    }

    setEstate(estate) {
        this.estate = estate;
    }

    getOwner() {
        return this.owner;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    getTenant() {
        return this.tenant;
    }

    setTenant(tenant) {
        this.tenant = tenant;
    }

    getPrice(price) {
        return this.price;
    }

    setPrice(price) {
        this.price = price;
    }

    getStartDate() {
        return this.startDate;
    }

    setStartDate(startDate) {
        this.startDate = startDate;
    }

    getEndDate() {
        return this.startDate;
    }

    setEndDate(endDate) {
        this.endDate = endDate;
    }

    static fromBuffer(buffer) {
        return Lease.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to lease
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Lease);
    }

    /**
     * Factory method to create a lease object
     */
    static createInstance(id, estate, owner, tenant, price, startDate, endDate) {
        return new Lease({ id, estate, owner, tenant, price, startDate, endDate });
    }

    static getClass() {
        return 'org.rentalnet.lease';
    }
}

module.exports = Lease;
