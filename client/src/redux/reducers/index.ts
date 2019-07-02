import { combineReducers } from 'redux'
import movie, { IMovieState } from './movie'

export interface IRootState{
  movie:IMovieState
}

export const reducer = combineReducers({
  movie
})