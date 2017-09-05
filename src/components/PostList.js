import React, {Component} from 'react';

class BookList extends Component {
    render() {
        return (
            <h4>{this.props.posts ? this.props.posts[0].title : ''}</h4>
        );
    }
}

export default BookList;