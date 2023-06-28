import { Component } from 'react';
import style from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { Gallery } from './ImageGallery/ImageGallery';
import { getData } from './helpers/fetchFunc';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notify } from 'notiflix';

export class App extends Component {
  state = {
    searchResult: '',
    page: 1,
    articles: [],
    totalHits: 0,
    originalImg: '',
    isLoading: false,
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchResult, page, articles } = this.state;
    if (prevState.searchResult !== searchResult || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const fetchData = await getData(searchResult, page);
        const { hits, totalHits } = fetchData.data;
        if (totalHits === 0) {
          Notify.failure('Nothing found, try something else');
        }
        this.setState({
          articles: [...articles, ...hits],
          totalHits: totalHits,
          isLoading: false,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  modalToggle = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  handleLoadMoreBtnClick = async e => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };
  handleOpenModal = e => {
    this.setState({ originalImg: e.currentTarget.dataset.source });
    this.modalToggle();
  };
  handleSubmitBtn = e => {
    e.preventDefault();
    const { value } = e.target.elements.search;

    this.setState(prevState => {
      if (prevState.searchResult !== value) {
        return {
          searchResult: value.trim(),
          articles: [],
        };
      }
    });
  };
  render() {
    const { articles, originalImg, showModal, totalHits, isLoading } =
      this.state;
    return (
      <div className={style.App}>
        <Searchbar onSubmit={this.handleSubmitBtn} />
        <Gallery articles={articles} onClick={this.handleOpenModal} />
        {showModal && (
          <Modal originalImg={originalImg} onClose={this.modalToggle} />
        )}
        {isLoading && <Loader />}
        {articles.length !== totalHits && (
          <Button onClick={this.handleLoadMoreBtnClick} />
        )}
      </div>
    );
  }
}
