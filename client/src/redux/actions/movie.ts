import { IAction } from "./ActionTypes";
import { IMovie } from "../../services/MovieService";
import { ISearchCondition } from "../../commonTypes";

export type SaveMovieAction = IAction<"SAVE_MOVIE", { movies: IMovie[]; total: number }>
/**
 * 保存电影到store
 * @param movies 电影数组
 * @param total 电影总数
 */
export const saveMovieAction = (movies: IMovie[], total: number): SaveMovieAction => {
  return {
    type: "SAVE_MOVIE",
    payload: {
      movies,
      total
    }
  }
}

export type setIsLoading = IAction<"SET_MOVIE_ISLOADING", boolean>
/**
 * 设置电影加载状态
 * @param isLoading 是否正在加载
 */
export const setIsLoadingAction = (isLoading: boolean): setIsLoading => {
  return {
    type: "SET_MOVIE_ISLOADING",
    payload: isLoading
  }
}

export type SetCondition = IAction<"SET_CONDITION", ISearchCondition>
/**
 * 设置查询电影参数
 * @param condition 查询电影参数
 */
export const setConditionAction = (condition: ISearchCondition): SetCondition => {
  return {
    type: "SET_CONDITION",
    payload: condition
  }
}

export type DeleteMovie = IAction<"DELETE_MOVIE", string>
/**
 * 删除store中的电影
 * @param id 电影id
 */
export const deleteMovieAction = (id: string): DeleteMovie => {
  return {
    type: "DELETE_MOVIE",
    payload: id
  }
}

export type MovieActions = DeleteMovie | SetCondition | setIsLoading | SaveMovieAction