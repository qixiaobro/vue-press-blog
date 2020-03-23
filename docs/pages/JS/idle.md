# 杂

## 1.基于类（java）和基于原型（JavaScript）的对象系统的比较

![比较](../../assets/Snipaste_2020-03-23_10-14-53.jpg)

## 2.TCP ->三次握手、四次挥手

TCP(Transmission Control Protocol),是为了在不可靠的互联网络提供可靠的端到端字节流而专门设计的一个传输协议。当应用层向TCP层发送用于网间传输的、用8位字节表示的[数据流](https://baike.baidu.com/item/数据流)，TCP则把数据流分割成适当长度的报文段，最大传输段大小（[MSS](https://baike.baidu.com/item/MSS/3567770)）通常受该计算机连接的网络的数据链路层的最大传送单元（[MTU](https://baike.baidu.com/item/MTU)）限制。之后TCP把数据包传给IP层，由它来通过网络将包传送给接收端实体的TCP层 

syn：同步位          seq：初始序号   ACK：确认报文段   ack：确认号

[以下图片来自此博客]: https://www.cnblogs.com/Andya/p/7272462.html

![https://www.cnblogs.com/Andya/p/7272462.html](../../assets/Snipaste_2020-03-23_14-20-43.jpg)

### 三次握手

* 客户端发送 `syn`(同步序列编号) 请求，进入 `syn_send` 状态，等待确认
* 服务端接收并确认 `syn` 包后发送 `syn+ack` 包，进入 `syn_recv` 状态
* 客户端接收 `syn+ack` 包后，发送 `ack` 包，双方进入 `established` 状态

![三次握手](../../assets/Snipaste_2020-03-23_14-56-55.jpg)

### 四次挥手

* 客户端 -- FIN --> 服务端， FIN—WAIT
* 服务端 -- ACK --> 客户端， CLOSE-WAIT
* 服务端 -- ACK,FIN --> 客户端， LAST-ACK
* 客户端 -- ACK --> 服务端，CLOSED

![四次挥手](../../assets/Snipaste_2020-03-23_14-57-02.jpg)