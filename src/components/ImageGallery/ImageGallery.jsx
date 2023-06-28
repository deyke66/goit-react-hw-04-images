import style from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const Gallery = ({ articles, onClick }) => {
  return (
    <ul className={style.ImageGallery}>
      {articles.map(i => (
        <ImageGalleryItem
          key={i.id}
          webUrl={i.webformatURL}
          onClick={onClick}
          largeImageURL={i.largeImageURL}
        />
      ))}
    </ul>
  );
};

Gallery.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
  onCLick: PropTypes.func,
};
