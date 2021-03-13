import React, {useEffect, useState} from 'react';
import styles from "./cart.module.scss";

const PizzaCard = ({pizza}) => {
    const defaultSize = pizza['default_size'];
    const defaultType = pizza.defaultType;

    const [activeSize, setActiveSize] = useState(defaultSize);
    const [activeType, setActiveType] = useState(defaultType);

    const handleSetActiveSize = size => {
        setActiveSize(size);
    }

    const handleSetActiveType = type => {
        setActiveType(type);
    }

    const price = pizza.sizes.find(size => size.size === activeSize).price;

    return (
        <div className={styles['pizza-card']}>
            <div className={styles['pizza-info']}>
                <img src={pizza['pizza_img']} alt="Pizza" className="pizza-img"/>
                <h3 className={styles['pizza-name']}>{pizza.name}</h3>
            </div>
            <div className={styles['pizza-parameters']}>
                <div className={styles['pizza-types']}>
                    {
                        pizza.types.map(pt => {
                            return <button
                                style={{background: pt.id === activeType ? '#fff' : ''}}
                                key={pt.id}
                                className={styles['pizza-type-btn']}
                                onClick={e => handleSetActiveType(pt.id)}
                            >{
                                pt.type}
                            </button>;
                        })
                    }
                </div>
                <div className={styles['pizza-sizes']}>
                    {
                        pizza.sizes.map(size => <button
                                onClick={e => handleSetActiveSize(size.size)}
                                style={{background: size.size === activeSize ? '#fff' : ''}}
                                disabled={size.price ? false : true}
                                key={size.size}
                                className={size.price ? styles['pizza-type-btn'] + ' ' : styles['pizza-type-btn'] + ' ' + styles['pizza-disabled']}
                            >
                                {size.size} см.
                            </button>
                        )
                    }
                </div>
            </div>
            <div className={styles.summary}>
                <span className={styles.price}>{price} ₽</span>
                <button className={styles.amount}>Добавить</button>
            </div>
        </div>
    );
};

export default PizzaCard;