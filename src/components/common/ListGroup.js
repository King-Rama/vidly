import React from 'react';

const ListGroup = (props) => {
    const {items, textProperty, valueProperty, onItemSelect, selectedItem} = props;

    return (
        <div className="list-group" id="list-tab" role="tablist">
            {items.map(item => <a key={item[valueProperty]} onClick={() => onItemSelect(item)}
                                  className={item === selectedItem ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>{item[textProperty]}</a>
            )}
        </div>
    );
};

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: "_id"
};

export default ListGroup;
