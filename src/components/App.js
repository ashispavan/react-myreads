import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import PostList from './PostList';
import {connect} from 'react-redux';
import receivePosts from '../actions';

class App extends Component {

componentDidMount() {
  this.props.receivePosts();
}

  render() {
    console.log(this.props);
    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <PostList posts={this.props.posts} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    receivePosts: () => dispatch(receivePosts('http://localhost:5001/posts'))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
