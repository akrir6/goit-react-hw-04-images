import PropTypes from 'prop-types'
import { ImageGalleryStyled } from "./ImageGallery.styled"
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'

export const ImageGallery = ({ images, onClick }) => {
    return (
        <ImageGalleryStyled>
            {images.map(({ id, webformatURL, largeImageURL }) => (
                <ImageGalleryItem key={id}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    onClick={onClick}
                />
            ))}
        </ImageGalleryStyled>
    )
}

ImageGallery.propTypes = {
     images: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    })).isRequired,
    onClick: PropTypes.func.isRequired,
}