import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {API_URL} from '../constants';

function NewPostForm() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPost = {title,body};
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newPost),
            });
            if (response.ok) {
                const { id } = await response.json();
                navigate(`/posts/${id}`);

            } else {
                throw response;
            }
        } catch (error) {
            console.error('An error occurred while creating the post', error);
        }
    }

  return (
    <div>
        <h2>New Post</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                type="text"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="bodyInput">Body:</label>
                <textarea
                    id="bodyInput"
                    value = {body}
                    onChange={(event) => setBody(event.target.value)}
                    required
                    />
            </div>
            <div>
                <button type="submit">Create Post</button>
            </div>
        </form>
    </div>
  );
}

export default NewPostForm;