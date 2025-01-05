import React from 'react';
import PropTypes from 'prop-types';

const ChildComponent = (props) => {
    const { message, user, info } = props;

    // Log props for debugging
    console.log("ChildComponent Props:", props);

    return (
        <div>
            <h2>Child Component</h2>
            <p>Message: {message}</p>
            <p>User Info: {user.name}, Age: {user.age}, Zodiac: {user.zodiac}</p>
            <p>New Info: {info}</p>
        </div>
    );
};

ChildComponent.propTypes = {
    message: PropTypes.string.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        zodiac: PropTypes.string.isRequired,
    }).isRequired,
    info: PropTypes.string.isRequired,
};

export default ChildComponent;
