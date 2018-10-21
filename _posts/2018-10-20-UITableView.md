---
layout:     post
title:      UITableView 复用 
subtitle:    "iOS 熟知必会系列"
date:       2018-10-05
author:     水水
header-img: img/post-bg-runtime.png
catalog: true
tags:
    - iOS
    - 基础知识
    - UITableView
---

## iOS UITableView 学习笔记

> 日常 App 开发中 `UITableView` 的使用几乎遍地都是，为了后面更好的使用它深入了解一下还是很有必要滴！

# UITableView 复用以及优化

## UITableView 复用机制

>本次的学习中都是假定 `UITableView` 的大小是整个屏幕的 size。

日常生活中我们滑动 iPhone 通讯录视图的时候会觉得一点都不卡不管你通讯录有多少人 (我的有几百人还是很丝滑)，查看最近通话也是的，这一切都归功于 `UITableView` 的复用机制，下面让我们仔细复盘一下整个滑动的过程然后进行分析。`UITableView` 首先加载屏幕所需要的 `UITableViewCell`, 根据每个 `cell` 的高度不同加载的数目自然也就不同，但是最后是要铺满整个屏幕，更准确说当前已经加载的所有 `cell` 的总高度和要不小于屏幕高度。当手指向上滑动的时候，原来最上面的 `cell` 会滑出屏幕，为了继续显示信息此时就需要一个新的 `cell` 跟在原来最下面的一个 `cell` 后面。如果是重新生成这显然没有响应复用这个词，那么可以知道肯定不是重新生成的，而是去 `UITableView` 对应的一个资源池里去获取。这个资源池里放了已经生成的而且能用的 `cell` (刚开始生成的 `cell` 并不是都可以使用)。如果资源池是空的才需要主动生成一个新的 `cell`。那资源池里的 `cell` 又是哪里的呢？当你滑动时视图时，位于最顶部的 `cell` 会相应的往上滑动，直到它彻底消失在屏幕上，消失的 `cell` 去了哪里？它被对应的 `UITableView` 放到资源池里了。其它的 `cell` 也是这样，只要一滑出屏幕就放入资源池。有进有出，总共需要大约比一屏幕 `cell` 总数多一两个的 `cell` 就够用。对于上千上万条数据的呈现来说节省的资源就是指数级，很大程度上解决了性能问题。

## UITableView 复用实现过程

既然是要学习实现过程那肯定是要看源码来学习的但是很可惜在 Xcode 中只找到了相关的头文件并没有实现文件，所以在 GitHub 上面查了一个 hack 版的 UITableView 源码实现，他就是 MacOS 上的模拟 UIKit 项目 Chameleon 尽管已经停更了 5 年了但是用作学习还是够了，毕竟经典永流传～

### UITableView 的创建


在 `UITableView` 创建的同时,它会创建一个空的资源池。后面 `UITableView` 在内部维护这个资源池，一般情况下有两种用法，一种是在取出一个空的cell的时候再新建一个，一种是预先注册cell之后再直接从复用池取出来用，不需要初始化.

