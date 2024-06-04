// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PostsList from './PostsList';
import PostDetails from './PostDetails';

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<PostsList />} />
      <Route exact path="/posts/:id" element={<PostDetails />} />
      <Route exact path="/new" element={<h1>New Post</h1>} />
    </Routes>
  );
}

export default AppRoutes;