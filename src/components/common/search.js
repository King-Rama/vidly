import React from 'react';

const SearchBox = ({value, placeholder, onChange}) => {
    return (
        <div className="form-group">
            <input name="query" autoFocus
                   className="form-control my-3"
                   placeholder={placeholder}
                   value={value}
                   onChange={e => onChange(e.currentTarget.value)}
            />
        </div>
    );
};

export default SearchBox;
