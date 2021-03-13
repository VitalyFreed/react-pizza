import React from 'react';

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

const App = () => {
    return (
        <div className='wrapper'>
            <div className='container'>
                <Header/>
                <Main/>
            </div>
        </div>
    );
}

export default App;
