import React, { Dispatch } from 'react'
import MovieTable, { IMovieTableEvents } from '../../components/MovieTable'
import { connect } from 'react-redux'
import { IRootState } from '../../redux/reducers';
import { fetchMovies, updateMovie } from '../../redux/actions/movie';
import { IMovieState } from '../../redux/reducers/movie';

export default class extends React.Component {
  render() {
    return (
      <h1>
        <MovieContainer />
      </h1>
    )
  }
}

function mapStateToProps(state: IRootState): IMovieState {
  return state.movie
}

function mapDispatchToProps(dispatch: Dispatch<any>): IMovieTableEvents {
  return {
    onLoad() {
      dispatch(fetchMovies({
        pageSize: 10,
        nowPage: 1,
        key: ""
      }))
    },
    onSwtchChange(type, newVal, id) {
      dispatch(updateMovie(type, newVal, id))
    }
  }
}

const MovieContainer = connect(mapStateToProps, mapDispatchToProps)(MovieTable)