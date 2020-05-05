'use strict';

// Fabric smart contract classes
const {Contract, Context} = require('fabric-contract-api');

// TenantNet specifc classes
const TenantInfo = require('./info.js');
const InfoList = require('./infolist.js');

/**
 * A custom context provides easy access to list of all tenant infos
 */
class TenantInfoContext extends Context {

  constructor() {
    super();
    // All tenants are held in a list of tenants
    this.infoList = new InfoList(this);
  }

}

/**
 * Define tenant info smart contract by extending Fabric Contract class
 *
 */
class TenantInfoContract extends Contract {

  constructor() {
    // Unique namespace when multiple contracts per chaincode file
    super('com.romengine.tenantinfo');
  }

  /**
   * Define a custom context for tenant info
   */
  createContext() {
    return new TenantInfoContext();
  }

  /**
   * Instantiate to perform any setup of the ledger that might be required.
   * @param {Context} ctx the transaction context
   */
  async initLedger(ctx) {
    // No implementation required with this example
    // It could be where data migration is performed, if necessary
    console.info('============= START : initLedger ===========');
    const tenants = [
      {
        id: '1',
        idType: 1,
        name: '张三'
      },
      {
        id: '2',
        idType: 1,
        name: '李四'
      }
    ]
    for (let i = 0; i < tenants.length; i++) {
      await this.add(ctx, tenants[i].id, tenants[i].idType, tenants[i].name);
      console.info('Added <--> ', tenants[i]);
    }
    console.info('============= END : initLedger ===========');
  }

  /**
   * Add tenant info
   *
   * @param {Context} ctx the transaction context
   * @param {String} id
   * @param {String} idType
   * @param {String} name
   */
  async add(ctx, id, idType, name) {

    // create an instance of the tenant
    let tenant = TenantInfo.createInstance(id, idType, name);

    // Add the tenant to the list of all similar tenant infos in the ledger world state
    await ctx.infoList.addTenant(tenant);

    // Must return a serialized tenant to caller of smart contract
    return tenant;
  }

  async getTenant(ctx, id, idType) {
    // Retrieve the current paper using key fields provided
    console.info('============= START : getTenant ===========');
    let tenantKey = TenantInfo.makeKey([id, idType]);
    console.log(`{id: ${id}, idType: ${idType}, key: ${tenantKey}`)
    console.info('============= END : getTenant ===========');
    return await ctx.infoList.getTenant(tenantKey);
  }

}

module.exports = TenantInfoContract;
