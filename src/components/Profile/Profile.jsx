import React from 'react';
import {Link} from 'react-router-dom';

import styles from './profile.module.scss';

const Profile = () => {
    return (
        <div>
            <Link to='/pizzas'>Пиццы</Link>
        </div>
    );
};

export default Profile;