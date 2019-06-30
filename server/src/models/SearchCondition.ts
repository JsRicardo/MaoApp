import { IsInt, Min } from "class-validator";
import { BaseModel } from "./BaseModel";
import { Type } from "class-transformer";

export class SearchCondition extends BaseModel {

  public static transform(plainObj: object): SearchCondition {
    return super.baseTransform(SearchCondition, plainObj);
  }

  @IsInt({ message: "当前页必须是整数" })
  @Min(1, { message: "页码最小值为1" })
  @Type(() => Number)
  public nowPage: number = 1;

  @IsInt({ message: "每页数量必须是整数" })
  @Min(1, { message: "每页至少有1个项目" })
  @Type(() => Number)
  public pageSize: number = 10;

  /**
   * 搜索关键字
   */
  @Type(() => String)
  public key: string = "";
}