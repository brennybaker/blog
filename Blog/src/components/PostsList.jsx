// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    
    const deletePost = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const updatedPosts = posts.filter((post) => post.id !== id);
                setPosts(updatedPosts);
            } else {
                throw response;
            }
        } catch (error) {
            console.error('An error occurred while deleting the post', error);
        }
    }

    const handleDelete = (id) => {
        if (window.confirm("Your post will be deleted if you continue. Still wish to continue?")) {
            deletePost(id);
        }
    };

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
                    <h2>
                        <Link to={`/posts/${post.id}`} className="post-title">
                            {post.title}
                        </Link>
                    </h2>
                    <div className="post-links">
                        {/* <button onClick={() => editPost(post.id)}>Edit</button> */}
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostsList;