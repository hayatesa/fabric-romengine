### 进入工作路径

```bash
cd $GOPATH/src/github.com/hyperledger/fabric/romengine
```

### 设置工作路径

```bash
export FABRIC_CFG_PATH=$GOPATH/src/github.com/hyperledger/fabric/romengine/deploy
```

### 环境清理

```bash
rm -fr config/*
rm -fr crypto-config/*
```

### 生成证书文件

```bash
cryptogen generate --config=./organizations/cryptogen/crypto-config-org1.yaml --output="organizations"
cryptogen generate --config=./organizations/cryptogen/crypto-config-org2.yaml --output="organizations"
cryptogen generate --config=./organizations/cryptogen/crypto-config-orderer.yaml --output="organizations"
```



### 生成创世区块

### 生成通道的创世交易

### 生成组织关于锚节点交易

### 创建通道

### 加入通道

### 设置主节点

### 链码实例化

### 链码交互

### 链码升级