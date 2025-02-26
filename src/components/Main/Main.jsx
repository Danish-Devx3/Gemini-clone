import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'

function Main() {

    const {onSend,recentprompt,showResult,loading,resultData,input,setInput} = useContext(Context)

    const  handleSubmit=(e) =>{
        e.preventDefault();
        onSend()
    }

  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

            {!showResult?
            <>
              <div className="greet">
                <p><span>Hello, Danish.</span></p>
                <p>How can i help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautifull places to see on upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize thish concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            :<div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentprompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ? <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    
                    :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                </div>
            </div>
        }

            
            <div className="main-bottom">
                <div className="search-box">
                    <form onSubmit={handleSubmit}><input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a promt here'/></form>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img onClick={()=>onSend()} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className="bottom-info">Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
            </div>
        </div>
    </div>
  )
}

export default Main
