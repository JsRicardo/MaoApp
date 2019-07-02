import { IMovie } from "../../services/MovieService";
import { ISearchCondition } from "../../commonTypes";
import { MovieActions } from "../actions/movie";

export type IMovieCondition = Required<ISearchCondition>

/**
 * 电影状态
 */
export interface IMovieState {
  data: IMovie[]
  /**
   * 查询条件
   */
  condition: IMovieCondition
  total: number
  /**
   * 是否正在加载
   */
  isLoading: boolean,
  totalPage: number
}

const initState: IMovieState = {
  data: [],
  condition: {
    nowPage: 1,
    pageSize: 10,
    key: ""
  },
  total: 0,
  isLoading: false,
  totalPage: 0
}

export default function (state: IMovieState = initState, action: MovieActions) {
  const newState: IMovieState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "DELETE_MOVIE":
      newState.data = newState.data.filter(m => m._id !== action.payload)
      newState.total--
      newState.totalPage = Math.ceil(newState.total / newState.condition.pageSize)
      return newState
    case "SAVE_MOVIE":
      newState.data = action.payload.movies
      newState.total = action.payload.total
      newState.totalPage = Math.ceil(newState.total / newState.condition.pageSize)
      return newState
    case "SET_CONDITION":
      const curState = {
        ...newState,
        condition: {
          ...newState.condition,
          ...action.payload
        }
      }
      curState.totalPage = Math.ceil(curState.total / curState.condition.pageSize)
      return curState
    case "SET_MOVIE_ISLOADING":
      newState.isLoading = action.payload
      return newState
    case "CHANGE_SWITCH":
      const movie = newState.data.find(d => d._id === action.payload.id);
      if (!movie) {
        return newState
      } else {
        movie[action.payload.type] = action.payload.newVal
        return newState
      }
    default:
      return newState
  }
}
