//
//  ReactFuelMethod.swift
//  MinhTienDao_Lab2_NativeModules
//
//  Created by Tien Dao on 2022-07-11.
//

import Foundation

@objc(ReactFuelMethod)
class ReactFuelMethod: RCTEventEmitter {
  private var arrayResult: [String] = []
  @objc
  override static func requiresMainQueueSetup() ->Bool{
    return true;
  }
  override func supportedEvents() -> [String]! {
     return [];
  }
  
  @objc
  func getFuelData(_ resolve:RCTPromiseResolveBlock,
                   reject:RCTPromiseRejectBlock) {
    do {
      let userMaxAllowance = "600";
      let fuelType1 = "Petrol";
      let fuelType2 = "Diesel";
      let fuelType3 = "BatteryCharge";

      let pricePerLiter1 = "30";
      let pricePerLiter2 = "40";
      let pricePerLiter3 = "10";
      if (arrayResult.isEmpty) {
        arrayResult.append(contentsOf: [userMaxAllowance,fuelType1,pricePerLiter1,fuelType2,pricePerLiter2,fuelType3,pricePerLiter3])
      }
      resolve(arrayResult)
    }
    catch{
      reject("ERROR", "Cannot get device info", error)
    }
  }
  
  @objc
  func getBlanceCheck(_ userAvailableBalance: Int, userMaxAllowance: Int,resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
      if(userAvailableBalance > userMaxAllowance){
          resolve(true)

      }else{
          resolve(false)
      }
  }
}
