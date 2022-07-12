//
//  ReactFuelMethod.m
//  MinhTienDao_Lab2_NativeModules
//
//  Created by Tien Dao on 2022-07-12.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"



@interface RCT_EXTERN_MODULE(ReactFuelMethod,RCTEventEmitter)

RCT_EXTERN_METHOD(getFuelData:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject);

RCT_EXTERN_METHOD(getBlanceCheck:(NSInteger *)userAvailableBalance userMaxAllowance:(NSInteger *)userMaxAllowance resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject);
@end
