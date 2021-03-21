import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import styles from './pizzaCard.module.scss';
import {changeDefaultSize} from "../../../../reducers/pizzaReducer";
import PizzaCard from "./PizzaCard";
import StarsContainer from "../../Stars/StarsContainer";

const PizzaCardContainer = ({pizza}) => {
    const dispatch = useDispatch();

    const defaultSize = pizza['default_size'];
    const defaultType = pizza.defaultType;

    const [activeSize, setActiveSize] = useState(defaultSize);
    const [activeType, setActiveType] = useState(defaultType);

    const handleSetActiveSize = size => {
        dispatch(changeDefaultSize({pizza, size}));
        setActiveSize(size);
    }

    const handleSetActiveType = type => {
        setActiveType(type);
    }

    const price = pizza.sizes.find(size => size.size === activeSize).price;

    return (
        <div className={styles['pizza-card']}>
            <PizzaCard
                pizza={pizza}
                activeType={activeType}
                handleSetActiveType={handleSetActiveType}
                handleSetActiveSize={handleSetActiveSize}
                activeSize={activeSize}
                price={price}
            />
            <StarsContainer/>
        </div>
    );
};

export default PizzaCardContainer;


// import React, {useState} from 'react';
// import {useDispatch} from "react-redux";
//
// import styles from './pizzaCard.module.scss';
// import {changeDefaultSize} from "../../../../reducers/pizzaReducer";
// import Stars from "../../Stars/Stars";
//
// const PizzaCard = ({pizza}) => {
//     const dispatch = useDispatch();
//
//     const defaultSize = pizza['default_size'];
//     const defaultType = pizza.defaultType;
//
//     const [activeSize, setActiveSize] = useState(defaultSize);
//     const [activeType, setActiveType] = useState(defaultType);
//
//     const handleSetActiveSize = size => {
//         dispatch(changeDefaultSize({pizza, size}));
//         setActiveSize(size);
//     }
//
//     const handleSetActiveType = type => {
//         setActiveType(type);
//     }
//
//     const price = pizza.sizes.find(size => size.size === activeSize).price;
//
//     return (
//         <div className={styles['pizza-card']}>
//             <div className={styles['pizza-info']}>
//                 <img src={pizza['pizza_img']} alt="Pizza" className="pizza-img"/>
//                 <h3 className={styles['pizza-name']}>{pizza.name}</h3>
//             </div>
//             <div className={styles['pizza-parameters']}>
//                 <div className={styles['pizza-types']}>
//                     {
//                         pizza.types.map(pt => {
//                             return <button
//                                 style={{background: pt.id === activeType ? '#fff' : ''}}
//                                 key={pt.id}
//                                 className={styles['pizza-type-btn']}
//                                 onClick={e => handleSetActiveType(pt.id)}
//                             >{
//                                 pt.type}
//                             </button>;
//                         })
//                     }
//                 </div>
//                 <div className={styles['pizza-sizes']}>
//                     {
//                         pizza.sizes.map(size => <button
//                                 onClick={e => handleSetActiveSize(size.size)}
//                                 style={{background: size.size === activeSize ? '#fff' : ''}}
//                                 disabled={size.price ? false : true}
//                                 key={size.size}
//                                 className={size.price ? styles['pizza-type-btn'] + ' ' : styles['pizza-type-btn'] + ' ' + styles['pizza-disabled']}
//                             >
//                                 {size.size} см.
//                             </button>
//                         )
//                     }
//                 </div>
//             </div>
//             <div className={styles.summary}>
//                 <span className={styles.price}>{price} ₽</span>
//                 <button className={styles.amount}>
//                     <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                             d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
//                             fill="#EB5A1E"/>
//                     </svg>
//                     <span>Добавить</span>
//                 </button>
//             </div>
//             <Stars/>
//         </div>
//     );
// };
//
// export default PizzaCard;