import React from 'react';
import { useEffect } from 'react';
import AuthPage from './Authentication/AuthPage';
import AOS from "aos";
import "aos/dist/aos.css";
import Dashboard from './Dashboard/Dashboard';
import QuestionsListPageWithNavbar from "./QuestionsList/QuestionsListPageWithNavbar"
import { Routes, Route } from "react-router-dom";
import { useAuth } from './AuthContext/authContext';
const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: true,
    });
  }, []);
  const { authUser } = useAuth();
  return (
    <>
      <Routes>
        <Route path='/' element={authUser ? <Dashboard /> : <AuthPage />} />
        <Route path='/ques' element={authUser ? <QuestionsListPageWithNavbar /> : <AuthPage />} />
        <Route path='dash' element={authUser ? <Dashboard /> : <AuthPage />} />
      </Routes>
    </>

  )

}

export default App;
