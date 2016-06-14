# Api-Server
### 消息盒子 - API

> 消息盒子提供的API是符合RESTful API设计原则的，此API用于消息盒子系统内部数据通讯。

此API搭建在内网`localhost`服务器上，端口为`3399`。

#### 测试链接

> GET /api

* 路径：http://localhost:3399/api
* 操作类型：GET
* 参数：无
* 返回结果：

```json
{
  "message": "Welcome to MessageBox API"
}
```

#### 消息发布

> POST /api/message/:userid/:typeid/:type/:author/:title/:content

* 路径：http://localhost:3399/api/message
* 操作类型：POST
* 参数：

| 字段       |    说明   |
| :-------- | :--------:|
| userid| 用户id：如果是私有消息，此项必填作为接收者；如果是公共消息，可以为空。 |
| typeid| 消息类型id：1/2/3/4/5/6 |
| type  | 消息种类  ：public（公共）消息/private（私有）消息 |
| author| 发布者 |
| title | 消息标题 |
| content | 消息内容 |

* 例子：`http://localhost:3399/api/message/000001/1/private/测试发布者/测试标题/测试内容`

* 返回结果：

```json
{
  "message": "Message created."
}
```
