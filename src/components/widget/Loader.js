
import React, { Component } from 'react';
import './Loader.css';

export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
      show: true
    }
   
  }

  componentDidUpdate() {
   
  }


  render() {
    if (this.props.show == false) {
      return null;
    }
    return (
      // <div style={{width:'100%', height:'50px',  color:'#ccc', textAlign:'center'}}>
        <div style={{position:'fixed', zIndex:10000, color: '#ccc'}}>
          <div className="columns" style={{width:'min-content'}}>
          <div className="column">
            <div className="lds-ring"  ><div></div><div></div><div></div><div></div></div> 
          </div>
          <div className="column"><span style={{fontSize:'2em'}}>Loading</span></div>
          </div>
        </div>
      // </div>
    )
  }
}