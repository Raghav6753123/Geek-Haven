import CategoryCard from './CategoryCard';
import "./Dashboard.css"
import { UseQuestions } from '../QuestionContext/questionContext';

const CategoryGrid = ({ search }) => {
    const Questions = UseQuestions();
    return (
        <div className="category-grid">

            {Questions?.map((q, ind) => (
                <CategoryCard
                    key={ind}
                    title={q.title}
                    progress={10}
                    status="Start now"
                    search={search}
                    slno={q.sl_no}
                />
            ))}

        </div>
    );
};

export default CategoryGrid;
