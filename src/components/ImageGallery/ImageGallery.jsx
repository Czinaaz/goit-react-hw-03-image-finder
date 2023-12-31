import PropTypes from 'prop-types';
import { Component } from 'react';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';
import { createRequest } from '../API/pixabay';


const STATUS = {
  idle: 'idle',
  loading: 'loading',
  error: 'error',
  success: 'success',
};
class ImageGallery extends Component {
  static propTypes = {
    handlerOpenModal: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
  };

  state = {
    imageList: [],
    page: 1,
    status: STATUS.idle,
    totalHits: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState({ status: STATUS.loading });
      createRequest(this.props.query)
        .then(res => {
          const { data } = res;

          this.setState(prevState => ({
            imageList: [...data.hits],
            page: 2,
            totalHits: data.totalHits,
            status: STATUS.success,
          }));
        })
        .catch(error => {
          this.setState({ status: STATUS.error, error });
        });
    }
  }
  loadMore = () => {
    createRequest(this.props.query, this.state.page)
      .then(res => {
        const { hits } = res.data;
        this.setState(prevState => ({
          imageList: [...prevState.imageList, ...hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => {
        this.setState({ status: STATUS.error, error });
      });
  };

  render() {
    const { imageList, page, totalHits, status, error } = this.state;

    if (status === STATUS.loading) {
      return <Loader className={css.loader} />;
    }
    if (status === STATUS.error) {
      return <p>{error}</p>;
    }
    if (!imageList.length) {
      return <p className={css.textGallery}>{`Please, enter the search request`}</p>;
    }
    if (status === STATUS.success) {
      return (
        <>
          <ul className={css.ul}>
            {imageList.map(({ id, webformatURL, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  smallImg={webformatURL}
                  largeImg={largeImageURL}
                  handlerOpenModal={this.props.handlerOpenModal}
                />
              );
            })}
          </ul>
          {totalHits >= 12 * page && <Button onClick={this.loadMore} />}
        </>
      );
    }
  }
}

export { ImageGallery };