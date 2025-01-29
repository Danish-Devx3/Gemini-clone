import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState('');
    const [recentprompt, setRecentPrompt] = useState('');
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoding] = useState(false);
    const [resultData, setResultData] = useState('');


    const delayPara=(index,nextWord)=>{
        setTimeout(() => {
            setResultData(prev=>prev+nextWord)
        },75*index);
    }

    const newChat=()=>{
        setLoding(false)
        setShowResult(false)
    }


    const onSend = async (prompt) => {
        setResultData('')
        setLoding(true)
        setShowResult(true)
        let response;
        if(prompt!==undefined){
            response= await run(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev, input])
            setRecentPrompt(input)
            response = await run(input);
        }
       
        let responseArr=response.split('**')
        let newArr="";
        for(let i=0; i< responseArr.length; i++){
            if(i===0||i%2!==1){
                newArr+=responseArr[i];
            }
            else{
                newArr+="<b>"+responseArr[i]+"</b>"
            }
        }
        let newResponse=newArr.split("*").join("</br>")
        let newResponseArr=newResponse.split(" ");
        for(let i=0; i<newResponseArr.length; i++){
            const nextWord=newResponseArr[i]
            delayPara(i, nextWord+" ")
        }
        console.log(newResponseArr)
        setLoding(false)
        setInput('')
    }


    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSend,
        setRecentPrompt,
        recentprompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue} >
            {props.children}
        </Context.Provider>

    )
}

export default ContextProvider