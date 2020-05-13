/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('./../ledger-api/statelist.js');

const User = require('./user.js');

class Userlist extends StateList {

    constructor(ctx) {
        super(ctx, 'org.rentalnet.userlist');
        this.use(User);
    }

    async addUser(user) {
        return this.addState(user);
    }

    async getUser(userKey) {
        return this.getState(userKey);
    }

    async updateUser(user) {
        return this.updateState(user);
    }
}


module.exports = Userlist;
