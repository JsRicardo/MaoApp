import { Response } from "express";
import { ISearchResult } from "../models/CommenTypes";

/**
 * 规定响应体格式
 */
export class ResponseHelper {
  /**
   * 响应错误
   * @param err 错误信息
   * @param res 响应体
   */
  public static sendError(err: string | string[], res: Response) {
    let error: string
    if (Array.isArray(err)) {
      error = err.join(';')
    } else {
      error = err
    }

    res.send({
      error,
      data: null
    })
  }

  /**
   * 响应普通结果
   * @param data 数据
   * @param res 响应体
   */
  public static sendData(data: any, res: Response) {
    res.send({
      err: "",
      data
    })
  }

  /**
   * 响应分页的结果
   * @param result 带分页的查询结果
   * @param res 响应体
   */
  public static sendPageData<T>(result: ISearchResult<T>, res: Response) {
    if (result.errors.length > 0) {
      this.sendError(result.errors, res)
    } else { 
      res.send({
        err: "",
        data: result.data,
        total: result.count
      })
    }
  }
}