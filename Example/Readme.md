# react-native-baidu-map-examples

## 开发环境
- XCode: 11.3
- node: v14.1.0

## API Key 相关：
- API Key: sIMQlfmOXhQmPLF1QMh4aBp8zZO9Lb2A
- iOS Bundle Identifier: org.lovebing.example.rn

## 生成
目录通过以下命令生成：
```shell
npx react-native init v62 --version 0.62.2
```
此版本有以下特点：
- Android 使用 androidx
- iOS 使用 CocoaPods 管理依赖

### 添加依赖
package.json 的 dependencies 增加
```
  "sog-baidu-map": "^1.2.37"
```
```shell
yarn install
cd ios
pod install
```

### 运行
```shell
yarn ios
yarn android
```

## 常见问题

### The 'Pods-xx' target has libraries with conflicting names: libcrypto.a and libssl.a.
解决方法：
```shell
pod cache list | grep BaiduMapKit
```
删除 pod 缓存中的 BaiduMapKit/thirdlibs/ 下的文件，重新执行 pod install

### ld: library not found for -lcrypto
根据前面提到的方法删除 百度地图自带的 libcrypto.a 和 libssl.a，使用 OpenSSL-Universal 代替

### pod install 很慢
通常是因为连接 github.com 太慢，可以设置终端代理如 export all_proxy="http://127.0.0.1:8888" 或使用全局 VPN
