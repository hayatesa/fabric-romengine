/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('./../ledger-api/state.js');

// Enumerate tenant info state values
const idType = {
    ID_CARD: 1,
    PASSPORT: 2
};

/**
 * TenantInfo class extends State class
 * Class will be used by application and smart contract to define a tenant
 */
class TenantInfo extends State {

    constructor(obj) {
        super(TenantInfo.getClass(), [obj.id, obj.idType]);
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

    getIdType() {
        return this.idType;
    }

    setIdType(idType) {
        this.idType = idType;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    static fromBuffer(buffer) {
        return TenantInfo.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to tenant info
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, TenantInfo);
    }

    /**
     * Factory method to create a tenant info object
     */
    static createInstance(id, idType, name) {
        return new TenantInfo({ id, idType, name });
    }

    static getClass() {
        return 'com.romengine.tenantinfo';
    }
}

module.exports = TenantInfo;
