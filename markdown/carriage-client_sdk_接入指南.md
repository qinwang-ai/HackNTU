# Carriage-Client SDK 接入指南

### iOS SDK 接入指南

* 应用可以直接向api.carriage.com/XXX发送所有的应用请求，Node节点服务器会对分布式服务器进行同样的处理逻辑。

* 使用 CocoaPods

	1. 在 Podfile 添加

    	pod 'Pingpp', '~> 2.1.0'
默认会包含支付宝、微信、银联和百度钱包，你也可以自己选择渠道。
目前有 ApplePay、Alipay、Wx、UnionPay、Bfb 五个子模块可选择，例如：

	```
    pod 'Pingpp/Alipay', '~> 2.1.0'
    pod 'Pingpp/Wx', '~> 2.1.0'
    pod 'Pingpp/UnionPay', '~> 2.1.0'
    pod 'Pingpp/ApplePay', '~> 2.1.0'
    ```

	2. 运行 pod install
	3. 从现在开始使用 .xcworkspace 打开项目，而不是 .xcodeproj
	4. 添加 URL Schemes：在 Xcode 中，选择你的工程设置项，选中 TARGETS 一栏，在 Info 标签栏的 URL Types 添加 URL Schemes，如果使用微信，填入微信平台上注册的应用程序 id（为 wx 开头的字符串），如果不使用微信，则自定义，建议起名稍复杂一些，尽量避免与其他程序冲突。允许英文字母和数字，首字母必须是英文字母，不允许特殊字符。
	5. 2.1.0 及以上版本，可打开 Debug 模式，打印出 log，方便调试。开启方法：[Pingpp setDebugMode:YES];。
	
* 手动导入

	1. 在 Github 根据所需渠道下载相应分支的 iOS SDK，里面包含 lib 和 example 两个目录。example 目录下的是示例项目，你需要将 lib 目录下的文件添加到你的项目。
	2. 依赖 Frameworks：
	
		必需：
		* CFNetwork.framework
		* SystemConfiguration.framework
		* Security.framework
		* libc++.dylib
		* libz.dylib
		* libsqlite3.0.dylib

		如果不需要某些渠道，删除 lib/Channels 下的相应目录即可。

* 添加 URL Schemes：

	在 Xcode 中，选择你的工程设置项，选中 TARGETS 一栏，在 Info 标签栏的 URL Types 添加 URL Schemes，如果使用微信，填入微信平台上注册的应用程序 id（为 wx 开头的字符串），如果不使用微信，则自定义，建议起名稍复杂一些，尽量避免与其他程序冲突。允许英文字母和数字，首字母必须是英文字母，不允许特殊字符。
添加 Other Linker Flags：在 Build Settings 搜索 Other Linker Flags，添加 -ObjC。
2.1.0 及以上版本，可打开 Debug 模式，打印出 log，方便调试。开启方法：[Pingpp setDebugMode:YES];。

* 接入

	客户端从服务器端拿到 charge 对象后，调用下面的方法
	
	```
[Pingpp createPayment:charge
       viewController:viewController
         appURLScheme:kUrlScheme
       withCompletion:^(NSString *result, PingppError *error) {
    if ([result isEqualToString:@"success"]) {
        // 支付成功
    } else {
        // 支付失败或取消
        NSLog(@"Error: code=%lu msg=%@", error.code, [error getMsg]);
    }
}];
	```
