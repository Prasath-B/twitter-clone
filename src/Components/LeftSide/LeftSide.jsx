import React from 'react'
import "./LeftSide.css"

const LeftSide = () => {



 const List = ({names,icons})=>{
    return (
     <li><i className={`${icons} icons`}></i>{names}</li>   
    )
 }

  return (
    <div className='leftside'>
        <ul>
            <li><i style={{color:'rgb(29, 155, 240)'}} className="fa-brands fa-twitter fa-2x"></i></li> 
            <List names='Home' icons="fa-solid fa-house" />
            <List names="Explore"   icons="fa-solid fa-hashtag"/>
            <List names="Notifications"   icons="fa-regular fa-bell"/>
            <List names="Messages"   icons="fa-regular fa-envelope"/>
            <List names="Bookmarks"   icons="fa-regular fa-bookmark"/>
            <List names="Lists"   icons="fa-regular fa-note-sticky"/>
            <List names="Profile"   icons="fa-regular fa-user"/>
            <List names="More"   icons="fa-regular fa-comment-dots"/>
            <button className='btn-tweet'>Tweet</button>
            <List names="@Username" />
        </ul>
    </div>
  )
}

export default LeftSide;