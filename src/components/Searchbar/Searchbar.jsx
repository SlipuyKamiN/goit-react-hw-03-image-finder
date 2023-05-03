import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
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
