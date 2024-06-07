// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../constants';

function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
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
      }
    };

    fetchCurrentPost();
  }, [id]);

  const deletePost = async () => {
    if (window.confirm("Your post will be deleted if you continue. Still wish to continue?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log("Post deleted successfully");
          navigate("/");
        } else {
          throw response;
        }
      } catch (error) {
        console.error('An error occurred while deleting the post', error);
      }
    }
  };

  if (!post) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
      {" | "}
      <Link to="/">Back to Posts List</Link>
      {" | "}
      <button onClick={deletePost}>Delete</button>
    </div>
  );
}

export default PostDetails;