import React, { Component } from 'react'
import Label from '../components/container/Label'
import * as componentUtil from './ComponentUtil'
import InstantTable from './../components/container/InstantTable';
import ComboBoxes from './../components/inputs/ComboBoxes';

export const FilterBox = props => {
    return (
        <div className="filter-box rounded" >
            <InstantTable valign="bottom" rows={props.rows} />
        </div>
    )
}

export const DateSelectionFrom = (props) => {
    return (
        <ComboBoxes values={[{
            label: "From Month",
            id: "select-month-from",
            defaultValue: props.monthVal,
            options: componentUtil.getDropdownOptionsMonth(),
            handleOnChange: props.handleOnChangeMfrom
        }, {
            label: "Year",
            id: "select-year-from",
            defaultValue: props.yearVal,
            options: componentUtil.getDropdownOptionsYear(props.years[0], props.years[1]),
            handleOnChange: props.handleOnChangeYfrom
        }]} />)
}

export const DateSelectionTo = (props) => {
    return (
        <ComboBoxes values={[{
            label: "To Month",
            id: "select-month-to",
            defaultValue: props.monthVal,
            options: componentUtil.getDropdownOptionsMonth(),
            handleOnChange: props.handleOnChangeMto
        }, {
            label: "Year",
            id: "select-year-to",
            defaultValue: props.yearVal,
            options: componentUtil.getDropdownOptionsYear(props.years[0], props.years[1]),
            handleOnChange: props.handleOnChangeYto
        }]} />)
}