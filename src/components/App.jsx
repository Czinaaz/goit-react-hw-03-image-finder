import { Component } from 'react';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export class App extends Component {
  state = {
    image: '',
    query: '',
  };

  handlerOpenModal = img => {
    this.setState({ image: img });
  };

  handlerCloseModal = () => {
    this.setState({ image: '' });
  };
  
  handlerForm = query => {
    this.setState({ query });
  };

  render() {
    const { query, image } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handlerForm} />

        <ImageGallery query={query} handlerOpenModal={this.handlerOpenModal} />

        {image && <Modal image={image} onClose={this.handlerCloseModal} />}
        <ToastContainer />
      </div>
    );
  }
}