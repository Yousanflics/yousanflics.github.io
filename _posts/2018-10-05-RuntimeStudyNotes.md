---
layout:     post
title:      Runtime 
subtitle:    "iOS 熟知必会系列"
date:       2018-10-05
author:     水水
header-img: img/post-bg-runtime.png
catalog: true
tags:
    - iOS
    - 基础知识
    - Runtime
---

## 想感受 Runtime 的力量吗

> 除了面试中我们会经常被问到 `iOS Runtime` 相关知识，作为一个优秀的 iOSer `Runtime` 这种底层的基础知识应该是熟知必会的，只有对使用的语言充分深入了解，我们才能更加灵活的使用它。

# iOS Runtime 学习笔记

## Runtime 介绍
通过学习编译原理我们知道一般来说高级编程语言想要转换成可执行文件需要先编译成为汇编语言再转换成机器语言（也就是 0 1 的这种机器码）但是由于 `Objective-C` 是一门动态语言所以并不能一开始就被编译为汇编语言而是需要先转写成纯 `C` （这个部分便是 `Runtime` 做的）然后再转换成汇编最后转换成机器码，我们也知道 `Objective-C` 是一门面向对象的语言而 `C` 语言是一门面向过程的编程语言因此 `Runtime` 也可以理解成是将面向对象的类转变城面向过程的结构体。目前我们开发使用的 `Objective-C` 2.0 采用的是 modern 版本的 `Runtime`，其只能运行在 `iOS` 和 `MacOS` 10.5 之后的 64 位程序中。


## Runtime 消息传递（messaging）

### 什么是消息传递
对象调用方法的过程就是一个消息传递，执行 `[obj meth]` 时编译器会将这个转换成消息发送 `objc_msgSend(obj,meth)` 函数。

### 实现消息传递
首先先复盘一下消息传递的流程
- 首先通过obj（对象）的isa指针找到它的 class ;
- 在 class 的 method list 找 foo ;
- 如果 class 中没到 foo，继续往它的 superclass 中找 ;
- 一旦找到 foo 这个函数，就去执行它的实现IMP 。

看完这个基本流程会发现其中涉及了这么几个东西，对象（object），对象对应的类（class），类中方法（method），那么接下来通过解读这几个东西源码我们似乎应该就可以将消息传递搞懂一大部分了。

```objc
//对象
struct objc_object {
    Class isa  OBJC_ISA_AVAILABILITY;
};
//类
struct objc_class {
    Class isa  OBJC_ISA_AVAILABILITY;
#if !__OBJC2__
    Class super_class                                        OBJC2_UNAVAILABLE;//OC 2.0 中已经没有了
    const char *name                                         OBJC2_UNAVAILABLE;
    long version                                             OBJC2_UNAVAILABLE;
    long info                                                OBJC2_UNAVAILABLE;
    long instance_size                                       OBJC2_UNAVAILABLE;
    struct objc_ivar_list *ivars                             OBJC2_UNAVAILABLE;
    struct objc_method_list **methodLists                    OBJC2_UNAVAILABLE;
    struct objc_cache *cache                                 OBJC2_UNAVAILABLE;
    struct objc_protocol_list *protocols                     OBJC2_UNAVAILABLE;
#endif
} OBJC2_UNAVAILABLE;
//方法列表
struct objc_method_list {
    struct objc_method_list *obsolete                        OBJC2_UNAVAILABLE;
    int method_count                                         OBJC2_UNAVAILABLE;
#ifdef __LP64__
    int space                                                OBJC2_UNAVAILABLE;
#endif
    /* variable length structure */
    struct objc_method method_list[1]                        OBJC2_UNAVAILABLE;
}                                                            OBJC2_UNAVAILABLE;
//方法
struct objc_method {
    SEL method_name                                          OBJC2_UNAVAILABLE;
    char *method_types                                       OBJC2_UNAVAILABLE;
    IMP method_imp                                           OBJC2_UNAVAILABLE;
}
```

## Runtime 消息转发

## Runtime 应用

## Reference
- `objc_msgSend` 方法定义如下：

```objc
OBJC_EXPORT id objc_msgSend(id self, SEL op,...)
```

- `Class ` 定义如下：

``` objc
typedef struct objc_class *Class; 
```

- [掘金 jackyshan_](https://juejin.im/post/5ac0a6116fb9a028de44d717)