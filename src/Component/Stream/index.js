import React, { useEffect, useState, useRef } from 'react';

const Stream = (props) => {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef(count);

    useEffect(() => {
        prevCountRef.current = count
    }, [count]);

    const onUpNumber = () => {
        setCount(x => x + 1)
    }
    console.log('count', count)
    console.log('prev', prevCountRef)
    return (
        <div>
            <h2>Stream tại đây</h2>
            <p>current: {count}</p>
            <p>prev: {prevCountRef.current}</p>
            <button onClick={onUpNumber}>UP</button>
        </div>
    );
}

export default Stream;