import React from "react";


const restaurant = [
    {
        name: "La Marina",
        country: "ארצות הברית",
        city: "ניו יורק",
        street: "1st Avenue",
        rating: 9.0,
        status: "סגור",
        kosher: true,
        tags: ["גורמה", "נוף לים"],
        description: "מסעדת גורמה כשרה עם נוף מדהים",
        imageUrl: "https://s3-media0.fl.yelpcdn.com/bphoto/nJ7id8rj0Z6PbiWNWuLBPw/348s.jpg",
    },
    {
        name: "Meat & Wine",
        country: "אנגליה",
        city: "לונדון",
        street: "רחוב סמית 12",
        rating: 8.7,
        status: "פתוח",
        kosher: true,
        tags: ["בשרי", "יוקרתי"],
        description: "חווית בשרים יוקרתית עם כשרות מהודרת",
        imageUrl: "https://thepillarhotel.com/wp-content/uploads/2023/05/kosher-restaurant-london-interior-scaled.jpg",
    },
    {
        name: "Shuk HaKarmel",
        country: "ישראל",
        city: "תל אביב יפו",
        street: "דרך יפו 40",
        rating: 9.1,
        status: "פתוח",
        kosher: true,
        tags: ["שוק", "מזון מהיר"],
        description: "מגוון דוכנים כשרים בשוק הכרמל",
        imageUrl: "https://example.com/shuk_hakarmel.jpg",
    },
    {
        name: "Café Paris",
        country: "צרפת",
        city: "פריז",
        street: "שאנז אליזה 50",
        rating: 8.9,
        status: "פתוח",
        kosher: true,
        tags: ["חלבי", "בית קפה"],
        description: "בית קפה כשר עם מאפים צרפתיים מסורתיים",
        imageUrl: "https://www.123cacher.com/images/restaurants/1411.webp?t=1669813640",
    },
    {
        name: "Pasta Roma",
        country: "איטליה",
        city: "רומא",
        street: "ויה ונטו 10",
        rating: 8.6,
        status: "סגור",
        kosher: true,
        tags: ["איטלקי", "פסטה"],
        description: "מסעדה כשרה המתמחה בפסטות איטלקיות",
        imageUrl: "https://www.123cacher.com/images/restaurants/1407.webp?t=1668284350",
    },
    {
        name: "Tokyo Sushi",
        country: "יפן",
        city: "טוקיו",
        street: "שיבויה 5-8",
        rating: 9.2,
        status: "פתוח",
        kosher: true,
        tags: ["סושי", "אסייתי"],
        description: "סושי בר כשר בלב טוקיו",
        imageUrl: "https://example.com/tokyo_sushi.jpg",
    },
    {
        name: "Buenos Aires Grill",
        country: "ארגנטינה",
        city: "בואנוס איירס",
        street: "אבנידה קוריינטס 1234",
        rating: 8.8,
        status: "פתוח",
        kosher: true,
        tags: ["בשרי", "ארגנטינאי"],
        description: "גריל ארגנטינאי כשר עם נתחי בשר מובחרים",
        imageUrl: "https://www.123cacher.com/images/restaurants/771.jpg?t=1701187695",
    },
    {
        name: "Sydney Café",
        country: "אוסטרליה",
        city: "סידני",
        street: "ג'ורג' סטריט 200",
        rating: 9.0,
        status: "פתוח",
        kosher: true,
        tags: ["בית קפה", "חלבי"],
        description: "בית קפה כשר עם נוף לנמל סידני",
        imageUrl: "https://www.123cacher.com/images/restaurants/1255.jpg?t=1701275100",
    },
    {
        name: "Toronto Bagels",
        country: "קנדה",
        city: "טורונטו",
        street: "ביי סטריט 350",
        rating: 8.7,
        status: "פתוח",
        kosher: true,
        tags: ["מאפייה", "אמריקאי"],
        description: "מאפייה כשרה המתמחה בבייגלים טריים",
        imageUrl: "https://www.123cacher.com/images/restaurants/1215.jpg?t=1587923324",
    },
    {
        name: "Mexico City Grill",
        country: "מקסיקו",
        city: "מקסיקו סיטי",
        street: "פולנקו 20",
        rating: 9.0,
        status: "פתוח",
        kosher: true,
        tags: ["מקסיקני", "בשרי"],
        description: "גריל מקסיקני כשר עם טורטיות ובשרים מובחרים",
        imageUrl: "https://example.com/mexico_city_grill.jpg",
    },
    {
        name: "Dubai Kosher Kitchen",
        country: "איחוד האמירויות",
        city: "דובאי",
        street: "שייח' זייד רוד 200",
        rating: 9.3,
        status: "פתוח",
        kosher: true,
        tags: ["מזרח תיכוני", "בשרי"],
        description: "מטבח כשר במרכז דובאי עם תפריט מזרח תיכוני עשיר",
        imageUrl: "https://elliskosherkitchen.com/wp-content/uploads/2024/09/Dine-In_Round.png.webp",
    },
];


export const useRestaurants = () => {
    const [restaurants, setRestaurants] = React.useState(restaurant);

    const addRestaurant = (newRestaurant) => {
        setRestaurants((prevRestaurants) => [...prevRestaurants, newRestaurant]);
    };

    return { restaurants, addRestaurant };
};

export default restaurant;


