import { IsNotEmpty, ArrayMinSize, IsInt, Max, Min, IsArray } from "class-validator";
import { Type } from "class-transformer";

// movie实体类
// 定义电影类的验证规则

export class Movie {
  @IsNotEmpty({ message: "电影名称不能为空" })
  @Type(() => String)
  public name: string;

  @IsNotEmpty({ message: "电影类型不能为空" })
  @ArrayMinSize(1, { message: "电影类型至少需要有一个" })
  @IsArray({ message: "电影类型必须是数组类型" })
  @Type(() => String)
  public types: string[];

  @IsNotEmpty({ message: "上映地区不能为空" })
  @ArrayMinSize(1, { message: "上映地区至少需要有一个" })
  @IsArray({ message: "电影类型必须是数组类型" })
  @Type(() => String)
  public areas: string[];

  @IsInt({ message: "电影时长必须是整数" })
  @Min(1, { message: "电影时长必须大于1分钟" })
  @Max(1000, { message: "电影时长不能大于1000分钟" })
  @IsNotEmpty({ message: "电影时长不能为空" })
  @Type(() => Number)
  public timeLong: number;

  @IsNotEmpty({ message: "是否热映不能为空" })
  @Type(() => Boolean)
  public isHot: boolean = false;

  @IsNotEmpty({ message: "即将上映不能为空" })
  @Type(() => Boolean)
  public isComing: boolean = false;

  @IsNotEmpty({ message: "是否经典不能为空" })
  @Type(() => Boolean)
  public isClassical: boolean = false;

  @Type(() => String)
  public description?: string;

  @IsNotEmpty({ message: "电影封面图不能为空" })
  @Type(() => String)
  public poster: string;
}