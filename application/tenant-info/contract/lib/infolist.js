/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('./../ledger-api/statelist.js');

const TenantInfo = require('./info.js');

class Infolist extends StateList {

    constructor(ctx) {
        super(ctx, 'com.romengine.tenantinfolist');
        this.use(TenantInfo);
    }

    async addTenant(tenant) {
        return this.addState(tenant);
    }

    async getTenant(tenantKey) {
        return this.getState(tenantKey);
    }
    async getAllTenants() {
        return this.getState()
    }

    async updateTenant(tenant) {
        return this.updateState(tenant);
    }
}


module.exports = Infolist;
