import React,{useState,useEffect} from 'react';
import { setDoc, doc,collection,onSnapshot,query } from 'firebase/firestore';
import { db } from '../../../firebase';
import { LeafPoll } from 'react-leaf-polls';
import 'react-leaf-polls/dist/index.css'
import "./Posts.css"
const Posts = () => {
    const [posts, setposts] = useState([])
    const [liked, setliked] = useState(false)
    const [perOne, setperOne] = useState("")
    const [perTwo, setperTwo] = useState("")
    const customTheme = {
      textColor: 'black',
      mainColor: '#00B87B',
      backgroundColor: 'rgb(255,255,255)',
      alignment: 'center'
    }
    const [isVoted, setisVoted] = useState(false);
    const resData =[]

   useEffect(() => {
     fetchData()

   }, [])

   function fetchData() {
    const q = query(collection(db,"posts"))
    onSnapshot(q,(querySnapshot)=>{
        setposts(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
    })
   }
   
  function onLike(id,datas) {
     setliked(true)
     setTimeout(()=>{
      setliked(false)
     },500)
    let dbRef = doc(db,"posts",id);
    let data = { ...datas, likes : datas.likes+1}
    setDoc(dbRef,data,{merge:true})
  }
  function vote(item,results) {

    let { id, data } = item;
    delete results[0].data
    delete results[1].data
    let dbRef = doc(db,"posts",id);
    console.log(results)
    let datas = { ...data, optionOne: {...data.optionOne, votes : results[0].votes, percentage :results[0].percentage  }, optionTwo : {...data.optionTwo, votes : results[1].votes ,percentage :results[1].percentage}}
    setDoc(dbRef,datas,{merge:true}) 
  }

  return (
    <>
    <div className='posts'> 
    {posts.map((ele)=>{
        return <div className='post' key={ele.id}>
          
            <div className='post-profile'>
            <img src={`profile.png`} alt="profile" /><span>Anonnymous</span>
            </div>

           {ele.data.poll ? <>
            <div className='post-content'>
              <p>{ele.data.text}</p>
            </div>
            <div className='poll'>
            <LeafPoll 
              type='binary'
              results={[
                { id:ele.id,
                  data:ele.data,
                  text :ele.data.optionOne.name,
                  votes :ele.data.optionOne.votes,
                  percentage :ele.data.optionOne.percentage,
                 },
                {id:ele.id,
                  data:ele.data,
                  text :ele.data.optionTwo.name,
                  votes :ele.data.optionTwo.votes,
                  percentage :ele.data.optionTwo.percentage,
                 }
              ]}
            theme={customTheme}
            onVote={vote}
            isVoted={isVoted}
           /> 
            </div>
            <span>{perOne}</span>
            <span>{perTwo}</span>
           </> : <> <div className='post-content'>
              <p>{ele.data.text}</p>
            </div>
            <div className='post-img'>
              {ele.data.image !== null ? <img src={ele.data.image} alt="" /> :  <img src={`${ele.data.gif}`} alt=""/>}
            </div>
            </> 
            }
            
           <div>
           <i style={liked ? {color:"rgb(220, 20, 60)"} : {color:"gray" } } onClick={()=> onLike(ele.id,ele.data) } className="fa-solid fa-heart"></i> <span>{ele.data.likes}</span>
           </div>
        </div>
    })}
    </div>
   </>
  )
}

export default Posts
