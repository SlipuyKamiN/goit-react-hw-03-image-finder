import PropTypes from 'prop-types';
import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

import {
  Bar,
  Form,
  FormButton,
  // FormButtonLabel,
  FormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = event => {
    this.setState({ query: event.currentTarget.value });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      toast.error('Please enter search query', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <Bar>
        <Form onSubmit={this.onSubmit}>
          <FormButton type="submit">
            <BsSearch size="100%" />
          </FormButton>
          <FormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </Form>
      </Bar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
