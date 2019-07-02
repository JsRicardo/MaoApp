import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface IParams {
  id: string
}

export default class extends React.Component<RouteComponentProps<IParams>> {
  render() {
    console.log(this.props.match.params)
    return (
      <h1>
        11111222
      </h1>
    )
  }
}