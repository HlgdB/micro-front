/*
 * @Descripttion: 数据接口
 * @Author: linkenzone
 * @Date: 2021-01-11 14:32:28
 */

export interface ImgRegionToolDataType {
  // 状态
  toolState: string;

  // 选区
  regions: any[];
  maxId: number;
  regionsStrokeWidth: number;
  regionsFontSize: number;
}
