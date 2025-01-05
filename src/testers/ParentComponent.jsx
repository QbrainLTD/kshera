import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
    const message = "Hello from Parents!";
    const user = { name: "Shalom", age: 36, zodiac: "lion" };
    const users = [
        {
            id: 1,
            name: "John Doe",
            age: 25,
            zodiac: "Aries",
            email: "john.doe@example.com",
            location: "New York, USA",
        },
        {
            id: 2,
            name: "Jane Smith",
            age: 30,
            zodiac: "Taurus",
            email: "jane.smith@example.com",
            location: "London, UK",
        },
        {
            id: 3,
            name: "David Johnson",
            age: 35,
            zodiac: "Gemini",
            email: "david.johnson@example.com",
            location: "Sydney, Australia",
        },
        {
            id: 4,
            name: "Emily Davis",
            age: 28,
            zodiac: "Cancer",
            email: "emily.davis@example.com",
            location: "Toronto, Canada",
        },
        {
            id: 5,
            name: "Michael Brown",
            age: 40,
            zodiac: "Leo",
            email: "michael.brown@example.com",
            location: "Berlin, Germany",
        },
        {
            id: 6,
            name: "Sarah Wilson",
            age: 22,
            zodiac: "Virgo",
            email: "sarah.wilson@example.com",
            location: "Paris, France",
        },
        {
            id: 7,
            name: "Chris Martinez",
            age: 27,
            zodiac: "Libra",
            email: "chris.martinez@example.com",
            location: "Madrid, Spain",
        },
        {
            id: 8,
            name: "Jessica Garcia",
            age: 32,
            zodiac: "Scorpio",
            email: "jessica.garcia@example.com",
            location: "Rome, Italy",
        },
        {
            id: 9,
            name: "Daniel Lee",
            age: 29,
            zodiac: "Sagittarius",
            email: "daniel.lee@example.com",
            location: "Seoul, South Korea",
        },
        {
            id: 10,
            name: "Sophia Kim",
            age: 24,
            zodiac: "Capricorn",
            email: "sophia.kim@example.com",
            location: "Tokyo, Japan",
        },
    ];

    console.log(users);


    // Properly log the user object
    console.log("This is:", user);

    const info = "This is info";

    return (
        <div>
            <h1>Parent Component</h1>
            <ChildComponent message={message} user={user} info={info} users={users} />
        </div>
    );
};

export default ParentComponent;
