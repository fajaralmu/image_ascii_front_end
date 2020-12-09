
import React, { Component } from 'react';
export default class Columns extends Component 
{
    render(){
        const cells = this.props.cells?this.props.cells:[];
        return (
            <div className="columns">
                {cells.map((cell, i)=>{
                    return <div key={"column-"+i} className="column">{cell}</div>
                })}
            </div>
        )
    }
}