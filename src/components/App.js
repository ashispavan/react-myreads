import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import PostList from './PostList';
import {connect} from 'react-redux';
import {receivePosts} from '../actions';
import {Link, Route, Switch} from 'react-router-dom';
import PostNew from './PostNew';
import { withRouter } from 'react-router-dom';


class App extends Component {

  componentDidMount() {
    this.props.receivePosts();
  }
  


  render() {
    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Readable</h2>
        </div>
        <div className="App-intro">
        <Switch>
        
        <Route path="/posts/new" component={PostNew} />
        <Route path="/" render={() => <PostList posts={this.props.posts} />} />
        <Route path="/showPost" render={() => <div>Hello</div>} />
        
        
        </Switch>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('map state: ', state);
  return {
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    receivePosts: () => dispatch(receivePosts())
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
