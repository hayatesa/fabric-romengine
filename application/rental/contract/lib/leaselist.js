/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('./../ledger-api/statelist.js');

const Lease = require('./lease.js');

class Leaselist extends StateList {

    constructor(ctx) {
        super(ctx, 'org.rentalnet.leaselist');
        this.use(Lease);
    }

    async addLease(lease) {
        return this.addState(lease);
    }

    async getLease(leaseKey) {
        return this.getState(leaseKey);
    }

    async updateLease(lease) {
        return this.updateState(lease);
    }
}


module.exports = Leaselist;
