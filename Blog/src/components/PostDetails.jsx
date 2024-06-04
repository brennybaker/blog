// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '../constants';


function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

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

    if (!post) return <h2>Loading...</h2>;

  return (
    <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <Link to="/">Back to Posts List</Link>
    </div>
  );
}

export default PostDetails;