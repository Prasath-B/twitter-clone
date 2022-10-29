import React,{useState} from 'react'
import "./CreatePost.css"
import EmojiPicker from 'emoji-picker-react';
import { addDoc ,collection } from 'firebase/firestore';
import { db ,storage} from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { async } from '@firebase/util';

const CreatePost = () => {
    const [media, setmedia] = useState('');
    const [image, setimage] = useState('');
    const [text, settext] = useState('');
    const [gif, setgif] = useState('')
    const [emojiModal, setemojiModal] = useState(false)
    const [poll, setpoll] = useState({
        question:"",
        optionOne:"",
        optionTwo:"",
    })

    const onImageChange = (e)=>{
        if(e.target.files && e.target.files[0]){
            setimage(e.target.files[0])
            setmedia(URL.createObjectURL(e.target.files[0]))
        }
    }
    const onGifChange= (e,url)=>{
        setgif(url+".webp")
        setmedia(url+".webp")     
    }
    const onEmojiClick =(e,emojiObj)=>{
        settext(`${text}${emojiObj.emoji}`)
    }

    const handlePollSubmit = async(e)=>{
        e.preventDefault();
        try {
            await addDoc(collection(db,'posts'),{
                text:poll.question,
                optionOne : {
                    name :poll.optionOne,
                    votes :0,
                    percentage:0
                },
                optionTwo :{
                    name:poll.optionTwo,
                    votes :0,
                    percentage:0
                },
                likes: 0,
                poll:true
            })
        } catch (error) {
            console.log("error uploading poll")
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            if(image !== ''){
                    const storageRef = ref(storage, `/files/${image.name}`);
                    const uploadTask = uploadBytesResumable(storageRef,image);
                    uploadTask.on('state_changed',()=>{},
                    (err)=>{
                        console.log(err)
                    },
                    ()=>{
                        getDownloadURL(uploadTask.snapshot.ref)
                        .then( async (downloadURL) => {
                            await addDoc(collection(db,'posts'),{
                                text:text,
                                image:`${downloadURL}`,
                                gif:`${gif}`,
                                likes: 0,
                            })

                        });
                    }
                    )
            }else{
                await addDoc(collection(db,'posts'),{
                    text:text,
                    image:null,
                    gif:`${gif}`,
                    likes: 0,
                }) 
            }
            
        setmedia('')
        settext('')
        setimage('')
        setgif('')
            
            
        } catch (err) {
            alert(err)
        }
    }

  return (
    <div>
        <div><h5>Home</h5></div>
        <div className='create-post-top'><img src={`profile.png`} alt="profile"  /> <span>Everyone will see your posts</span> </div>
        <div className='post-text'  >
            <textarea  value={text}  onChange={(e)=>settext(e.target.value)} placeholder="whats's happening"></textarea>
            <i style={media === "" ? {display:"none"} : {display:"inline-block",zIndex:"9",color:"black"}} onClick={()=>setmedia("")} className="fa-regular fa-circle-xmark fa-lg"></i>
            <div className='create-post-img'><img  style={media === "" ? {display:"none"} : {display:"block"}} src={`${media}`} alt=""  /></div>
        </div>
        <div className='create-post-bottom'>
            <ul className='create-post-icons'>
                <li> <label htmlFor="imageupload">
                    <i style={{color:"rgb(29, 155, 240)"}} className="fa-regular fa-image fa-lg"></i></label>
                    <input style={{display:"none"}} type="file" onChange={onImageChange} name="imageupload" id="imageupload" />
                </li>
                <li>
                    <i style={{color:"rgb(29, 155, 240)"}} data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="fa-solid fa-ghost fa-lg"></i>

                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img width="150px" data-bs-dismiss="modal"  onClick={(e)=>onGifChange(e,"./gifs/one")} style={{padding:"20px"}} src={`./gifs/one.webp`} alt=""  />  
                        <img width="150px" data-bs-dismiss="modal"  onClick={(e)=>onGifChange(e,"./gifs/two")} style={{padding:"20px"}} src={`./gifs/two.webp`} alt=""  /> 
                        <img width="150px" data-bs-dismiss="modal"   onClick={(e)=>onGifChange(e,"./gifs/three")} style={{padding:"20px"}} src={`./gifs/three.webp`} alt=""  /> 
                        <img width="150px" data-bs-dismiss="modal"   onClick={(e)=>onGifChange(e,"./gifs/four")} style={{padding:"20px"}} src={`./gifs/four.webp`} alt=""  /> 
                        <img width="150px" data-bs-dismiss="modal"   onClick={(e)=>onGifChange(e,"./gifs/five")} style={{padding:"20px"}} src={`./gifs/five.webp`} alt=""  /> 
                        <img width="150px" data-bs-dismiss="modal"  onClick={(e)=>onGifChange(e,"./gifs/six")} style={{padding:"20px"}} src={`./gifs/six.webp`} alt=""  /> 
                        <img width="150px" data-bs-dismiss="modal"   onClick={(e)=>onGifChange(e,"./gifs/seven")} style={{padding:"20px"}} src={`./gifs/seven.webp`} alt=""  /> 
                        <img width="150px" data-bs-dismiss="modal"   onClick={(e)=>onGifChange(e,"./gifs/eight")} style={{padding:"20px"}} src={`./gifs/eight.webp`} alt=""  /> 
                        <img width="150px" data-bs-dismiss="modal"   onClick={(e)=>onGifChange(e,"./gifs/nine")} style={{padding:"20px"}} src={`./gifs/nine.webp`} alt=""  /> 
                        <img width="150px" data-bs-dismiss="modal"  onClick={(e)=>onGifChange(e,"./gifs/ten")} style={{padding:"20px"}} src={`./gifs/ten.webp`} alt=""  /> 
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Add gif</button>
                    </div>
                    </div>
                </div>
                </div>
                </li>
                <li><i style={{color:"rgb(29, 155, 240)"}}  data-bs-toggle="modal" data-bs-target="#exampleModal" className="fa-solid fa-square-poll-horizontal fa-lg"></i>
                <div  className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div>
                                <input 
                                type="text" 
                                placeholder='Ask a question' 
                                name="question" 
                                value={poll.question}
                                onChange = {(e)=>setpoll({...poll,[e.target.name] : e.target.value})}
                                 />
                                </div>
                                <input type="text" placeholder='option-one' name="optionOne" 
                                value={poll.optionOne}
                                onChange = {(e)=>setpoll({...poll,[e.target.name] : e.target.value})}
                                />

                                <input type="text" placeholder='option-two' name="optionTwo"
                                value={poll.optionTwo}
                                onChange = {(e)=>setpoll({...poll,[e.target.name] : e.target.value})}
                                 />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handlePollSubmit} >Tweet</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        
                </li>
                <li><i style={{color:"rgb(29, 155, 240)"}}  onClick={()=>setemojiModal(!emojiModal)}   className="fa-solid fa-face-smile fa-lg"></i>
                </li>
            </ul>
           
            <button className='create-post-btn' onClick={handleSubmit}>Tweet</button>
        </div>
        <div style={emojiModal ? {display:"block"} : {display:"none"}}>
                <EmojiPicker   onEmojiClick={onEmojiClick} />
        </div>


    </div>
  )
}

export default CreatePost