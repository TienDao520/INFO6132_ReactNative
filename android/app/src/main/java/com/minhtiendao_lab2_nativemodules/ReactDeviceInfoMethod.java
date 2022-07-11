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

public class ReactDeviceInfoMethod extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    ArrayList<String> deviceInfo = new ArrayList<String>();

    ReactDeviceInfoMethod(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    public static boolean isTablet(Context context) {
        return (context.getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) >= Configuration.SCREENLAYOUT_SIZE_LARGE;
    }

    public static boolean getDeviceMoreThan5Inch(Context activity) {
        try {
            DisplayMetrics displayMetrics = activity.getResources().getDisplayMetrics();
            // int width = displayMetrics.widthPixels;
            // int height = displayMetrics.heightPixels;

            float yInches = displayMetrics.heightPixels / displayMetrics.ydpi;
            float xInches = displayMetrics.widthPixels / displayMetrics.xdpi;
            double diagonalInches = Math.sqrt(xInches * xInches + yInches * yInches);
            if (diagonalInches >= 7) {
                // 5inch device or bigger
                return true;
            } else {
                // smaller device
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "ReactDeviceInfoMethod";
    }

    @ReactMethod
    public void getPhoneID(Promise response) {
        try {
            @SuppressLint("HardwareIds") String deviceID = Settings.Secure.getString(reactContext.getContentResolver(), Settings.Secure.ANDROID_ID);
//            @SuppressLint("HardwareIds") String deviceLang = Settings.Secure.getString(reactContext.getContentResolver(), Locale.getDefault().getDisplayLanguage());
            String deviceLang = Locale.getDefault().getDisplayLanguage();
            String deviceName = Build.DEVICE;
            String deviceManufacture = Build.MANUFACTURER;
            String deviceHardware = Build.HARDWARE;
            String sysVersion = System.getProperty("os.version");

            String deviceType = "Mobile";

            String versionCode = new String(String.valueOf(BuildConfig.VERSION_CODE));
            String versionName = BuildConfig.VERSION_NAME;


//            if (isTablet(this)) {
//                if (getDeviceMoreThan5Inch(this)) {
//                    return "Tablet";
//                } else
//                    return "Mobile";
//            } else {
//                return "Mobile";
//            }

            TelephonyManager manager = (TelephonyManager)reactContext.getSystemService(Context.TELEPHONY_SERVICE);
            if (Objects.requireNonNull(manager).getPhoneType() == TelephonyManager.PHONE_TYPE_NONE) {
//                Toast.makeText(MainActivity.this, "Detected... You're using a Tablet", Toast.LENGTH_SHORT).show();
                deviceType = "Tablet";
            } else {
//                Toast.makeText(MainActivity.this, "Detected... You're using a Mobile Phone", Toast.LENGTH_SHORT).show();
                deviceType = "Mobile";
            }

//            DisplayMetrics metrics = new DisplayMetrics();
//            getActivity().getWindowManager().getDefaultDisplay().getMetrics(metrics);
//
//            float yInches= metrics.heightPixels/metrics.ydpi;
//            float xInches= metrics.widthPixels/metrics.xdpi;
//            double diagonalInches = Math.sqrt(xInches*xInches + yInches*yInches);
//            if (diagonalInches>=6.5){
//                // 6.5inch device or bigger
//            }else{
//                // smaller device
//            }

            String android_id = Settings.Secure.getString(reactContext.getContentResolver(),
                    Settings.Secure.ANDROID_ID);
            if (deviceInfo.isEmpty()) {
                Collections.addAll(deviceInfo, deviceID, deviceType, deviceName, deviceHardware, sysVersion, deviceLang, versionCode, versionName);
            }
            String[] returnArray = new String[deviceInfo.size()];
            returnArray = deviceInfo.toArray(returnArray);

            WritableArray promiseArray= Arguments.createArray();
            for(int i=0;i<returnArray.length;i++){
                promiseArray.pushString(returnArray[i]);
            }
            response.resolve(promiseArray);
        } catch (Exception e) {
            response.reject("Error", e);
        }
    }
}