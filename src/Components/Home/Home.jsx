import React from 'react'
import CreatePost from './CreatePost/CreatePost'
import "./Home.css"
import Posts from './Posts/Posts'

const Home = () => {
  return (
    <div className='home'>
        <CreatePost />
        <Posts />
    </div>
  )
}

export default Home