import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handlerInput = (elem) => {
    const { name, value } = elem.target;
    this.setState({ [name]: value });
  };

  handlerSubmit = (elem) => {
    const { query } = this.state;
    elem.preventDefault();

    if (!query.trim()) {
      toast.error('empty field', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <header className={css.header}>
        <div className={css.cziSearch}>
          <div>
            Czinaaz <span>Search</span> 
          </div>
        </div>
        <form onSubmit={this.handlerSubmit}>
          <button className={css.button} type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>

          <input
            className={css.input}
            type="text"
            name="query"
            value={query}
            autoComplete="off"
            onChange={this.handlerInput}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export { Searchbar };
