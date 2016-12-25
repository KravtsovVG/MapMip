import {Injectable} from '@angular/core';
import {Params, NavigationExtras} from "@angular/router";
import {isUndefined} from "util";

@Injectable()
export class QueryParamsHelperService {

  constructor() { }

  queryBounds(params:Params):[number, number, number, number] {
    let boundsString = params['bounds'];
    let bounds:[number, number, number, number] = boundsString.split(',').map(strToNum => +strToNum);
    return bounds;
  }

  hasQueryBounds(params:Params):boolean {
    let boundsString = params['bounds'];
    return !isUndefined(boundsString)
  }
  queryLat(params:Params):number {
    return +params['lat'] || 0;
  }
  queryLng(params:Params):number {
    return +params['lng'] || 0;
  }
  queryZoom(params:Params):number {
    return +params['zoom'] || 0;
  }
  queryHeading(params:Params):number {
    return +params['heading'] || 0;
  }
  queryRoll(params:Params) {
    return +params['roll'] || 0;
  }
  queryHeight(params:Params):number {
    return +params["height"] || 0;
  }
  queryPitch(params:Params):number {
    return +params['pitch'] || -90;
  }
  queryDim(params:Params) {
    return +params['dim'] || 3;
  }
  queryRotate(params:Params):number {
    if(isNaN(+params['rotate'])) return 0;
    return +params['rotate']  ;
  }

  queryMarkers(params:Params){
    let markersStr = params['markers'];
    if(!markersStr) return [];
    markersStr = markersStr.split(" ").join("").split("),(").map((one, index) => index == 0 ? one + ")" : index + 1 === markersStr.split("),(").length ? "(" + one : "(" + one + ")");
    let markers = markersStr.map(one => one.split("(").join("").split(")").join("").split(",").map((strToNum) => +strToNum));
    return markers;
  }

  getQuery(queryObj):NavigationExtras {
    queryObj.roll =  queryObj.roll % 360  == 0 ? undefined : queryObj.roll;
    queryObj.heading = queryObj.heading % 360  == 0 ? undefined : queryObj.heading;
    queryObj.pitch = queryObj.pitch == -90 ? undefined : queryObj.pitch;
    queryObj.dim = queryObj.dim == 2 ? queryObj.dim : undefined;
    queryObj.rotate = queryObj.rotate == 0 ? undefined : queryObj.rotate;

    return <NavigationExtras> {
      queryParams: queryObj
    };
  }

}
