// eslint-disable-next-line no-unused-vars
import {React, useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {API_URL} from '../constants'

function PostEditForm() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const json = await response.json();
          setPost(json);
        } else {
          throw response;
        }
      } catch (error) {
        console.error("An error occurred while fetching the data", error);
        setError(error);
      }finally{
        setLoading(false);
      }
    };

    fetchCurrentPost();
  }, [id]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(post),
      });
      if (response.ok) {
        const json = await response.json();
        console.log("Success:", json)
        navigate(`/posts/${id}`);
      } else {
        throw response;
      }
    } catch (error) {
      console.error('An error occurred while updating the post', error);
    }
  };

  if (!post) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="post-title">Title:</label>
          <input
            type="text"
            id="post-title"
            value={post.title}
            onChange={(event) => setPost({...post, title: event.target.value})}
          />
        </div>
        <div>
          <label htmlFor="post-body">Body:</label>
          <textarea
            id="post-body"
            value={post.body}
            onChange={(event) => setPost({...post, body: event.target.value})}
            required
          />
        </div>
        <div>
          <button type="submit">Update Post</button>
        </div>
      </form>
    </div>
  )
}

export default PostEditForm
