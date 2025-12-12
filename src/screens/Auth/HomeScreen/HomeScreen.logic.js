// src/screens/Auth/HomeScreen/HomeScreen.logic.js

import { useState, useEffect } from "react";

export const ALL_USERS = [
    { id: 1, name: "Varun", age: 20, location: "Goa", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" },
    { id: 2, name: "Natasha", age: 20, location: "Mumbai", image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" },
    { id: 3, name: "Aron", age: 20, location: "Pune", image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" },
    { id: 4, name: "Swizel", age: 20, location: "Goa", image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" },
    { id: 5, name: "Priya", age: 20, location: "Delhi", image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" },
    { id: 6, name: "Jos", age: 20, location: "Bangalore", image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" },

    { id: 7, name: "Simran", age: 21, location: "Chennai", image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" },
    { id: 8, name: "Kabir", age: 23, location: "Hyderabad", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" },
    { id: 9, name: "Riya", age: 19, location: "Noida", image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" },
    { id: 10, name: "Krish", age: 22, location: "Surat", image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" },
    { id: 11, name: "Maya", age: 24, location: "Indore", image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" },
    { id: 12, name: "Dev", age: 21, location: "Ahmedabad", image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" },
];

const PAGE_SIZE = 6;

// ----------------------------
// 🎯 Custom Hook for Logic
// ----------------------------
export function useHomeScreenLogic() {
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [skeletonLoading, setSkeletonLoading] = useState(true);

    // Skeleton loader for 1 second
    useEffect(() => {
        setTimeout(() => {
            setSkeletonLoading(false);
            loadMoreUsers();
        }, 1000);
    }, []);

    // Load more paginated users
    const loadMoreUsers = () => {
        if (loadingMore) return;

        setLoadingMore(true);

        setTimeout(() => {
            const start = (page - 1) * PAGE_SIZE;
            const newUsers = ALL_USERS.slice(start, start + PAGE_SIZE);

            if (newUsers.length > 0) {
                setUsers(prev => [...prev, ...newUsers]);
                setPage(prev => prev + 1);
            }
            setLoadingMore(false);
        }, 600);
    };

    return {
        users,
        loadingMore,
        skeletonLoading,
        loadMoreUsers,
    };
}
