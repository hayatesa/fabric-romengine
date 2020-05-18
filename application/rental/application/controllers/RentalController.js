'use strict'

const FabricCAServices = require('fabric-ca-client')
const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');
const path = require('path')
const User = require('../../contract/lib/user.js');

class RentalController {

  async queryUser(ctx) {
    // A wallet stores a collection of identities for use
    const wallet = await Wallets.newFileSystemWallet('../../identity/user/isabella/wallet');

    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

    // Main try/catch block
    try {

      // Specify userName for network access
      // const userName = 'isabella.issuer@magnetocorp.com';
      const userName = 'isabella';

      // Load connection profile; will be used to locate a gateway
      let connectionProfile = yaml.safeLoad(fs.readFileSync('../../gateway/connection-profile.yaml', 'utf8'));

      // Set connection options; identity and wallet
      let connectionOptions = {
        identity: userName,
        wallet: wallet,
        discovery: { enabled: false, asLocalhost: false }
      };

      await gateway.connect(connectionProfile, connectionOptions);

      const network = await gateway.getNetwork('rental');

      const contract = await network.getContract('rental');

      const issueResponse = await contract.submitTransaction('queryUser', 'user01');

      // process response
      console.log('Process issue transaction response.'+issueResponse);

      let paper = User.fromBuffer(issueResponse);

      ctx.body = issueResponse

      console.log(`${paper.issuer} commercial paper : ${paper.paperNumber} successfully issued for value ${paper.faceValue}`);
      console.log('Transaction complete.');

    } catch (error) {

      console.log(`Error processing transaction. ${error}`);
      console.log(error.stack);

    } finally {

      // Disconnect from the gateway
      console.log('Disconnect from Fabric gateway.');
      gateway.disconnect();

    }
  }

  async createUser(ctx) {
    ctx.body = ctx.request.body
  }

  async queryEstate(ctx) {
    ctx.body = ctx.params
  }

  async estateEnroll(ctx) {
    ctx.body = ctx.request.body
  }

  async queryLease(ctx) {
    ctx.body = ctx.params
  }

  async createLease(ctx) {
    ctx.body = ctx.request.body
  }

}

module.exports = new RentalController()
