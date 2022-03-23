import React from 'react';

const MyButton = ({ label, onClickEvent, buttonStyle }) => {
    return (
        <button className={`btn ${buttonStyle}`} onClick={onClickEvent} >{label}</button>
    );
};

export default MyButton;
