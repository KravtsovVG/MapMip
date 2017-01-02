/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {CalcService} from "./calc-service";

fdescribe('CalcServiceService', () => {
  let calcService:CalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcService]
    });
  });

  beforeEach(inject([CalcService], (_calcService: CalcService) => {
    calcService = _calcService;
  }));

  it('should calcService be defined', () => {
    expect(calcService).toBeDefined();
  });

  it('toDegrees to return only positive degrees between 0 to 359', () => {
    let radian_number = Cesium.Math.toRadians(360); // Equal to 6.283185307179586
    let positive_deg = calcService.toDegrees(radian_number);
    expect(positive_deg).toEqual(0);
    radian_number = Cesium.Math.toRadians(-270);
    positive_deg = calcService.toDegrees(radian_number);
    expect(positive_deg).toEqual(90);
  });

  it('toRadians to return only positive degrees between 0 to 6.283185307179586', () => {
    let degree_number = Cesium.Math.toDegrees(6.283185307179586); // Equal to 360
    let positive_rad = calcService.toRadians(degree_number);
    expect(positive_rad).toEqual(0);
    degree_number = Cesium.Math.toDegrees(-4.71238898038469); // Equal to -270
    positive_rad = calcService.toRadians(degree_number);
    expect(positive_rad).toEqual(1.5707963267948966);
  });

  it('toFixed7Obj should return all number of obj, keeping only 7 decimals ', () => {
    let obj:{a:number, b:number} = {
      a: 1.123456789,
      b: 9.987654321,
    };
    let convertedObj:{a:number, b:number} = calcService.toFixes7Obj(obj);
    expect(convertedObj.a).toEqual(1.1234568);
    expect(convertedObj.b).toEqual(9.9876543);
  });



  // toDegrees(radian:number) {
  //   let deg:number = Cesium.Math.toDegrees(radian);
  //   return ((deg % 360) + 360) % 360;
  // }
  //
  // toRadians(degree:number) {
  //   let pos_degree = ((degree % 360) + 360) % 360;
  //   return Cesium.Math.toRadians(pos_degree);
  // }
  //
  // toFixes7Obj(obj) {
  //   _.forEach(obj, (val, key) => {
  //     obj[key] = +(+val).toFixed(7)
  //   });
  //   return obj;
  // }
});
