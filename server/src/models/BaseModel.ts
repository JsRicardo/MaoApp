import { validate } from "class-validator";
import { ClassType } from "class-transformer/ClassTransformer";
import { plainToClass } from "class-transformer";

export abstract class BaseModel {
  /**
   * 验证当前对象
   * @param skipMissing: 是否跳过没传属性的验证
   */
  public async validateThis(skipMissing = false): Promise<string[]> {
    const errors = await validate(this, {
      skipMissingProperties: skipMissing
    });
    const temp = errors.map(e => Object.values(e.constraints));
    const results: string[] = [];
    temp.forEach(t => results.push(...t));
    return results;
  }

 /**
  * 类型转换，将 plainObject 转换为目标类型 cls
  * @param cls 目标类型
  * @param plainObject 平面类型
  */
  protected static baseTransform<T>(cls: ClassType<T>, plainObject: object): T{
    if (plainObject instanceof cls) {
      return plainObject;
    }
    return plainToClass(cls, plainObject);
  }
}