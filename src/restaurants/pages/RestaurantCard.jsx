import React from "react";


const restaurant = [
    {
        name: "La Marina",
        address: "1st Avenue, ניו יורק, ארצות הברית",
        rating: 9.0,
        status: "סגור",
        distance: "5.0 ק''מ",
        kosher: true,
        tags: ["גורמה", "נוף לים"],
        description: "מסעדת גורמה כשרה עם נוף מדהים",
        imageUrl: "https://s3-media0.fl.yelpcdn.com/bphoto/nJ7id8rj0Z6PbiWNWuLBPw/348s.jpg",
    },
    {
        name: "Meat & Wine",
        address: "רחוב סמית 12, לונדון, אנגליה",
        rating: 8.7,
        status: "פתוח",
        distance: "2.7 ק''מ",
        kosher: true,
        tags: ["בשרי", "יוקרתי"],
        description: "חווית בשרים יוקרתית עם כשרות מהודרת",
        imageUrl: "https://thepillarhotel.com/wp-content/uploads/2023/05/kosher-restaurant-london-interior-scaled.jpg",
    },
    {
        name: "Shuk HaKarmel",
        address: "דרך יפו 40, תל אביב יפו, ישראל",
        rating: 9.1,
        status: "פתוח",
        distance: "0.9 ק''מ",
        kosher: true,
        tags: ["שוק", "מזון מהיר"],
        description: "מגוון דוכנים כשרים בשוק הכרמל",
        imageUrl: "https://example.com/shuk_hakarmel.jpg",
    },
    {
        name: "Café Paris",
        address: "שאנז אליזה 50, פריז, צרפת",
        rating: 8.9,
        status: "פתוח",
        distance: "3.5 ק''מ",
        kosher: true,
        tags: ["חלבי", "בית קפה"],
        description: "בית קפה כשר עם מאפים צרפתיים מסורתיים",
        imageUrl: "https://www.123cacher.com/images/restaurants/1411.webp?t=1669813640",
    },
    {
        name: "Pasta Roma",
        address: "ויה ונטו 10, רומא, איטליה",
        rating: 8.6,
        status: "סגור",
        distance: "4.0 ק''מ",
        kosher: true,
        tags: ["איטלקי", "פסטה"],
        description: "מסעדה כשרה המתמחה בפסטות איטלקיות",
        imageUrl: "https://www.123cacher.com/images/restaurants/1407.webp?t=1668284350",
    },
    {
        name: "Tokyo Sushi",
        address: "שיבויה 5-8, טוקיו, יפן",
        rating: 9.2,
        status: "פתוח",
        distance: "6.0 ק''מ",
        kosher: true,
        tags: ["סושי", "אסייתי"],
        description: "סושי בר כשר בלב טוקיו",
        imageUrl: "https://example.com/tokyo_sushi.jpg",
    },
    {
        name: "Buenos Aires Grill",
        address: "אבנידה קוריינטס 1234, בואנוס איירס, ארגנטינה",
        rating: 8.8,
        status: "פתוח",
        distance: "2.5 ק''מ",
        kosher: true,
        tags: ["בשרי", "ארגנטינאי"],
        description: "גריל ארגנטינאי כשר עם נתחי בשר מובחרים",
        imageUrl: "https://www.123cacher.com/images/restaurants/771.jpg?t=1701187695",
    },
    {
        name: "Moscow Deli",
        address: "רחוב טברסקיה 7, מוסקבה, רוסיה",
        rating: 8.5,
        status: "סגור",
        distance: "3.0 ק''מ",
        kosher: true,
        tags: ["מעדנייה", "אירופאי"],
        description: "מעדנייה כשרה עם מטעמים רוסיים מסורתיים",
        imageUrl: "https://example.com/moscow_deli.jpg",
    },
    {
        name: "Sydney Café",
        address: "ג'ורג' סטריט 200, סידני, אוסטרליה",
        rating: 9.0,
        status: "פתוח",
        distance: "4.5 ק''מ",
        kosher: true,
        tags: ["בית קפה", "חלבי"],
        description: "בית קפה כשר עם נוף לנמל סידני",
        imageUrl: "https://www.123cacher.com/images/restaurants/1255.jpg?t=1701275100",
    },
    {
        name: "Toronto Bagels",
        address: "ביי סטריט 350, טורונטו, קנדה",
        rating: 8.7,
        status: "פתוח",
        distance: "2.0 ק''מ",
        kosher: true,
        tags: ["מאפייה", "אמריקאי"],
        description: "מאפייה כשרה המתמחה בבייגלים טריים",
        imageUrl: "https://www.123cacher.com/images/restaurants/1215.jpg?t=1587923324",
    },
    {
        name: "Rio Bistro",
        address: "אבנידה אטלנטיקה 500, ריו דה ז'ניירו, ברזיל",
        rating: 8.9,
        status: "סגור",
        distance: "3.8 ק''מ",
        kosher: true,
        tags: ["ביסטרו", "ברזילאי"],
        description: "ביסטרו כשר עם מנות ברזילאיות מסורתיות",
        imageUrl: "https://www.123cacher.com/images/ads/natives/40.jpg",
    },
    {
        name: "Cape Town Grill",
        address: "רחוב לונג 100, קייפטאון, דרום אפריקה",
        rating: 8.6,
        status: "פתוח",
        distance: "5.0 ק''מ",
        kosher: true,
        tags: ["בשרי", "אפריקאי"],
        description: "מסעדת גריל כשרה עם טעמים אפריקאיים",
        imageUrl: "https://www.123cacher.com/images/restaurants/1234.jpg?t=1593162177",
    },
    {
        name: "Mumbai Spice",
        address: "מארין דרייב 200, מומבאי, הודו",
        rating: 9.1,
        status: "פתוח",
        distance: "4.2 ק''מ",
        kosher: true,
        tags: ["הודי", "צמחוני"],
        description: "מסעדה כשרה המתמחה במטבח הודי צמחוני",
        imageUrl: "https://www.123cacher.com/images/restaurants/1207.jpg?t=1567084321",
    },
    {
        name: "Shanghai Noodles",
        address: "נאנג'ינג רואד 300, שנגחאי, סין",
        rating: 8.8,
        status: "סגור",
        distance: "3.9 ק''מ",
        kosher: true,
        tags: ["אסייתי", "נודלס"],
        description: "מסעדה כשרה עם מנות נודלס אותנטיות בשנגחאי",
        imageUrl: "https://www.123cacher.com/images/restaurants/1346.jpg?t=1655821428",
    },
    {
        name: "Berlin Deli",
        address: "אונטר דן לינדן 150, ברלין, גרמניה",
        rating: 8.7,
        status: "פתוח",
        distance: "2.8 ק''מ",
        kosher: true,
        tags: ["אירופאי", "מעדנייה"],
        description: "מעדנייה כשרה עם מאכלים גרמניים מסורתיים",
        imageUrl: "https://www.123cacher.com/images/restaurants/944_3365.webp",
    },
    {
        name: "Bangkok Bistro",
        address: "סוקומוויט 55, בנגקוק, תאילנד",
        rating: 9.0,
        status: "פתוח",
        distance: "4.5 ק''מ",
        kosher: true,
        tags: ["אסייתי", "מסעדת שף"],
        description: "ביסטרו כשר המשלב טעמים תאילנדיים אותנטיים",
        imageUrl: "https://example.com/bangkok_bistro.jpg",
    },
    {
        name: "Seoul Kosher BBQ",
        address: "אינסאדונג 12, סיאול, דרום קוריאה",
        rating: 9.1,
        status: "פתוח",
        distance: "5.1 ק''מ",
        kosher: true,
        tags: ["אסייתי", "ברביקיו"],
        description: "מסעדת ברביקיו כשרה בסגנון קוריאני",
        imageUrl: "https://example.com/seoul_kosher_bbq.jpg",
    },
    {
        name: "Vienna Café",
        address: "רינגשטראסה 22, וינה, אוסטריה",
        rating: 8.9,
        status: "סגור",
        distance: "3.6 ק''מ",
        kosher: true,
        tags: ["קפה", "אירופאי"],
        description: "בית קפה כשר המציע קינוחים וינאיים מסורתיים",
        imageUrl: "https://example.com/vienna_cafe.jpg",
    },
    {
        name: "Zurich Dairy",
        address: "באנהופשטראסה 100, ציריך, שווייץ",
        rating: 8.8,
        status: "פתוח",
        distance: "3.4 ק''מ",
        kosher: true,
        tags: ["חלבי", "אירופאי"],
        description: "מסעדה חלבית כשרה עם מבחר גבינות איכותיות",
        imageUrl: "https://example.com/zurich_dairy.jpg",
    },
    {
        name: "Mexico City Grill",
        address: "פולנקו 20, מקסיקו סיטי, מקסיקו",
        rating: 9.0,
        status: "פתוח",
        distance: "5.0 ק''מ",
        kosher: true,
        tags: ["מקסיקני", "בשרי"],
        description: "גריל מקסיקני כשר עם טורטיות ובשרים מובחרים",
        imageUrl: "https://example.com/mexico_city_grill.jpg",
    },
    {
        name: "Auckland Kosher Eatery",
        address: "קווין סטריט 55, אוקלנד, ניו זילנד",
        rating: 8.6,
        status: "סגור",
        distance: "4.3 ק''מ",
        kosher: true,
        tags: ["חלבי", "בינלאומי"],
        description: "מסעדה כשרה באוקלנד עם מבחר מאכלים עולמיים",
        imageUrl: "https://example.com/auckland_kosher_eatery.jpg",
    },
    {
        name: "Hong Kong Delight",
        address: "קווין רוד 88, הונג קונג",
        rating: 9.2,
        status: "פתוח",
        distance: "5.2 ק''מ",
        kosher: true,
        tags: ["אסייתי", "חלבי"],
        description: "מסעדה כשרה עם מנות מהמטבח הסיני המסורתי",
        imageUrl: "https://example.com/hong_kong_delight.jpg",
    },
    {
        name: "Dubai Kosher Kitchen",
        address: "שייח' זייד רוד 200, דובאי, איחוד האמירויות",
        rating: 9.3,
        status: "פתוח",
        distance: "6.0 ק''מ",
        kosher: true,
        tags: ["מזרח תיכוני", "בשרי"],
        description: "מטבח כשר במרכז דובאי עם תפריט מזרח תיכוני עשיר",
        imageUrl: "https://elliskosherkitchen.com/wp-content/uploads/2024/09/Dine-In_Round.png.webp",
    }
];

export const useRestaurants = () => {
    const [restaurants, setRestaurants] = React.useState(restaurant);

    const addRestaurant = (newRestaurant) => {
        setRestaurants((prevRestaurants) => [...prevRestaurants, newRestaurant]);
    };

    return { restaurants, addRestaurant };
};

export default restaurant;


