import React from "react";
import { IMovieState } from "../redux/reducers/movie";
import { Table, Switch } from 'antd'
import { ColumnProps } from "antd/lib/table";
import { IMovie } from "../services/MovieService";

export interface IMovieTableEvents {
  onLoad: () => void
  onSwtchChange: (type: "isHot" | "isComing" | "isClassical", newState: boolean, id: string) => void
}

export default class extends React.Component<IMovieState & IMovieTableEvents>{

  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }
  render() {
    return (
      <Table rowKey="_id" dataSource={this.props.data} columns={this.getColumns()} />
    )
  }

  private getColumns(): ColumnProps<IMovie>[] {
    return [
      { title: '名称', dataIndex: "name" },
      {
        title: "地区",
        dataIndex: "areas",
        render: (text: string[]) => {
          return text.join('， ')
        }
      },
      {
        title: '类型',
        dataIndex: "types",
        render: (text: string[]) => {
          return text.join('， ')
        }
      },
      {
        title: '时长',
        dataIndex: "timeLong",
        render: (text: number) => {
          return text + '分钟'
        }
      },
      {
        title: '即将上映',
        dataIndex: "isComing",
        render: (text: boolean, record) => {
          return <Switch checked={text} onChange={(newVal) => {
            this.props.onSwtchChange("isComing", newVal, record._id!)
          }} />
        }
      },
      {
        title: '热映',
        dataIndex: "isHot",
        render: (text: boolean, record) => {
          return <Switch checked={text} onChange={(newVal) => {
            this.props.onSwtchChange("isHot", newVal, record._id!)
          }} />
        }
      },
      {
        title: '经典',
        dataIndex: "isClassical",
        render: (text: boolean, record) => {
          return <Switch checked={text} onChange={(newVal) => {
            this.props.onSwtchChange("isClassical", newVal, record._id!)
          }} />
        }
      },
    ]
  }
}