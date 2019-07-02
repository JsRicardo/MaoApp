import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import './layout.css'

import AddMovie from './movie/AddMovie'
import EditMovie from './movie/EditMovie'
import Home from './Home'
import MovieList from './movie/MovieList'

export const LayoutComp: React.FC = () => {
  const { Header, Sider, Content } = Layout

  return (
    <>
      <Layout>
        <Header className="header">猫眼电影后台管理系统</Header>
        <Layout>
          <Sider>
            <Menu mode='inline' theme='dark'>
              <Menu.Item key="1">
                <Icon type="desktop" />
                首页
                <NavLink to='/'></NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="play-circle" />
                电影列表
                <NavLink to='/movielist'></NavLink>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="folder-add" />
                添加电影
                <NavLink to='/addmovie'></NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content className="main-content">
            <Route path='/' component={Home} exact ></Route>
            <Route path='/movielist' component={MovieList} ></Route>
            <Route path='/addmovie' component={AddMovie} ></Route>
            <Route path='/editmovie' component={EditMovie} ></Route>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}