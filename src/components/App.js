import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import PostList from './PostList';
import PostShow from './PostShow';
import PostEdit from './PostEdit';
import CommentEdit from './CommentEdit';
import CommentNew from './CommentNew';
import {Link} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
import PostNew from './PostNew';


class App extends Component {

  render() {
    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/"><h2 className="App-title">Readable</h2></Link>
        </div>
        <div className="App-intro">
        <Switch>
          <Route path="/posts/:id/edit" component={PostEdit} />
          <Route path="/posts/new" component={PostNew} />
          <Route path="/comments/new/:parentId" component={CommentNew} />
          <Route path="/comments/edit/:id" component={CommentEdit} /> 
          <Route path="/:category/:id" component={PostShow} />  
          <Route exact path="/" component={PostList} />    
        </Switch>
        <Route exact path="/:category/" component={PostList} />
        </div>
      </div>
    );
  }
}

export default App;
