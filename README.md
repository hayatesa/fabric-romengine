### 进入工作路径

```bash
cd $GOPATH/src/github.com/hyperledger/fabric/fabric-romengine/deploy/configtx
```

### 设置工作路径

```bash
export FABRIC_CFG_PATH=$GOPATH/src/github.com/hyperledger/fabric/accentrix/deploy
```

### 环境清理

```bash
rm -Rf organizations/peerOrganizations && rm -Rf organizations/ordererOrganizations
```

### 生成证书文件

```bash
cryptogen generate --config=./organizations/cryptogen/crypto-config-org1.yaml --output="organizations"
cryptogen generate --config=./organizations/cryptogen/crypto-config-org2.yaml --output="organizations"
cryptogen generate --config=./organizations/cryptogen/crypto-config-orderer.yaml --output="organizations"
```

### 生成创世区块

```bash
configtxgen -profile TwoOrgsOrdererGenesis -channelID system-channel -outputBlock ./system-genesis-block/genesis.block
```

### 生成通道的创世交易

```bash
mkdir channel-artifacts
configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/<通道名>.tx -channelID <通道名>
```

### 生成组织锚节点（主节点）交易

```bash
configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/<组织MSP>anchors.tx -channelID <通道名> -asOrg <组织MSP>
```

### 创建通道

```bash
configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/<组织MSP>anchors.tx -channelID <通道名> -asOrg <组织MSP>
```

### 加入通道

```bash
peer channel join -b ./channel-artifacts/<通道名>.block
```

### 设置主节点

```bash
peer channel update -o localhost:7050 \
-c <通道名> \
-f ./channel-artifacts/<组织MSP>anchors.tx \
```

### 链码实例化

### 链码交互

### 链码升级