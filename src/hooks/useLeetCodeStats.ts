import { useState, useEffect } from "react";

interface LeetCodeData {
    solvedProblem: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    totalQuestions: number;
    ranking: number | string;
    acceptanceRate: number;
    allQuestionsCount: { difficulty: string; count: number }[];
}

const fallbackData: LeetCodeData = {
    solvedProblem: 202,
    easySolved: 132,
    mediumSolved: 59,
    hardSolved: 11,
    totalQuestions: 3873,
    ranking: "747,525",
    acceptanceRate: 84.03,
    allQuestionsCount: [
        { difficulty: "Easy", count: 932 },
        { difficulty: "Medium", count: 2026 },
        { difficulty: "Hard", count: 915 }
    ]
};

export const useLeetCodeStats = (username: string = "ghetiyanehil") => {
    const [data, setData] = useState<LeetCodeData>(() => {
        // Initialize from localStorage if available
        const cached = localStorage.getItem(`leetcode_stats_${username}`);
        return cached ? JSON.parse(cached) : fallbackData;
    });
    const [loading, setLoading] = useState(false); // Never show loading spinner on first paint
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            // List of mirrors to try in order of preference
            const mirrors = [
                `https://alfa-leetcode-api.onrender.com/userProfile/${username}`,
                `https://leetcode-api-faisalshohag.vercel.app/${username}`,
                `https://leetcode-stats-api.herokuapp.com/${username}`
            ];

            let success = false;
            let lastError = "";

            for (const url of mirrors) {
                try {
                    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);

                    const json = await response.json();

                    // Standardize the response from different mirrors
                    const mappedData: LeetCodeData = {
                        solvedProblem: json.totalSolved || json.solvedProblem || json.total_solved || json.solved || 0,
                        easySolved: json.easySolved || json.easy_solved || 0,
                        mediumSolved: json.mediumSolved || json.medium_solved || 0,
                        hardSolved: json.hardSolved || json.hard_solved || 0,
                        totalQuestions: json.totalQuestions || json.total_questions || 3290,
                        ranking: json.ranking || "N/A",
                        acceptanceRate: json.acceptanceRate || json.acceptance_rate || json.acceptance || 0,
                        allQuestionsCount: json.allQuestionsCount || json.all_questions_count || [
                            { difficulty: "Easy", count: 932 },
                            { difficulty: "Medium", count: 2026 },
                            { difficulty: "Hard", count: 915 }
                        ]
                    };

                    if (mappedData.solvedProblem > 0) {
                        setData(mappedData);
                        localStorage.setItem(`leetcode_stats_${username}`, JSON.stringify(mappedData));
                        setError(null);
                        success = true;
                        break; // Exit loop if successful
                    }
                } catch (err) {
                    console.warn(`Mirror failed: ${url}`, err);
                    lastError = err instanceof Error ? err.message : "Connection failed";
                }
            }

            if (!success) {
                console.warn(lastError || "All API mirrors failed. Keeping cached/fallback statistics.");
            }
            setLoading(false);
        };

        fetchData();
        const interval = setInterval(fetchData, 15 * 60 * 1000); // 15 minutes
        return () => clearInterval(interval);
    }, [username]);

    return { data, loading, error };
};
