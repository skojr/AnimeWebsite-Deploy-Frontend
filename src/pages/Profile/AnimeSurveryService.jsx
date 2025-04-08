import axios from "axios";

const ANILIST_API_URL = "https://graphql.anilist.co";

export const fetchSurveyData = async (genre, length) => {
    try {
        // GraphQL query to fetch anime data by genre
        const query = `
            query ($page: Int, $perPage: Int, $genre: [String]) {
                Page(page: $page, perPage: $perPage) {
                    media(genre_in: $genre, type: ANIME, sort: POPULARITY_DESC) {
                        id
                        title {
                            romaji
                            english
                        }
                        episodes
                        genres
                        averageScore
                    }
                }
            }
        `;

        // Define variables for the query
        const variables = {
            page: 1, // Firs page
            perPage: 20, // Number of results per page
            genre: [genre], // Pass the genre as an array
        };

        // Make the POST request to AniList API
        const response = await axios.post(
            ANILIST_API_URL,
            { query, variables },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // Extract data from the response
        const data = response.data.data.Page.media;
        console.log("Fetched anime data:", data);

        // Filter results by episode length
        const filteredData = data.filter((anime) => {
            const episodes = anime.episodes || 0;
            return (
                (length === "short" && episodes <= 12) ||
                (length === "medium" && episodes > 12 && episodes <= 24) ||
                (length === "long" && episodes > 24)
            );
        });

        // Return up to 5 recommendations
        return filteredData.slice(0, 5);
    } catch (error) {
        console.error("Error fetching AniList data:", error.response || error.message);
        throw new Error("Failed to fetch anime data from AniList.");
    }
};
