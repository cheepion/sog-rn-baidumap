/**
 * Copyright (c) 2016-present, lovebing.org.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 import {
  NativeModules,
  DeviceEventEmitter
} from 'react-native';

import React, {
  Component,
  PropTypes
} from 'react';

// BD09ll: 'bd09ll',   // 百度坐标
// GCJ02: 'gcj02'     // 火星坐标 google
const _module = NativeModules.BaiduGeolocationModule;

const _locatingUpdateListener = {
  listener: null,
  handler: null,
  onLocationUpdate: (resp) => {
    this.listener && this.listener(resp);
  },
  setListener: (listener) => {
    this.listener = listener;
  }
}

// 修改类库代码, 将DeviceEventEmitter.once修改, once方法在新版库里已被放弃
export default {
  geocode(city, addr) {
    return new Promise((resolve, reject) => {
      try {
        _module.geocode(city, addr);
      }
      catch (e) {
        reject(e);
        return;
      }
      if (_locatingUpdateListener.handler == null) {
        _locatingUpdateListener.handler = DeviceEventEmitter.addListener('onGetGeoCodeResult', resp => {
          resolve(resp);
        });
      }
    });
  },
  convertGPSCoor(lat, lng) {
    return _module.convertGPSCoor(lat, lng);
  },
  reverseGeoCode(lat, lng) {
    return new Promise((resolve, reject) => {
      try {
        _module.reverseGeoCode(lat, lng);
      }
      catch (e) {
        reject(e);
        return;
      }
      if (_locatingUpdateListener.handler == null) {
        _locatingUpdateListener.handler = DeviceEventEmitter.addListener('onGetReverseGeoCodeResult', resp => {
          resolve(resp);
        });
      }
    });
  },
  reverseGeoCodeGPS(lat, lng) {
    return new Promise((resolve, reject) => {
      try {
        _module.reverseGeoCodeGPS(lat, lng);
      }
      catch (e) {
        reject(e);
        return;
      }
      if (_locatingUpdateListener.handler == null) {
        _locatingUpdateListener.handler = DeviceEventEmitter.addListener('onGetReverseGeoCodeResult', resp => {
          resp.latitude = parseFloat(resp.latitude);
          resp.longitude = parseFloat(resp.longitude);
          resolve(resp);
        });
      }
    });
  },

  // listener传入的监听变量, 用于取消
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      try {
        _module.getCurrentPosition("bd09ll");
      }
      catch (e) {
        reject(e);
        return;
      }
      if (_locatingUpdateListener.handler == null) {
        _locatingUpdateListener.handler = DeviceEventEmitter.addListener('onGetCurrentLocationPosition', resp => {
          if (resp.errcode) {
            reject(resp)
            return;
          }
          if (!resp.address) {
            resp.address = `${resp.province} ${resp.city} ${resp.district} ${resp.streetName}`;
          }
          console.log("resp", resp)
          resolve(resp);
        });
      }
    });
  },
  startLocating(listener, coorType) {
    if (!coorType) {
      coorType = 'bd09ll';
    } else {
      coorType = coorType.toLowerCase();
    }
    _module.startLocating(coorType);
    if (_locatingUpdateListener.handler == null) {
      _locatingUpdateListener.handler = DeviceEventEmitter.addListener('onLocationUpdate', resp => {
        if (!resp.address) {
          resp.address = `${resp.province} ${resp.city} ${resp.district} ${resp.streetName}`;
        }
        _locatingUpdateListener.onLocationUpdate(resp);
      });
    }
    _locatingUpdateListener.setListener(listener);
  },
  stopLocating() {
    _module.stopLocating();
    if (_locatingUpdateListener.handler != null) {
      _locatingUpdateListener.handler.remove();
      _locatingUpdateListener.handler = null;
    }
  }
};
