import style from './Searchbar.module.css';
import PropTypes from "prop-types";

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={style.SearchForm_button}>
          <span className={style.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={style.SearchForm_input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};


Searchbar.propTypes = {
  onSubmit: PropTypes.func
}