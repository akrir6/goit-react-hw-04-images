import { useState, useEffect } from "react";
import { animateScroll as scroll } from 'react-scroll';
import { pixabayGetImages } from "./../services/pixabayAPI";
import { Container } from "./App.styled";
import { Loader } from "./Loader/Loader"; 
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { BadRequest } from "./BadRequest/BadRequest";
import { ModalWindow } from "./Modal/Modal";

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotLastPage, setIsNotLastPage] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
    
  useEffect(() => {
  if (!query) return;

    (async () => {
      setIsLoading(true);
      const { imagesData, totalHits, lastPage } = await pixabayGetImages(query, page);

      if (totalHits) {
        setImages(prevImages => [...prevImages, ...imagesData])
      }
  
      setIsNotLastPage(!lastPage);
      setIsLoading(false);
      setIsEmpty(!totalHits);    

      if (page!==1) scroll.scrollToBottom();
    })();
  
  }, [query, page])

  
    
  const searchQueryHandler = (query) => {
    if (query) {
      setImages([]);
      setPage(1);
      setQuery(query);
    }
  }
  
  const loadMoreHandler = () => {
    setPage(prevPage => prevPage + 1);
  }
  
  const openModalHandler = (largeImageURL) => {
    setModalImageSrc(largeImageURL);
    setShowModal(true);
  }

  const closeModalHandler = () => {
    setShowModal(false);
  }

  return (      
    <Container>
      <Searchbar onSubmit={searchQueryHandler} />
      {images.length>0 &&
        <ImageGallery images={images} onClick={openModalHandler} />
      }
      {isLoading
        ? <Loader />
        : isNotLastPage && <Button onClick={loadMoreHandler}>
            Load more
        </Button>
      }
      {isEmpty && <BadRequest>
          Sorry, there are no images matching your search query. Please try again.
        </BadRequest>
      }
      {showModal && 
        <ModalWindow modalImageSrc={modalImageSrc} onClickOverlay={closeModalHandler} />
      }
    </Container>
        
  )
}


