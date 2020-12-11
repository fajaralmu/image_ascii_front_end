import  React  from 'react';

export const AnchorWithIcon = (props) => {
    const className = props.className;
    const iconClassName = props.iconClassName;
    return (
        <a {...props.attributes} className={"button " +className} style={props.style} onClick={props.onClick}>
            <span className="icon">
                <i className={iconClassName}></i>
            </span>
            <span>{props.children}</span>
        </a>
    )
}