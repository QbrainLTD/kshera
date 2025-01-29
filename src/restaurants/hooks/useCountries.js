import { useState, useEffect } from "react";
import axios from "axios";

// Countries with diplomatic relations with Israel in Hebrew
const supportedCountries = [
    { english: "Israel", hebrew: "ישראל" },
    { english: "United States", hebrew: "ארצות הברית" },
    { english: "Canada", hebrew: "קנדה" },
    { english: "United Kingdom", hebrew: "בריטניה" },
    { english: "Germany", hebrew: "גרמניה" },
    { english: "France", hebrew: "צרפת" },
    { english: "Italy", hebrew: "איטליה" },
    { english: "Spain", hebrew: "ספרד" },
    { english: "Greece", hebrew: "יוון" },
    { english: "Cyprus", hebrew: "קפריסין" },
    { english: "Egypt", hebrew: "מצרים" },
    { english: "Jordan", hebrew: "ירדן" },
    { english: "United Arab Emirates", hebrew: "איחוד האמירויות" },
    { english: "Bahrain", hebrew: "בחריין" },
    { english: "Morocco", hebrew: "מרוקו" },
    { english: "Sudan", hebrew: "סודן" },
    { english: "Chad", hebrew: "צ'אד" },
    { english: "Azerbaijan", hebrew: "אזרבייג'ן" },
    { english: "Turkey", hebrew: "טורקיה" },
    { english: "Uzbekistan", hebrew: "אוזבקיסטן" },
    { english: "India", hebrew: "הודו" },
    { english: "China", hebrew: "סין" },
    { english: "Japan", hebrew: "יפן" },
    { english: "Brazil", hebrew: "ברזיל" },
    { english: "Argentina", hebrew: "ארגנטינה" },
    { english: "Australia", hebrew: "אוסטרליה" },
];

const useCountries = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v3.1/all");

                const countryList = supportedCountries
                    .map(({ english, hebrew }) => {
                        const countryData = response.data.find(
                            (country) => country.name.common === english
                        );
                        return countryData
                            ? { name: hebrew, englishName: english }
                            : null;
                    })
                    .filter(Boolean)
                    .sort((a, b) => a.name.localeCompare(b.name, "he")); // Sort by Hebrew

                setCountries(countryList);
            } catch (error) {
                console.error("Failed to fetch countries:", error);
            }
        };

        fetchCountries();
    }, []);

    return countries;
};

export default useCountries;
