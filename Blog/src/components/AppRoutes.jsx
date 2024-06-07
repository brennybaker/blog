// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PostsList from './PostsList';
import PostDetails from './PostDetails';
import NewPostForm from './NewPostForm';
import PostEditForm from './PostEditForm';

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<PostsList />} />
      <Route exact path="/posts/:id" element={<PostDetails />} />
      <Route exact path="/posts/:id/edit" element={<PostEditForm />} />
      <Route exact path="/new" element={<NewPostForm />} />
    </Routes>
  );
}

export default AppRoutes;