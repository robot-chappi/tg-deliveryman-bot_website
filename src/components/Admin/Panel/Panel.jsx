import React from 'react';
import './Panel.css'

const Panel = (props) => {
    return (
        <nav className={'fixed top-0 w-full'} style={{zIndex: 20}}>
            <div className="shadow-xl panel">
                <div
                    className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
                    <div className={'text-center'}>
                        <h5 className="mr-3 font-semibold dark:text-white">Привет, {props.user}!</h5>
                        <p className="text-gray-500 dark:text-gray-400">{props.hour < 12 ? "Желаю отличного рабочего дня!" : "Желаю отличной вечерней работы!"}</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Panel;