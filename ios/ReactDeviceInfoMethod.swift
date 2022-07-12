//
//  ReactDeviceInfoMethod.swift
//  MinhTienDao_Lab2_NativeModules
//
//  Created by Tien Dao on 2022-07-11.
//

import Foundation

@objc(ReactDeviceInfoMethod)
class ReactDeviceInfoMethod: RCTEventEmitter {
  
  private var arrayResult: [String] = []
  @objc
  override static func requiresMainQueueSetup() ->Bool{
    return true;
  }
  override func supportedEvents() -> [String]! {
     return [];
  }
  @objc
    func getPhoneID(_ resolve:RCTPromiseResolveBlock,
                         reject:RCTPromiseRejectBlock){

      let currentDevice = UIDevice.self

      let deviceId = currentDevice.current.identifierForVendor!.uuidString

      let deviceType = currentDevice.current.model

      let deviceName = currentDevice.current.name

      let deviceHardware = currentDevice.current.model

      let sysVersion = currentDevice.current.systemVersion

      let deviceLang = Locale.preferredLanguages[0]

      let bundleId = Bundle.main.bundleIdentifier

      let builderNumber = Bundle.main.infoDictionary!["CFBundleShortVersionString"]

      

      do {


        arrayResult.append(deviceId)
        arrayResult.append(deviceType)
        arrayResult.append(deviceName)
        arrayResult.append(deviceHardware)
        arrayResult.append(sysVersion)
        arrayResult.append(deviceLang)
        arrayResult.append(bundleId!)
        arrayResult.append(builderNumber as! String)
        
        resolve(arrayResult)
      }catch{

        reject("ERROR", "Cannot get device info", error)
      }
      }
}
