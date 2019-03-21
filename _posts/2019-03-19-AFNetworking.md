---
layout:     post
title:      AFNetworking 
subtitle:    "iOS 源码探索系列"
date:       2019-03-19
author:     水水
header-img: img/post-bg-AFNetwork.png
catalog: true
tags:
    - iOS 源码
    - AFNetwork 3x
---

## iOS 网络学习笔记

> 最近笔者对 iOS 中著名的第三方网络库 AFNetworking 展开了学习，尽管大家都知道它是对 iOS 7 之后苹果发布的新的网络基础库 NSURLSession 的封装，但是到底是个怎么样的封装法，接着笔者在源码的阅读中对此进行了探究。以下仅是个人一点见解，请多多指教。

## AFNetworking 3.x 的结构
通过分析目前 Github 上 AFNetworking（version：3.2.1）的源码，我们可以大致总结出如下的一个代码结构设计。

![IMAGE](https://github.com/Yousanflics/yousanflics.github.io/blob/master/img/AF_Archi.png)

从图片中的箭头我们看到大概的关系，AFHTTPSessionManager 是继承自 AFURLSessionManager 的，其中主要起到核心关键作用的是 AFURLSessionManager ，其他的分别的是进行请求和相应的序列化、抵达检测和安全控制。并且通过使用这个库我们发现，对于使用而言，我们仅需要对 AFHTTPSessionManager 中的 API 熟悉即可，同时 AFNetworking 的官方 Github 上面也有对这个 API 的使用说明，因此如果你只是想简单地使用的话，到此就结束了。但是为了更好的使用的这个第三方库或者说我们相根据这个第三方库来设计出或者改造出我们自己的网络库，那么就需要对这个库的代码进行深入的解读了。由于这个库的代码进行完全解读，基本是不太可能的，所以这个地方只对一个 POST 请求从 APP 调用到底层的执行进行解读，分析一下 AFNetworking 到底帮我们做了些什么。

## GET 到底了什么
为了发起一个请求首先我们会创建一个 AFHTTPSessionManager 的实例，通过这个实例去调用请求的实例方法，具体实现如下：
``` objc

    AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
    
    manager.requestSerializer.timeoutInterval = 10;
    manager.responseSerializer.acceptableContentTypes = [NSSet setWithObjects:@"application/json", @"text/json", @"text/javascript", @"text/html", @"text/plain", nil];
    
    [manager GET:@"https://app.chaoaicai.com/api/todayApi/discoveryInfo.app" parameters:@{@"name": @"kelvin"} progress:nil success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        NSLog(@"%@", task);
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        NSLog(@"%@", error);
    }];

```
创建完实例对象之后是对这个对象的请求时间进行设置（10秒），然后是对响应序列的可以接受的内容格式进行设置，这个地方使用 NSSet 将能接受的标准存储起来。然后就调用 manager 对象的实例方法发起请求，请求函数中有对请求 URL 的设置，带有的参数，请求过程，成功后的回调，失败后的回调，这个地方执行的是成功后的回调。

很显然笔者是不想只一个 API caller 的，笔者十分想知道这个方法到底做了什么，所以就接着往下看了。
``` objc

- (NSURLSessionDataTask *)GET:(NSString *)URLString
                   parameters:(id)parameters
                     progress:(void (^)(NSProgress * _Nonnull))downloadProgress
                      success:(void (^)(NSURLSessionDataTask * _Nonnull, id _Nullable))success
                      failure:(void (^)(NSURLSessionDataTask * _Nullable, NSError * _Nonnull))failure
{

    NSURLSessionDataTask *dataTask = [self dataTaskWithHTTPMethod:@"GET"
                                                        URLString:URLString
                                                       parameters:parameters
                                                   uploadProgress:nil
                                                 downloadProgress:downloadProgress
                                                          success:success
                                                          failure:failure];

    [dataTask resume];

    return dataTask;
}

```

在实例方法的视线中我们能够看到，具体的实现是通过创建一个 NSURLSessionDataTask 的对象 dataTasK 然后这个对象指向的是自身的 AFHTTPSessionManager 对象的 dataTaskWithHTTPMethod 方法之所以要创建一个 dataTask 是为了方面我们后面的处理,这也是 AFNetworking 中的一关键点。

```objc
- (NSURLSessionDataTask *)dataTaskWithHTTPMethod:(NSString *)method
                                       URLString:(NSString *)URLString
                                      parameters:(id)parameters
                                  uploadProgress:(nullable void (^)(NSProgress *uploadProgress)) uploadProgress
                                downloadProgress:(nullable void (^)(NSProgress *downloadProgress)) downloadProgress
                                         success:(void (^)(NSURLSessionDataTask *, id))success
                                         failure:(void (^)(NSURLSessionDataTask *, NSError *))failure
{
    NSError *serializationError = nil;
    NSMutableURLRequest *request = [self.requestSerializer requestWithMethod:method URLString:[[NSURL URLWithString:URLString relativeToURL:self.baseURL] absoluteString] parameters:parameters error:&serializationError];
    if (serializationError) {
        if (failure) {
            dispatch_async(self.completionQueue ?: dispatch_get_main_queue(), ^{
                failure(nil, serializationError);
            });
        }

        return nil;
    }

    __block NSURLSessionDataTask *dataTask = nil;
    dataTask = [self dataTaskWithRequest:request
                          uploadProgress:uploadProgress
                        downloadProgress:downloadProgress
                       completionHandler:^(NSURLResponse * __unused response, id responseObject, NSError *error) {
        if (error) {
            if (failure) {
                failure(dataTask, error);
            }
        } else {
            if (success) {
                success(dataTask, responseObject);
            }
        }
    }];

    return dataTask;
}
```
上面这个是创建 dataTask 的一个详细过程，首先参数有请求的方法、URL、参数，上传、下载的闭包、成功和失败的回调，返回的是一个 dataTask 对象。函数里面的实现主要是通过创建了一个 NSMutableURLRequest 对象，来创建请求，调用的是 requestSerializer 对象的方法，这其实是在对我们的请求进行序列化，如果序列化失败了看一下完成队列如果空了就回到主线程，如果没有就还是执行当前为完成的队列，并且初始化了 dataTask 对象。接着我们继续往下看

``` objc
- (NSURLSessionDataTask *)dataTaskWithRequest:(NSURLRequest *)request
                               uploadProgress:(nullable void (^)(NSProgress *uploadProgress)) uploadProgressBlock
                             downloadProgress:(nullable void (^)(NSProgress *downloadProgress)) downloadProgressBlock
                            completionHandler:(nullable void (^)(NSURLResponse *response, id _Nullable responseObject,  NSError * _Nullable error))completionHandler {

    __block NSURLSessionDataTask *dataTask = nil;
    url_session_manager_create_task_safely(^{
        dataTask = [self.session dataTaskWithRequest:request];
    });

    [self addDelegateForDataTask:dataTask uploadProgress:uploadProgressBlock downloadProgress:downloadProgressBlock completionHandler:completionHandler];

    return dataTask;
}
```
这个时候就来到了 AFURLSessionManager 这一块儿来了，也就是说创建请求，请求序列化的实现都是在 AFHTTPSessionManager 这个层次实现的，序列化之后就需要创建 dataTask 了而这个地方使用了一个闭包 `url_session_manager_create_task_safely` ，在闭包中通过 request 初始化了一个 dataTask，然后设置当前这个 dataTask 的代理。而这个方法 

```objc
/* Creates a data task with the given request.  The request may have a body stream. */
- (NSURLSessionDataTask *)dataTaskWithRequest:(NSURLRequest *)request;
```
是在系统提供的 NSURLSession 中的方法。而构建 task 代理的实现中最重要的是在一开始的时候创建了一个 AFURLSessionManagerTaskDelegate 的对象 delegate 这个对象初始化的时候将我们要设置的 task 传入了进去，这个地方在 init 的时候传入 task 是为了获取 tast 的各项属性或者数据因为在前面我们会看到了这样的东西
```objc
@interface AFURLSessionManagerTaskDelegate : NSObject <NSURLSessionTaskDelegate, NSURLSessionDataDelegate, NSURLSessionDownloadDelegate>
```
并且实例方法的声明中只声明了
```objc
- (instancetype)initWithTask:(NSURLSessionTask *)task;
```
但是在后面我们能够看到实现中针对上面声明需要遵守的代理都进行了实现
```objc
#pragma mark - NSURLSessionTaskDelegate

- (void)URLSession:(__unused NSURLSession *)session
              task:(NSURLSessionTask *)task
didCompleteWithError:(NSError *)error
{
    __strong AFURLSessionManager *manager = self.manager;

    __block id responseObject = nil;

    __block NSMutableDictionary *userInfo = [NSMutableDictionary dictionary];
    userInfo[AFNetworkingTaskDidCompleteResponseSerializerKey] = manager.responseSerializer;

    //Performance Improvement from #2672
    NSData *data = nil;
    if (self.mutableData) {
        data = [self.mutableData copy];
        //We no longer need the reference, so nil it out to gain back some memory.
        self.mutableData = nil;
    }

    if (self.downloadFileURL) {
        userInfo[AFNetworkingTaskDidCompleteAssetPathKey] = self.downloadFileURL;
    } else if (data) {
        userInfo[AFNetworkingTaskDidCompleteResponseDataKey] = data;
    }

    if (error) {
        userInfo[AFNetworkingTaskDidCompleteErrorKey] = error;

        dispatch_group_async(manager.completionGroup ?: url_session_manager_completion_group(), manager.completionQueue ?: dispatch_get_main_queue(), ^{
            if (self.completionHandler) {
                self.completionHandler(task.response, responseObject, error);
            }

            dispatch_async(dispatch_get_main_queue(), ^{
                [[NSNotificationCenter defaultCenter] postNotificationName:AFNetworkingTaskDidCompleteNotification object:task userInfo:userInfo];
            });
        });
    } else {
        dispatch_async(url_session_manager_processing_queue(), ^{
            NSError *serializationError = nil;
            responseObject = [manager.responseSerializer responseObjectForResponse:task.response data:data error:&serializationError];

            if (self.downloadFileURL) {
                responseObject = self.downloadFileURL;
            }

            if (responseObject) {
                userInfo[AFNetworkingTaskDidCompleteSerializedResponseKey] = responseObject;
            }

            if (serializationError) {
                userInfo[AFNetworkingTaskDidCompleteErrorKey] = serializationError;
            }

            dispatch_group_async(manager.completionGroup ?: url_session_manager_completion_group(), manager.completionQueue ?: dispatch_get_main_queue(), ^{
                if (self.completionHandler) {
                    self.completionHandler(task.response, responseObject, serializationError);
                }

                dispatch_async(dispatch_get_main_queue(), ^{
                    [[NSNotificationCenter defaultCenter] postNotificationName:AFNetworkingTaskDidCompleteNotification object:task userInfo:userInfo];
                });
            });
        });
    }
}
```
而根据这个地方的代理我们可以知道主要是对 NSURLSession 中的三种代理进行的实现。具体的细节可以对比 NSURLSession 中的几个代理需要完成的实现的方法看一下。看到了这里笔者有一个思考了，如果说对于 HTTP 请求的执行动作的监控，比如什么时候对应一个什么动作，十分类似 VC 中的 didFinishLauch 这种我们可以手动改写 AF 此处的底层实现，如果我们不了解这个代码的架构我们将无从下手。

上面我们粘贴了非常多的代码，这并不是为了拼凑字数而是为了更好的向读者展示这个方法到底是怎么实现的。对于上面的一个流程我们可以用下面的这个图片简单地总结一下：

<center>
![IMAGE](https://github.com/Yousanflics/yousanflics.github.io/blob/master/img/POST_Flow.png)
</center>

## 基于 AFNetworking 的优化
- 在进行优化的探索之前我们要明白一下代码中的几个对象与我们所知道的 HTTP 请求中的模型的对应关系，不然我们无从下手。 AFHTTPSessionManager 创建的 manager 与我们的 task 相对应有了这个 manager 我们会调用 get 的方法然后发起请求、序列化、创建方法、然后添加 task 到运行队列、task 执行，很显然我们想把这个 manager 当做我们在 HTTP 请求中的可复用的 TCP 连接，但是很显然这不太可能因为我们创建这样对象的次数没有限制，我们知道 TCP 创建连接的时候会发起三次握手，这会让我们的请求时间变长，所以我们并不想有动不动就创建一个 TCP 链接，因此我们可以考虑复用这个 manager 但是如果让 manager 就只有一个呢，我们很快就能联想到单例模式，我们可以通过创建一个 AFHTTPSessionManager 的子类来实现我们的复用机制。
- 还有一种就是在 APP 端设置最大的并发请求数目，如在 AFURLSessionManager 的实现文件中设置
```objc
self.OperationQueue = [[NSOperationQueue alloc] init]
self.OperationQueue.maxConcurrentOperationCount = 1;
```
这样就会复用之前的 Session 了

- 在 APP 端设置 keep-alive 为 YES，同时服务端也要做对应的处理

```objc
if(!configuration){
    configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
}
self.sessionConfiguration.HTTPShouldUsePipelining = YES;
self.configuration = configuration;
```