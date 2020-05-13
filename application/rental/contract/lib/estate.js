/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('./../ledger-api/state.js');

/**
 * Estate class extends State class
 * Class will be used by application and smart contract to define a estate
 */
class Estate extends State {

    constructor(obj) {
        super(Estate.getClass(), [obj.id]);
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

    getMetaData() {
        return this.metaData;
    }

    setMetaData(metaData) {
        this.metaData = metaData;
    }

    static fromBuffer(buffer) {
        return Estate.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to estate
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Estate);
    }

    /**
     * Factory method to create a estate object
     */
    static createInstance(id, owner, tenant, price, metadata) {
        return new Estate({ id, owner, tenant, price, metadata });
    }

    static getClass() {
        return 'org.rentalnet.estate';
    }
}

module.exports = Estate;
