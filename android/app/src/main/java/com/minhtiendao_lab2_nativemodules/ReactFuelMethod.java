package com.minhtiendao_lab2_nativemodules;

import static java.security.AccessController.getContext;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.Configuration;
import android.os.Build;
import android.provider.Settings;
import android.telephony.TelephonyManager;
import android.util.DisplayMetrics;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.Locale;
import java.util.Objects;


import com.minhtiendao_lab2_nativemodules.BuildConfig;

public class ReactFuelMethod extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    String fuelPrice ="";
    ArrayList<String> fuelData = new ArrayList<String>();

    ReactFuelMethod(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }


    @NonNull
    @Override
    public String getName() {
        return "ReactFuelMethod";
    }

    @ReactMethod
    public void getFuelData(Promise response) {
        try {

            String userMaxAllowance = "600";
            String fuelType1 = "Petrol";
            String fuelType2 = "Diesel";
            String fuelType3 = "BatteryCharge";

            String pricePerLiter1 = "30";
            String pricePerLiter2 = "40";
            String pricePerLiter3 = "10";
            if (fuelData.isEmpty()) {
                Collections.addAll(fuelData, userMaxAllowance, fuelType1, pricePerLiter1, fuelType2, pricePerLiter2, fuelType3, pricePerLiter3);
            }
            String[] returnArray = new String[fuelData.size()];
            returnArray = fuelData.toArray(returnArray);

            WritableArray promiseArray= Arguments.createArray();
            for(int i=0;i<returnArray.length;i++){
                promiseArray.pushString(returnArray[i]);
            }
            response.resolve(promiseArray);

        } catch (Exception e) {
            response.reject("Error", e);
        }
    }

    @ReactMethod
    public void getBlanceCheck( int userAvailableBalance, int userMaxAllowance,Promise response) {
        try {
            if ((userAvailableBalance-userMaxAllowance) >=0){
                response.resolve(true);
            }
            else {
                response.resolve(false);
            }
        } catch (Exception e) {
            response.reject("Error", e);
        }


    }
}