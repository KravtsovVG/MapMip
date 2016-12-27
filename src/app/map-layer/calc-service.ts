import { Injectable } from '@angular/core';

@Injectable()
export class CalcService{

  constructor() { }

  toDegrees(radian:number) {
    let deg:number = Cesium.Math.toDegrees(radian);
    return ((deg % 360) + 360) % 360;
  }

  toRadians(degree:number) {
    let pos_degree = ((degree % 360) + 360) % 360;
    return Cesium.Math.toRadians(pos_degree);
  }

}