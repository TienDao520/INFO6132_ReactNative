//
//  ReactDeviceInfoMethod.m
//  MinhTienDao_Lab2_NativeModules
//
//  Created by Tien Dao on 2022-07-12.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"



@interface RCT_EXTERN_MODULE(ReactDeviceInfoMethod,RCTEventEmitter)

RCT_EXTERN_METHOD(getPhoneID:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject);

@end
