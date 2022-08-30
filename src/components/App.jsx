import { Component } from "react";
import { pixabayGetImages } from "./../services/pixabayAPI";
import { Container } from "./App.styled";
import { Loader } from "./Loader/Loader"; 
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { BadRequest } from "./BadRequest/BadRequest";
import { ModalWindow } from "./Modal/Modal";
export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    modalImageSrc:'',
    showModal: false,
    isLoading: false,
    isNotLastPage: false,
    isEmpty:false,
   }

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
     console.log(prevState.page,this.state.page);
    if (prevState.query !== query || prevState.page !== page) {
     
      this.reciveImagesData();
      
    }

    if (page !== 1) {
      document.body.scrollIntoView({
        behavior: "smooth", block: "end"
      });
    }
    
  }

  async reciveImagesData() {
    const { images, query, page } = this.state;
    
    this.setState({ isLoading: true });
    const { imagesData, totalHits } = await pixabayGetImages(query, page);

    if (totalHits) {
      this.setState(prevState => ({
        images: [...prevState.images, ...imagesData]
      }));
    }
  
    this.setState({
      isNotLastPage: images.length+imagesData.length < totalHits,
      isLoading: false,
      isEmpty: !totalHits,
    })
    
  }
    
  searchQueryHandler = (query) => {
    if (query) {
      this.setState({
        images: [],
        page: 1,
        query,
      });
    }
  }
  
  loadMoreHandler = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }
  
  openModalHandler = (largeImageURL) => {
    this.setState({
      modalImageSrc: largeImageURL,
      showModal: true,
    })
  }

  closeModalHandler = () => {
    this.setState({showModal: false})
  }

  render() {
    const { images, isLoading, isNotLastPage, isEmpty, showModal, modalImageSrc } = this.state;
    
    return (      
      <Container>
        <Searchbar onSubmit={this.searchQueryHandler} />
        {images.length>0 &&
          <ImageGallery images={images} onClick={this.openModalHandler} />
        }
        {isLoading
          ? <Loader />
          : isNotLastPage && <Button onClick={this.loadMoreHandler}>
              Load more
          </Button>
        }
        {isEmpty && <BadRequest>
            Sorry, there are no images matching your search query. Please try again.
          </BadRequest>
        }
        {showModal && 
          <ModalWindow modalImageSrc={modalImageSrc} onClickOverlay={this.closeModalHandler} />
        }
      </Container>
         
    )
  }
}

