const fs = require('fs')
const yaml = require('js-yaml')
const { Wallets, Gateway } = require('fabric-network')

class Org1Gateway {

  async init() {
    let gateway = new Gateway()
    this.gateway = gateway
    const wallet = await Wallets.newFileSystemWallet('../../identity/user/isabella/wallet')
    const userName = 'isabella'
    let connectionProfile = yaml.safeLoad(fs.readFileSync('../../gateway/connection-profile.yaml', 'utf8'))
    let connectionOptions = {
      identity: userName,
      wallet: wallet,
      discovery: { enabled: false, asLocalhost: false }
    }
    try {
      await gateway.connect(connectionProfile, connectionOptions)
      let network = await gateway.getNetwork('rental')
      this.contract = await network.getContract('rental')
    } catch (e) {
      gateway.disconnect()
    }
  }

  disconnect() {
    this.gateway.disconnect()
  }
}
let gateway = new Org1Gateway()
gateway.init()
module.exports = gateway
