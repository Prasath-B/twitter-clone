import React from 'react'
import "./RightSide.css"

const RightSide = () => {
  return (
    <div className='rightside'>
     <div className='search-box'>
     <i className="fa-solid fa-magnifying-glass"></i> <span>Search Something</span>
     </div>
     
     <div className='trends'>
        <h2>What's happening</h2>
        <div style={{display:"flex",flexDirection:"row"}}>
            <div><p className='lighter'>Politics. Live</p>
            <p className='bolder'>Three leaders file nominations for the Congress presidential election</p></div>
            <img width="100px" height="60px"  style={{marginTop:"30px",borderRadius:"10px"}} alt="politics" src={`politics.jpg`} />
        </div>
        <div>
          <h5 className='bolder'>#CREDpay</h5>
          <p className='lighter' style={{fontSize:"13px"}}>Meet the new face of payments. Reserved for the creditworthy.</p>
          <p className='lighter'>Promoted by CRED</p>
        </div>
        <div>
          <p className='lighter' style={{fontSize:"13px"}}>Trending</p>
          <h5 className='bolder'>#dreamfacereveal</h5>
          <p className='lighter'>2,511 Tweets</p>
        </div>
        <div>
          <p className='lighter'>Technology. Trending</p>
          <h5 className='bolder'>#Airtel5G</h5>
          <p className='lighter'>Trendign with #5Gnetwork</p>
        </div>
        <div>
          <p className='bolder'>--- TimesTravel .Yesterday</p>
          <p className='bolder'>Indian hotels exclusively for adults, don't take your kids along!</p>
        </div>
        <p>Show More</p>
     </div>
    </div>

  )
}

export default RightSide