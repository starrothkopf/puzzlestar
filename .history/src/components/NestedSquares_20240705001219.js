import React from 'react';

const NestedSquares = ({ depth }) => {
    const createNestedSquares = (depth) => {
        let squares = [];
        for (let i = 0; i < depth; i++) {
            squares.push(<div key={i} className={i % 2 === 0 ? 'square' : 'square'}>{squares.length > 0 ? squares[squares.length - 1] : null}</div>);
        }
        return squares[squares.length - 1];
    };

    return (
        <div className="nested-squares">
            {createNestedSquares(depth)}
        </div>
    );
};

export default NestedSquares;