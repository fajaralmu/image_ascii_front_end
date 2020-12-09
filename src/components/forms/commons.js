
import React, { Component } from 'react';
import './FormControls.css'
import { replaceString } from '../../utils/StringUtil';

export const CapitalizeFirstLetter = (rawString) => {
    if (null == rawString || rawString.length <= 1) {
        return rawString;
    }
    const string = new String(rawString);
    
    let splitted = string.split("_");
    if (splitted.length > 1) {
        let result = "";
        for (let i = 0; i < splitted.length; i++) {
            const element = splitted[i];
            result+=CapitalizeFirstLetter(element)+ " ";
        }

        return result;
    }
    let result = (string).substring(0,1).toUpperCase();
    result+= (string).substring(1, string.length);

    return result;
}

export const TableHeadWithFilter = (props) => {
    const headers = props.headers;
    const onButtonOrderClick = props.onButtonOrderClick;
    return (<thead>
        <tr>
            {headers.map((header, i) => {
                const label = header.alias?header.alias:header.text;
                return <th key={"TH_"+i}>{CapitalizeFirstLetter(label)}

                    {header.withFilter ?
                       <div className="field has-addons">
                       <div className="control">
                                <InputFormFilter type="text" name={header.text} />
                            </div>
                            <div className="control" style={{fontSize:'0.7em', backgroundColor:'#ccc'}}>
                                <i sort="asc" onClick={onButtonOrderClick} data={header.text} className="fas fa-angle-up sort-button"></i>
                                <i sort="desc" onClick={onButtonOrderClick}  data={header.text}  className="fas fa-angle-down sort-button"></i>
                            </div>
                           
                        </div>
                        : null}
                </th>
            })}
        </tr>
    </thead>)
}
//not exported
const InputFormFilter = (props) => {
    const className = "input form-filter";
    const type = props.type ? props.type : 'text';

    return <input className={className} type={type} name={props.name}
        id={'input-form-' + props.name} />
}

export const ButtonApplyResetFilter = (props) => {
    return (
        <>
            <div className="buttons has-addons">
            <button type="submit" className="button is-info">
                <span className="icon">
                    <i className="fas fa-search"></i>
                </span>
                <span>Apply Filter</span>
            </button>
            <button type="reset" className="button is-danger">
                <span className="icon">
                    <i className="fas fa-sync"></i>
                </span>
                <span>Reset Filter</span>
            </button>
            </div>
        </>
    )
}



export const InputField = (props) => {

    const className = "input input-form-field "+props.className;
    const orientation = props.orientation?props.orientation:"horizontal";
    const label = props.label ? props.label : props.name;
    return (
        <div className={"field is-"+orientation}>
            <div className="field-label is-normal">
                <label className="label">{CapitalizeFirstLetter(label)}</label>
                  
            </div>
            <div className="field-body">
                <div className="field">
                    <div className="control">
                        {props.required == true ?
                            props.type == 'textarea' ?
                                <textarea required className={className + " textarea"} id={'input-form-field-' + props.name} name={props.name}></textarea>
                                :
                                <input required type={props.type ? props.type : 'text'} id={'input-form-field-' + props.name} name={props.name} className={className} />
                            :
                            props.type == 'textarea' ?
                                <textarea className={className + " textarea"} id={'input-form-field-' + props.name} name={props.name}></textarea>
                                :
                                <input type={props.type ? props.type : 'text'} id={'input-form-field-' + props.name} name={props.name} className={className} />
                        }
                        {props.note? 
                            <p><i>Note: {props.note}</i></p>
                            :null
                        }  
                    </div>
                </div>
            </div>
        </div>
    );
}

export const SelectField = (props) => {
    const optionValues = props.options == null ? [] : props.options;
    const options = optionValues.map((option, i) => {
        return <option key={"select-option-"+i} value={option.value} >{option.text}</option>
    })
    const label = props.label?props.label:props.name;
    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal"><label className="label">{CapitalizeFirstLetter(label)}</label></div>
            <div className="field-body">
                <div className="field">
                    <div className="control">
                        {props.required == true ?
                            <select required id={'input-form-field-' + props.name} name={props.name}
                                className="input input-form-field">
                                {options}
                            </select>
                            :
                            <select id={'input-form-field-' + props.name} name={props.name}
                                className="input input-form-field">
                                {options}
                            </select>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export const LabelField = (props) => {

    const className = "input";
    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal"><label className="label">{props.label ? CapitalizeFirstLetter(props.label) : "Label"}</label></div>
            <div className="field-body">
                <div className="field">
                    <div className="control">
                        {props.value}
                    {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const SubmitResetButton = (props) => {
    const submitValue = props.submitText ? props.submitText : "Submit";
    const submitIconClassName = props.submitIconClassName ? props.submitIconClassName : "fas fa-save";
    const submitButtonClassName = props.submitButtonClassName ? "button "+ props.submitButtonClassName : "button is-link";
    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal" />
            <div className="field-body">
                <div className="field">
                    <button className={submitButtonClassName} type="submit" style={{marginRight:'10px'}} >
                        <span className="icon"><i className={submitIconClassName}></i></span>
                        <span>{submitValue}</span>
                    </button>
                    {props.withReset == true ?
                        <button className="button is-danger" type="reset" >
                            <span className="icon">
                                <i className="fas fa-sync"></i>
                            </span>
                            <span>Reset</span>
                        </button> : null
                    }
                </div>
            </div>
        </div>
    )
}
