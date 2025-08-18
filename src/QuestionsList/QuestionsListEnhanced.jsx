


import QuestionsNavbar from "./QuestionsNavbar";
import { useState, useEffect } from "react";
import { UseQuestions } from "../QuestionContext/questionContext";
import "./QuestionsListEnhanced.css";

const QuestionsListEnhanced = () => {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const Questions = UseQuestions();
  useEffect(() => {
    if (!Questions || Questions.length === 0) return;
    setLoading(true);
    const sl_no = Number(localStorage.getItem("slno"));
    if (!sl_no) {
      setQuestions([]);
      setLoading(false);
      return;
    }
    const selectedCategory = Questions.find((q) => Number(q.sl_no) === sl_no);
    if (!selectedCategory || !Array.isArray(selectedCategory.ques)) {
      setQuestions([]);
      setLoading(false);
      return;
    }
    const flatQuestions = selectedCategory.ques.map((item, idx) => ({
      ...item,
      title: item.title || selectedCategory.title,
      sl_no: sl_no,
      idx: idx + 1,
      tags: item.tags ? (Array.isArray(item.tags) ? item.tags : String(item.tags).split(",").map(t => t.trim()).filter(Boolean)) : [],
      link1: item.p1_link || "",
      link2: item.p2_link || "",
      yt: item.yt_link || ""
    }));
    setQuestions(flatQuestions);
    setLoading(false);
  }, [Questions]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="questions-loading">Loading...</div>;
  }

  const isMatch = (q) => {
    if (!search) return false;
    const s = search.toLowerCase();
    if (q.title && q.title.toLowerCase().includes(s)) return true;
    if (q.tags && q.tags.some(tag => tag.toLowerCase().includes(s))) return true;
    return false;
  };

  return (
    <>
      <QuestionsNavbar setSearch={setSearch} />
      <div className="questions-stripe-table-container">
        <div className="questions-stripe-table-wrapper">
          <table className="questions-stripe-table">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Title</th>
                <th>Tags</th>
                <th>Link 1</th>
                <th>Link 2</th>
                <th>YT</th>
                <th>Bookmark</th>
              </tr>
            </thead>
            <tbody>
              {questions?.map((q, idx) => (
                <tr
                  key={q.idx || idx}
                  className={`questions-stripe-row${isMatch(q) ? ' questions-stripe-row-highlight' : ''}`}
                >
                  <td className="qs-serial">{q.idx || idx + 1}</td>
                  <td className="qs-title">{q.title}</td>
                  <td className="qs-tags">
                    {q.tags && q.tags.length > 0 ? q.tags.map((tag, i) => (
                      <span className="qs-tag" key={i}>{tag}</span>
                    )) : <span className="qs-tag">-</span>}
                  </td>
                  <td>
                    {q.link1 ? (
                      <a href={q.link1} className="qs-link leetcode" target="_blank" rel="noopener noreferrer">Solve 1</a>
                    ) : <span className="qs-na">N/A</span>}
                  </td>
                  <td>
                    {q.link2 ? (
                      <a href={q.link2} className="qs-link gfg" target="_blank" rel="noopener noreferrer">Solve 2</a>
                    ) : <span className="qs-na">N/A</span>}
                  </td>
                  <td>
                    {q.yt ? (
                      <a href={q.yt} className="qs-link youtube" target="_blank" rel="noopener noreferrer">YT</a>
                    ) : <span className="qs-na">N/A</span>}
                  </td>
                  <td>
                    <button className="qs-notes-btn" title="Bookmark"><span className="qs-notes-star">☆</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default QuestionsListEnhanced;
