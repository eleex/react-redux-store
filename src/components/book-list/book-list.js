import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchBooks, bookAddedToCart } from "../../actions";
import BookListItem from "../book-list-item";
import { withBookstoreService } from "../hoc";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

import "./book-list.css";

const BookList = ({ books, onAddedToCart }) => {
  const renderItems = book => {
    return (
      <li key={book.id} className="list-group-item">
        <BookListItem
          book={book}
          onAddedToCart={() => {
            onAddedToCart(book.id);
          }}
        />
      </li>
    );
  };

  return <ul className="book-list">{books.map(renderItems)}</ul>;
};

class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator error={error.message} />;
    }

    return <BookList books={books} onAddedToCart={onAddedToCart} />;
  }
}

const mapStateToProps = state => {
  return {
    books: state.bookList.books,
    loading: state.bookList.loading,
    error: state.bookList.error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return bindActionCreators(
    {
      fetchBooks: fetchBooks(bookstoreService),
      onAddedToCart: bookAddedToCart
    },
    dispatch
  );
};

export default withBookstoreService()(
  connect(mapStateToProps, mapDispatchToProps)(BookListContainer)
);
