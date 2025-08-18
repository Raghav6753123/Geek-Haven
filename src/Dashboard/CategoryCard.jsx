
import React from 'react';
import ProgressBar from './ProgressBar';
import "./Dashboard.css"
import { useNavigate } from 'react-router-dom';
const CategoryCard = ({ title, progress, status, search ,slno}) => {
    const navigate=useNavigate();
    const isSelected = search && title.toLowerCase().includes(search.trim().toLowerCase());
    return (
        <div className={`category-card ${isSelected ? ' selected' : ''}`} onClick={() => {
            localStorage.setItem("slno", slno);
            setTimeout(() => {
                navigate("/ques")
            }, 1000);
        }}>
            <div className="category-card-title">{title}</div>
            <div style={{ flex: 1 }} />
            <div className="category-card-status">{status}</div>
            <div className="category-card-bottom">
                <ProgressBar percent={progress} small />
                <div className="category-card-percent">{progress}%</div>
            </div>
        </div>
    );
};

export default CategoryCard;
