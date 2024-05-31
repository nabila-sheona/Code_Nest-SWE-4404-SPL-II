import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Topics_for_cpp() {
    const [topics, setTopics] = useState([]);
    const [currentLevel, setCurrentLevel] = useState(0);

    const predefinedTopics = [
        { name: "Hello, World!", link: "/hello-world", levelRequired: 0 },
        { name: "Variables and Types", link: "/variables", levelRequired: 1 },
        { name: "Arrays", link: "/array", levelRequired: 2 },
        { name: "Operators", link: "/operators", levelRequired: 3 },
        { name: "Conditions", link: "/conditions", levelRequired: 4 },
        { name: "Strings", link: "/strings", levelRequired: 5 },
        { name: "For Loops", link: "/for-loops", levelRequired: 6 },
        { name: "While Loops", link: "/while-loops", levelRequired: 7 },
        { name: "Functions", link: "/functions", levelRequired: 8 },
        { name: "Static", link: "/static", levelRequired: 9 }
    ];

    const { currentUser, error } = useSelector((state) => state.user);
    const courseName = 'Cpp';

    const fetchUserLevel = async () => {
        try {
            const url = `/api/course/user-level/${encodeURIComponent(courseName)}/${currentUser.username}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch user level');
            }
            const data = await response.json();
            setCurrentLevel(data);
        } catch (error) {
            console.error('Error fetching user level:', error);
        }
    };

    useEffect(() => {
        if (currentUser && currentUser.username && courseName) {
            fetchUserLevel();
        }
    }, [currentUser, courseName]);

    useEffect(() => {
        const unlockedTopics = predefinedTopics.map(topic => ({
            ...topic,
            isUnlocked: topic.levelRequired <= currentLevel
        }));
        setTopics(unlockedTopics);
    }, [currentLevel]);

    return (
        <div className="bg-gradient-to-br from-sky-300 to-white-500">
            <div className="p-3 max-w-lg mx-auto min-h-screen">
                <h1 className="text-3xl font-semibold text-center my-7">Topics</h1>
                {error && <div className="text-red-500">{error}</div>}
                <div className="text-center text-xl font-semibold mb-4">
                    Current User Level: {currentLevel}
                </div>
                <ul>
                    {topics.map((topic, index) => (
                        <li key={index} className={`text-indigo-900 hover:text-gray-500 ${!topic.isUnlocked ? 'opacity-50' : ''}`}>
                            {topic.isUnlocked ? (
                                <Link to={topic.link}>{topic.name} [Unlocked]</Link>
                            ) : (
                                <span>{topic.name} [Locked]</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
