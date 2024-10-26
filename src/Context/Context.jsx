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


    const delayPara=(index,next)=>{

    }


    const onSend = async (prompt) => {
        setResultData('')
        setLoding(true)
        setShowResult(true)
        setRecentPrompt(input)
        
        const response = await run(input)
        let responseArr=response.split('**')

        setResultData(response)
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
        setInput
    }

    return (
        <Context.Provider value={contextValue} >
            {props.children}
        </Context.Provider>

    )
}

export default ContextProvider