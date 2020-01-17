import { Movie } from "../models/Movie";
import { IMovie } from "../database/MovieSchema";
import { MovieModel } from "../database";
import { SearchCondition } from "../models/SearchCondition";
import { ISearchResult } from "../models/CommenTypes";

export class MovieService {
  public static async add(movie: Movie): Promise<IMovie | string[]> {
    // 1 转换类型
    movie = Movie.transform(movie);
    // 2 数据验证
    const errors = await movie.validateThis();
    if (errors.length > 0) {
      return errors;
    }
    // 3 添加到数据库
    return await MovieModel.create(movie);
  }

  public static async edit(id: string, movie: Movie): Promise<string[]> {
    // 1 转换类型
    const movieObj = Movie.transform(movie);
    // 2 数据验证
    const errors = await movieObj.validateThis(true);
    if (errors.length > 0) {
      return errors;
    }
    // 3 修改数据库
    await MovieModel.updateOne({ _id: id }, movie);
    return errors;
  }

  public static async delete(id: string): Promise<void> {
    await MovieModel.deleteOne({ _id: id });
  }

  public static async findById(id: string): Promise<IMovie | null> {
    return await MovieModel.findById({ _id: id });
  }

  public static async find(condition: SearchCondition): Promise<ISearchResult<IMovie>> {
    // 1 转换类型
    const searchCondition = SearchCondition.transform(condition);
    // 2 数据验证
    const errors = await searchCondition.validateThis();
    if (errors.length > 0) {
      return {
        errors,
        data: [],
        count: 0,
      };
    }
    // 3 查询
    const movies = await MovieModel.find({
      name: { $regex: new RegExp(searchCondition.key) },
    }).skip((searchCondition.nowPage - 1) * searchCondition.pageSize).limit(searchCondition.pageSize);

    const count = await MovieModel.find({
      name: { $regex: new RegExp(searchCondition.key) },
    }).countDocuments();

    return {
      errors: [],
      data: movies,
      count,
    };
  }
}