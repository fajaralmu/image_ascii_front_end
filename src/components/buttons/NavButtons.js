
import React, { Component } from 'react';
 
class NavButtons extends Component
{
    constructor(props) {
        super(props);

        this.onClick = (index) => {
            if(this.props.onClick) {
                this.props.onClick(index);
            }
        }
    }

    render() {
        const buttonValues = generateButtonValues(this.props.limit, this.props.totalData, this.props.activeIndex);
        const buttonsData = [];
        for (let i = 0; i < buttonValues.length; i++) {
            const element = buttonValues[i];
            buttonsData.push({
                index: element,
            })
        }

        return (
            <div className="buttons" style={{marginTop:'5px', marginBottom: '5px'}}>
                {buttonsData.map((data, i)=>{
                    const className = data.index == this.props.activeIndex ? "button is-link" : "button is-light";
                    return (
                        <a key={"nav_btn_"+i} onClick={()=>{this.onClick(data.index)}} className={className}>{data.index}</a>
                    )  
                })}
            </div>
        )
    }

}

const generateButtonValues = (limit, totalData, currentPage) => {

    /* DISPLAYED BUTTONS */
    const displayed_buttons = [];
    const buttonCount = Math.ceil(totalData / limit);
    const min = currentPage - 2;
    const max = currentPage + 2;
    if (buttonCount > 1) {
        displayed_buttons.push(1);
    }
    for (let i = min; i <= max; i++) {
        if (i > 1 && i <= buttonCount) {
            (displayed_buttons.push(i));
        }
    }
    if (max < buttonCount) {
        displayed_buttons.push(buttonCount);
    }

    return displayed_buttons;
}

export default NavButtons;