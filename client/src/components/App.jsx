import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageHeader from './ImageHeader.jsx';
import MinImageHeader from './MinImageHeader.jsx';
import Modal from './Modal.jsx';
import SaveButtonPortal from './SaveButtonPortal.jsx';
import ShareButtonPortal from './ShareButtonPortal.jsx';
import Header from './Header/Header.jsx';

const App = (props) => {
  const [loadedGallery, setLoadedGallery] = useState(null);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowSave, setIsShowSave] = useState(false);
  const [isShowShare, setIsShowShare] = useState(false);
  const [clickedImage, setClickedImage] = useState(0);

  const clickedImageHandler = (e) => {
    setClickedImage(e.target.name);
  };

  const resizeHandler = () => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  const viewSelectHandler = (bool) => {
    setIsShowModal(bool);
  };

  const shareButtonHandler = (bool) => {
    setIsShowShare(bool);
  };

  const saveButtonHandler = (bool) => {
    setIsShowSave(bool);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  });


  const fetchData = () => {
    axios.get(props.url)
      .then(({ data }) => {
        setLoadedGallery(data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    // fetchData();
  }, []);


  let content =
    (
      <>
        <Header />
      </>);

  if (!isShowModal && loadedGallery
    && dimensions.width / screen.width > 0.58046875) {
    content = (
      <>
        <Header />
        <ImageHeader
          data-testid="header"
          viewSelectHandler={viewSelectHandler}
          clickedImageHandler={clickedImageHandler}
          dimensions={dimensions}
          listingObj={loadedGallery}
          shareButtonHandler={shareButtonHandler}
          saveButtonHandler={saveButtonHandler}
        />
        {isShowSave ?
          <SaveButtonPortal saveButtonHandler={saveButtonHandler} />
          : null}
        {isShowShare ?
          <ShareButtonPortal shareButtonHandler={shareButtonHandler} />
          : null}
      </>
    );
  }
  if (!isShowModal && loadedGallery
    && dimensions.width / screen.width <= 0.58046875) {
    content = (
      <>
        <Header />
        <MinImageHeader
          viewSelectHandler={viewSelectHandler}
          listingObj={loadedGallery}
        />
      </>
    );
  }
  if (isShowModal && loadedGallery) {
    content = (
      <>
        <Modal
          listingObj={loadedGallery}
          clickedImage={clickedImage}
          viewSelectHandler={viewSelectHandler}
        />
      </>
    );
  }

  return content;
};


export default App;
