import api from '../api';
import { createContext, useContext, useEffect, useState } from "react";

const QuestionContext = createContext();
export const QuestionProvider =  ({children}) => {
    const [Questions, SetQuestions] = useState([]);
    useEffect(() => {
        const FetchQuestions = async () => {
            try {
                await api.get("/api/ques/get-ques").then((res) => {
                    SetQuestions(res.data.ques);
                    
                })
            } catch (error) {
                console.log(error);
            }

        }
        FetchQuestions();
    }, [])
    return (
        <QuestionContext.Provider value={Questions}>
            {children}
        </QuestionContext.Provider>
    )
}
export const UseQuestions = () => {
    return useContext(QuestionContext);
}