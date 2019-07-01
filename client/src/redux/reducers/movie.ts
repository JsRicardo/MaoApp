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
  isLoading: boolean
}

const initState: IMovieState = {
  data: [],
  condition: {
    nowPage: 1,
    pageSize: 10,
    key: ""
  },
  total: 0,
  isLoading: false
}

export default function (state = initState, action: MovieActions) {
  const newState: IMovieState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "DELETE_MOVIE":
      return newState.data.filter(m => {
        m._id != action.payload
      })
    case "SAVE_MOVIE":
      newState.data = action.payload.movies
      newState.total = action.payload.total
      return newState
    case "SET_CONDITION":
      return {
        ...newState,
        condition: {
          ...newState.condition,
          ...action.payload
        }
      }
    case "SET_MOVIE_ISLOADING":
      newState.isLoading = action.payload
      return newState
    default:
      return newState
  }
}
