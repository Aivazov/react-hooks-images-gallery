import React, { Component, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
// import './Searchbar/Searchbar.css';
import ImageGalleryList from './ImageGalleryList/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal.js';

// axios.defaults.headers.common['Authorization'] =
//   '31522217-1daa00f4dac69c1e930d1cd07';
const API_KEY = '31522217-1daa00f4dac69c1e930d1cd07';

function fetchData({ searchQuery = '', currentPage = 1, pageSize = 12 }) {
  return axios
    .get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&page=${currentPage}&per_page=${pageSize}&image_type=photo&orientation=horizontal`
    )
    .then((res) => {
      console.log(res.data.hits);
      return res.data.hits;
    });
}

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentLargeImg, setCurrentLargeImg] = useState({});

  const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

  useEffect(() => {
    if (!searchQuery) return;
    fetchImages();
  }, [searchQuery]);

  const onChangeQuery = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setError(null);
    setShowModal(false);
  };

  function fetchImages() {
    const options = { searchQuery, currentPage };

    setIsLoading(true);
    fetchData(options)
      .then((images) => {
        if (images.length === 0) {
          return toast.warning('We found no matches. Please try again');
        }
        setImages((prev) => [...prev, ...images]);
        setCurrentPage(currentPage + 1);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }

  const toggleModal = (largeImage) => {
    setShowModal(!showModal);
    setCurrentLargeImg(largeImage);
  };

  return (
    <div>
      <Searchbar onSubmit={onChangeQuery} />
      {error && toast.warning(`Something went wrong: ${error.message}`)}

      <ImageGalleryList items={images} modal={toggleModal} />

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={currentLargeImg.largeImageURL} min-width="720" alt="..." />
        </Modal>
      )}

      {shouldRenderLoadMoreButton && <Button onClick={fetchImages} />}

      {isLoading && <Loader />}
    </div>
  );
}
