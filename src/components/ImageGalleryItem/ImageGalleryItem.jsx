import style from './ImageGalleryItem.module.css';
import PropTypes from "prop-types"

export const ImageGalleryItem = ({
  webUrl,
  onClick,
  largeImageURL
}) => {
  return (
    <li className={style.ImageGalleryItem} onClick={onClick} data-source={largeImageURL}> 
        <img className={style.ImageGalleryItem_image} src={webUrl} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webUrl: PropTypes.string,
  onClick: PropTypes.func,
  largeImageURL: PropTypes.string

}
