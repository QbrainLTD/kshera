import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
    const message = "Hello from Parent!"; // Data to pass
    const user = { name: "Shalom", age: 30 }; // More complex data

    return (
        <div>
            <h1>Parent Component</h1>
            {/* Pass props to the child component */}
            <ChildComponent message={message} user={user} />
        </div>
    );
};

export default ParentComponent;
