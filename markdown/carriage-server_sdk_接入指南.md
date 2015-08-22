# Carriage-Server SDK 接入指南

### 以Node.js接入为例

* 付款

	接入 Carriage SDK 发起支付，服务器端需要做的就是向 Carriage SDK 请求 Charge 对象，然后返回给客户端。并且监听和获取 Webhooks 通知。

	而完成这两件事具体涉及以下几步：

	1. 设置 API-Key
	2. 发起支付请求获取支付凭据
	3. 将获得的支付凭据传给 Client
	4. 接收 Webhooks 通知
	5. 我们以 alipay 渠道为例子详细介绍 Server SDK 如何使用发起支付请求，而不同渠道的具体区别，在 关于渠道 中详细说明。

##### 第一步：设置 API-Key

Carriage SDK API 交易时需要设置 API-Key，Server SDK 提供了设置的方法。如果你直接使用 API ，需要在 header 中加入 Authorization，格式是 Authorization: Bearer API-Key。

```var pingpp = require('pingpp')('sk_test_ibbTe5jLGCi5rzfH4OqPW9KC');```

##### 第二步：发起支付请求获取支付凭据

调用 Carriage SDK Server SDK 发起支付请求，发起请求所需参数具体可参考 API 文档。不同的渠道只需要切换 channel、添加不同渠道所需的不同的参数，关于渠道区别详见 关于渠道。

```
pingpp.charges.create({
        subject: "Your Subject",
        body: "Your Body",
        amount: 100,
        order_no: "123456789",
        channel: "alipay",
        currency: "cny",
        client_ip: "127.0.0.1",
        app: {id: "app_1Gqj58ynP0mHeX1q"}
    }, function(err, charge) {
        // YOUR CODE
    });
```

Carriage SDK 收到支付请求后返回给你的服务器一个 Charge 对象，我们称这个 Charge 对象为支付凭据。下面是支付凭据的一个示例：

```
{
  "id": "ch_Hm5uTSifDOuTy9iLeLPSurrD",
  "object": "charge",
  "created": 1425095528,
  "livemode": true,
  "paid": false,
  "refunded": false,
  "app": "app_1Gqj58ynP0mHeX1q",
  "channel": "alipay",
  "order_no": "123456789",
  "client_ip": "127.0.0.1",
  "amount": 100,
  "amount_settle": 0,
  "currency": "cny",
  "subject": "Your Subject",
  "body": "Your Body",
  "extra":{},
  "time_paid": null,
  "time_expire": 1425181928,
  "time_settle": null,
  "transaction_no": null,
  "refunds": {
    "object": "list",
    "url": "/v1/charges/ch_Hm5uTSifDOuTy9iLeLPSurrD/refunds",
    "has_more": false,
    "data": []
  },
  "amount_refunded": 0,
  "failure_code": null,
  "failure_msg": null,
  "credential": {
    "object": "credential",
    "alipay":{
      "orderInfo": "_input_charset=\"utf-8\"&body=\"tsttest\"&it_b_pay=\"1440m\"¬ify_url=\"https%3A%2F%2Fapi.pingxx.com%2Fnotify%2Fcharges%2Fch_jH8uD0aLyzHG9Oiz5OKOeHu9\"&out_trade_no=\"1234dsf7uyttbj\"&partner=\"2008451959385940\"&payment_type=\"1\"&seller_id=\"2008451959385940\"&service=\"mobile.securitypay.pay\"&subject=\"test\"&total_fee=\"1.23\"&sign=\"dkxTeVhMMHV2dlRPNWl6WHI5cm56THVI\"&sign_type=\"RSA\""
    }
  },
  "description": null
}
```

#### 第三步：将获得的支付凭据传给 Client

你的服务器需要按照 JSON 字符串格式将支付凭据返回给你的客户端，Carriage SDK SDK 对此做了相应的处理，你只需要将获得的支付凭据直接传给客户端。客户端接收后使用该支付凭据用于调起支付控件，而支付凭据的传送方式需要你自行实现。

#### 第四步：接收 Webhooks 通知

当用户完成交易后 Carriage SDK 会以 Post 方式给你配置在 Carriage SDK 管理平台的 Webhooks 通知地址主动发送支付结果，我们称之为 Webhooks 通知，内容为您在 Webhooks 上配置的 charge.succeeded 事件对象，结果内容示例如下：

```
{
    "id": "evt_ugB6x3K43D16wXCcqbplWAJo",
    "created": 1427555101,
    "livemode": true,
    "type": "charge.succeeded",
    "data": {
        "object": {
            "id": "ch_Xsr7u35O3m1Gw4ed2ODmi4Lw",
            "object": "charge",
            "created": 1427555076,
            "livemode": true,
            "paid": true,
            "refunded": false,
            "app": "app_1Gqj58ynP0mHeX1q",
            "channel": "upacp",
            "order_no": "123456789",
            "client_ip": "127.0.0.1",
            "amount": 100,
            "amount_settle": 0,
            "currency": "cny",
            "subject": "Your Subject",
            "body": "Your Body",
            "extra": {},
            "time_paid": 1427555101,
            "time_expire": 1427641476,
            "time_settle": null,
            "transaction_no": "1224524301201505066067849274",
            "refunds": {
                "object": "list",
                "url": "/v1/charges/ch_L8qn10mLmr1GS8e5OODmHaL4/refunds",
                "has_more": false,
                "data": []
            },
            "amount_refunded": 0,
            "failure_code": null,
            "failure_msg": null,
            "metadata": {},
            "credential": {},
            "description": null
        }
    },
    "object": "event",
    "pending_webhooks": 0,
    "request": "iar_qH4y1KbTy5eLGm1uHSTS00s"
}
```