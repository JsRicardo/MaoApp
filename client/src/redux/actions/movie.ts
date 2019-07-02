import { IAction } from "./ActionTypes";
import { IMovie, MovieService } from "../../services/MovieService";
import { ISearchCondition } from "../../commonTypes";
import { ThunkAction } from "redux-thunk"
import { IRootState } from "../reducers";

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

export type ChangeSwitchAction = IAction<"CHANGE_SWITCH", {
  type: "isHot" | "isComing" | "isClassical",
  newVal: boolean,
  id: string
}>

export function changeSwitchAction(type: "isHot" | "isComing" | "isClassical", newVal: boolean, id: string): ChangeSwitchAction {

  return {
    type: 'CHANGE_SWITCH',
    payload: {
      type,
      newVal,
      id
    }
  }
}

export type MovieActions = DeleteMovie | SetCondition | setIsLoading | SaveMovieAction | ChangeSwitchAction


export function fetchMovies(condition: ISearchCondition)
  : ThunkAction<Promise<void>, IRootState, any, MovieActions> {
  return async (dispatch, getState) => {
    //设置加载状态
    dispatch(setIsLoadingAction(true))
    //设置条件
    dispatch(setConditionAction(condition))
    //获取服务器数据
    const curCondition = getState().movie.condition
    const resp = await MovieService.getMovieList(curCondition)
    //更改仓库数据
    dispatch(saveMovieAction(resp.data, resp.total))
    //关闭加载状态
    dispatch(setIsLoadingAction(false))
  }
}
export function deletMovie(id: string)
  : ThunkAction<Promise<void>, IRootState, any, MovieActions> {
  return async (dispatch) => {
    //设置加载状态
    dispatch(setIsLoadingAction(true))
    //删除服务器数据
    await MovieService.delete(id)
    //更改仓库数据
    dispatch(deleteMovieAction(id))
    //关闭加载状态
    dispatch(setIsLoadingAction(false))
  }
}
export function updateMovie(type: "isHot" | "isComing" | "isClassical", newVal: boolean, id: string)
  : ThunkAction<Promise<void>, IRootState, any, MovieActions> {
  return async dispatch => {
    dispatch(changeSwitchAction(type, newVal, id))
    await MovieService.edit(id, { [type]: newVal })
  }
}