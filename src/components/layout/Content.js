
import React, { Component } from 'react';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import NotFound from './../pages/errors/NotFound';
import ImageAscii from '../pages/characterizer/ImageAscii';
import Home from './../pages/Home';

class Content extends Component {

  render() {
    return (
      <div className="content">
        <div style={{ height: '20px' }}></div>
        <Switch>
          <Route exact={true} path="/" render={
            (props) =>
              <Home />
          } />
          <Route path="/home" render={
            (props) =>
              <Home app={this.props.app} />
          } />
          
          <Route path="/imageascii" render={
            (props) =>
              <ImageAscii app={this.props.app} />
          } />
          
          {/* ////////////404///////////////// */}
          <Route path="" component={NotFound} />
        </Switch></div>
    );
  }
}


export default Content;