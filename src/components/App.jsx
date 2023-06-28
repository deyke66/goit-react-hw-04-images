import { useCallback, useEffect, useState } from 'react';
import style from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { Gallery } from './ImageGallery/ImageGallery';
import { getData } from './helpers/fetchFunc';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notify } from 'notiflix';

export const App = () => {
  const [searchResult, setSearchResult] = useState('');
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [totalHits, setTotalHist] = useState(0);
  const [originalImg, setOriginalImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const result = await getData(searchResult, page);
    const { hits, totalHits: newHits } = result.data;
    if (newHits === 0) {
      Notify.failure('Nothing found, try something else');
    }
    setArticles(prevArt => [...prevArt, ...hits]);
    setTotalHist(newHits);
    setIsLoading(false);
  }, [searchResult, page]);

  useEffect(() => {
    if (searchResult === '') {
      return;
    }
    fetchData();
  }, [fetchData, searchResult]);

  const modalToggle = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const handleSubmitBtn = e => {
    e.preventDefault();
    const { value } = e.target.elements.search;
    if (value === searchResult) {
      return;
    }
    setSearchResult(value.trim());
    setArticles([]);
  };

  const handleLoadMoreBtnClick = useCallback(
    async e => {
      setPage(page + 1);
    },
    [page]
  );

  const handleOpenModal = useCallback(
    e => {
      setOriginalImg(e.currentTarget.dataset.source);
      modalToggle();
    },
    [modalToggle]
  );

  return (
    <div className={style.App}>
      <Searchbar onSubmit={handleSubmitBtn} />
      <Gallery articles={articles} onClick={handleOpenModal} />
      {showModal && <Modal originalImg={originalImg} onClose={modalToggle} />}
      {isLoading && <Loader />}
      {articles.length !== totalHits && (
        <Button onClick={handleLoadMoreBtnClick} />
      )}
    </div>
  );
};
