import React, {useState} from 'react';
import Stars from "./Stars";

const StarsContainer = () => {
    const [selectStars, setSelectStars] = useState(0);
    const [currentRating, setCurrentRating] = useState(0);
    const [count, setCount] = useState(0);

    const handleHoverRating = (index) => {
        setSelectStars(index + 1);
    }

    const handleHoverRatingLeave = () => {
        setSelectStars(0);
    }

    const handleClickRating = (index) => {
        setCurrentRating(index + 1);
        setCount(count => count + 1);
    }

    return (
        <Stars
            selectStars={selectStars}
            currentRating={currentRating}
            count={count}
            handleHoverRating={handleHoverRating}
            handleHoverRatingLeave={handleHoverRatingLeave}
            handleClickRating={handleClickRating}
        />
    );
};

export default StarsContainer;