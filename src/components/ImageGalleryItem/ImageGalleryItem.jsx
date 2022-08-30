import PropTypes from 'prop-types';
import { GalleryImage, GalleryItem } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
    const setModalImageSrc = () => onClick(largeImageURL);
    
    return (  
        <GalleryItem>
            <GalleryImage src={webformatURL} onClick={setModalImageSrc} alt="" />
        </GalleryItem>
    )
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}