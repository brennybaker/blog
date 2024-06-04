import React, { useState, useEffect } from 'react';
import { API_URL } from '../constants';

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadPosts() {
            try {
                const response = await fetch(`${API_URL}`);
                if (response.ok) {
                    const json = await response.json();
                    setPosts(json);
                } else {
                    throw response;
                }
            } catch (error) {
                setError("An error occurred while fetching the data");
                console.error("An error occurred", error);
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="post-container">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}

export default PostsList;