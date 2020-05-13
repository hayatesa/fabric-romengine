/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('./../ledger-api/state.js');

/**
 * User class extends State class
 * Class will be used by application and smart contract to define a user
 */
class User extends State {

    constructor(obj) {
        super(User.getClass(), [obj.id]);
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

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getEstates() {
        return this.estates;
    }

    setEstates(estates) {
        this.estates = estates;
    }

    static fromBuffer(buffer) {
        return User.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to user
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, User);
    }

    /**
     * Factory method to create a user object
     */
    static createInstance(id, name, estates) {
        return new User({ id, name, estates });
    }

    static getClass() {
        return 'org.rentalnet.user';
    }
}

module.exports = User;
