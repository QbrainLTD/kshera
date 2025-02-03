import { useState, useEffect } from "react";

const supportedCountries = [
    { englishName: "Israel", name: "ישראל" },
    { englishName: "United States", name: "ארצות הברית" },
    { englishName: "Canada", name: "קנדה" },
    { englishName: "United Kingdom", name: "אנגליה" },
    { englishName: "Germany", name: "גרמניה" },
    { englishName: "France", name: "צרפת" },
    { englishName: "Italy", name: "איטליה" },
    { englishName: "Spain", name: "ספרד" },
    { englishName: "Greece", name: "יוון" },
    { englishName: "Cyprus", name: "קפריסין" },
    { englishName: "Egypt", name: "מצרים" },
    { englishName: "Jordan", name: "ירדן" },
    { englishName: "United Arab Emirates", name: "איחוד האמירויות" },
    { englishName: "Bahrain", name: "בחריין" },
    { englishName: "Morocco", name: "מרוקו" },
    { englishName: "Sudan", name: "סודן" },
    { englishName: "Chad", name: "צ'אד" },
    { englishName: "Azerbaijan", name: "אזרבייג'ן" },
    { englishName: "Turkey", name: "טורקיה" },
    { englishName: "Uzbekistan", name: "אוזבקיסטן" },
    { englishName: "India", name: "הודו" },
    { englishName: "China", name: "סין" },
    { englishName: "Japan", name: "יפן" },
    { englishName: "Brazil", name: "ברזיל" },
    { englishName: "Argentina", name: "ארגנטינה" },
    { englishName: "Australia", name: "אוסטרליה" },
];

const useCountries = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        setCountries([...supportedCountries].sort((a, b) =>
            a.name.localeCompare(b.name, "he")
        ));
    }, []);

    return countries;
};

export default useCountries;
