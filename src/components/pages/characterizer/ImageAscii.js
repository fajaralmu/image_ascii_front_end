
import React, { Component } from 'react';
import BaseComponent from '../../BaseComponent';
import Section from '../../layout/Section';
import ImageCharacterizerService from '../../../services/ImageCharacterizerService';
import Card from '../../container/Card';
import { SubmitResetButton, InputField, LabelField } from '../../forms/commons';
import { toBase64v2 } from '../../../utils/ComponentUtil';
import { AnchorWithIcon } from '../../buttons/buttons';
import Columns from '../../container/Columns';
import { uniqueId } from '../../../utils/StringUtil';
import PreviewCanvas from './PreviewCanvas';
import { getMaxIndex, hexToRgb, objectToArray } from './helper';
const DEFAULT_REDUCER = {
    1: { index: 1, red: 0, green: 0, blue: 0, hex: '#000000' },
    2: { index: 2, red: 255, green: 255, blue: 255, hex: '#ffffff' },
};
const DEFAULT_FILTER = {
    1: {
        //l:colorFilters.length,
        index: 1,
        character: "o",
        useTemplateCharacter: false,
        red: { min: 0, max: 0 },
        green: { min: 0, max: 0 },
        blue: { min: 0, max: 0 },
        hexMax: '#000000',
        hexMin: '#000000',
    },
    2: {
        //l:colorFilters.length,
        index: 2,
        character: "-",
        useTemplateCharacter: false,
        red: { min: 255, max: 255 },
        green: { min: 255, max: 255 },
        blue: { min: 255, max: 255 },
        hexMax: '#ffffff',
        hexMin: '#ffffff',
    }
};

export default class ImageAscii extends BaseComponent {
    constructor(props) {
        super(props, false);
        this.state = {
            imageData: null,
            colorFilters: DEFAULT_FILTER,
            colorReducers: DEFAULT_REDUCER,
            result: null,
            resultFontSize: 1,
            percentage: 17,
            activeFilterIndex: 1,
            activeReducerIndex: 1,
            showForm:true
        }
        this.characterizerService = ImageCharacterizerService.instance;
        this.addColorFilterAndReducer = (e) => {
            this.addColorFilter();
            this.addColorReducer();
        }
        this.addColorFilter = (e) => {
            const colorFilters = this.state.colorFilters;
            const index = this.getMaxColorFiltersID() + 1;
            colorFilters[index] = {
                //l:colorFilters.length,
                index: index,
                character: "o",
                useTemplateCharacter: false,
                red: { min: 0, max: 0 },
                green: { min: 0, max: 0 },
                blue: { min: 0, max: 0 }
            };
            this.setState({ activeFilterIndex: index, colorFilters: colorFilters });
        }
        this.addColorReducer = (e) => {
            const colorReducers = this.state.colorReducers;
            const index = this.getMaxColorReducersID() + 1;
            colorReducers[index] = { index: index, red: 0, green: 0, blue: 0, hex: null };
            this.setState({ activeReducerIndex:index, colorReducers: colorReducers });
        }

        this.increaseResultFontSize = () => {
            let resultFontSize = this.state.resultFontSize;
            resultFontSize += 0.1;
            this.setState({ resultFontSize: resultFontSize });
        }
        this.reduceResultFontSize = () => {
            let resultFontSize = this.state.resultFontSize;
            resultFontSize -= 0.1;
            this.setState({ resultFontSize: resultFontSize });
        }

        this.removeColorFilter = (index) => {
            const colorFilters = this.state.colorFilters;
            delete colorFilters[index]
            this.setState({ colorFilters: colorFilters });
        }
        this.removeColorReducer = (index) => {
            const colorReducers = this.state.colorReducers;
            delete colorReducers[index]
            this.setState({ colorReducers: colorReducers });
        }

        this.updateFilterCharacter = (e) => {
            const target = e.target;
            const index = target.getAttribute("index");
            const colorFilters = this.state.colorFilters;
            colorFilters[index].character = target.value;
            this.setState({ colorFilters: colorFilters });
        }
        this.updateColorFilter = (index) => {
            const minInput = document.getElementById("input-form-field-color_filter_"+index+"_min_rgb");
            const maxInput = document.getElementById("input-form-field-color_filter_"+index+"_max_rgb");
            const minValue = minInput.value;
            const maxValue = maxInput.value;
            this.updateColorFilterState(index, minValue, "min");
            this.updateColorFilterState(index, maxValue, "max");
        }
        this.updateColorFilterState = (index, value, type) => {

            const colorFilters = this.state.colorFilters;
            const rgb = hexToRgb(value);

            if (type == "max") {
                colorFilters[index].red.max = rgb.r;
                colorFilters[index].green.max = rgb.g;
                colorFilters[index].blue.max = rgb.b;
                colorFilters[index].hexMax = value;
            } else {
                colorFilters[index].red.min = rgb.r;
                colorFilters[index].green.min = rgb.g;
                colorFilters[index].blue.min = rgb.b;
                colorFilters[index].hexMin = value;
            }

            this.setState({ colorFilters: colorFilters });
        }

        this.updateColorReducer = (index) => {
            const input = document.getElementById("input-form-field-color_reducer_"+index);
            const value = input.value;
            this.updateColorReducerState(index, value);
        }
        this.updateColorReducerState = (index, hex) => {

            const colorReducers = this.state.colorReducers;
            const rgb = hexToRgb(hex);
            colorReducers[index].red = rgb.r;
            colorReducers[index].green = rgb.g;
            colorReducers[index].blue = rgb.b;
            colorReducers[index].hex = hex;
            this.setState({ colorReducers: colorReducers });
        }

        this.getMaxColorReducersID = () => {
            const colorReducers = this.state.colorReducers;
            return getMaxIndex(colorReducers);
        }

        this.getMaxColorFiltersID = () => {
            const colorFilters = this.state.colorFilters;
            return getMaxIndex(colorFilters);
        }


        this.characterize = (e) => {
            e.preventDefault();
            const form = e.target;
            const app = this;
            this.showConfirmation("Continue?")
                .then(function (ok) {
                    if (ok) { app.send(form); }
                })
        }

        this.fileOnChange = (e) => {
            const input = e.target;
            const app = this;
            toBase64v2(input).then(function (data) {
                app.setState({ imageData: data });
            }).catch(console.error);
        }

        this.handleSuccess = (response) => {
            // this.showInfo("Success");
            this.setState({ result: response });
        }
        this.handleError = (e) => {
            this.showError("Error: " + e);
            console.error(e);
        }

        this.send = (form) => {
            const colorFilters = this.getColorFilterPayloads();
            const colorReducers = this.getColorReducerPayloads();
            const request = {
                colorFilters: colorFilters,
                colorReducers: colorReducers,
                imageData: this.state.imageData,
                percentage: this.state.percentage
            }
            this.commonAjax(
                this.characterizerService.characterize, request,
                this.handleSuccess,
                this.handleError
            )
        }

        this.changePercentage = (e) => {
            this.setState({ percentage: e.target.value });
        }

        this.getColorReducerPayloads = () => {
            const colorReducers = this.state.colorReducers;
            return objectToArray(colorReducers);
        }

        this.getColorFilterPayloads = () => {
            const colorFilters = this.state.colorFilters;
            return objectToArray(colorFilters);
        }
        this.setInputValuesFromState = () => {
            //general
            if (null != document.getElementById("input-form-field-percentage"))
                document.getElementById("input-form-field-percentage").value = this.state.percentage;

            //filter
            const colorFilters = this.state.colorFilters;
            const PREFIX = "color_filter_"
            for (const key in colorFilters) {
                if (colorFilters.hasOwnProperty(key)) {
                    const element = colorFilters[key];
                    //min
                    document.getElementsByName(PREFIX + key + "_min_rgb")[0].value = element.hexMin;
                    document.getElementsByName(PREFIX + key + "_max_rgb")[0].value = element.hexMax;
                    document.getElementsByName(PREFIX + key + "_character")[0].value = element.character;
                }
            }

            //reducers
            const colorReducers = this.state.colorReducers;
            const PREFIX_RED = "color_reducer_"
            for (const key in colorReducers) {
                if (colorReducers.hasOwnProperty(key)) {
                    const element = colorReducers[key];
                    //min
                    if (document.getElementsByName(PREFIX_RED + key)[0]) {
                        document.getElementsByName(PREFIX_RED + key)[0].value = element.hex;
                    }

                }
            }
        }

        this.onGetRgb = (rgb) => {
            const filterIndex = this.state.activeFilterIndex;
            const reducerIndex = this.state.activeReducerIndex;
            const colorFilters = this.state.colorFilters;
            const colorReducers = this.state.colorReducers;
            if (colorFilters.hasOwnProperty(filterIndex)) {
                colorFilters[filterIndex].red.max = rgb.r;
                colorFilters[filterIndex].green.max = rgb.g;
                colorFilters[filterIndex].blue.max = rgb.b;
                colorFilters[filterIndex].hexMax = rgb.hex;

                colorFilters[filterIndex].red.min = rgb.r;
                colorFilters[filterIndex].green.min = rgb.g;
                colorFilters[filterIndex].blue.min = rgb.b;
                colorFilters[filterIndex].hexMin = rgb.hex;
               
            }
            if (colorReducers.hasOwnProperty(reducerIndex)) {
                colorReducers[reducerIndex].red = rgb.r;
                colorReducers[reducerIndex].green = rgb.g;
                colorReducers[reducerIndex].blue = rgb.b;
                colorReducers[reducerIndex].hex = rgb.hex;
            }

            this.setState({ colorReducers: colorReducers, colorFilters: colorFilters });
        }
        this.toggleForm = (e) => {
            this.setState({showForm:!this.state.showForm});
        }
    }

    componentDidMount() {
        document.title = "Characterizer";
    }
    componentDidUpdate() {
        this.setInputValuesFromState();
    }
    render() {

        return (
            <Section>    {this.title("Image Ascii")}
                <Card title="Image Ascii" >
                    <div className="columns">
                        <div className="column">
                            <AnchorWithIcon style={{marginBottom:'20px'}} iconClassName={this.state.showForm?"fas fa-angle-up":"fas fa-angle-down"} onClick={this.toggleForm}>Toggle Form</AnchorWithIcon>
                            <form style={{display:this.state.showForm?"block":"none"}} onSubmit={this.characterize}>
                                <InputField required={true} name="Image" type="file" attributes={{
                                    accept: 'image/*', onChange: this.fileOnChange
                                }} />
                                <InputField required={true} type="number" label="Resize (%)" name="percentage" attributes={{
                                    min: 0, onChange: this.changePercentage
                                }} />
                                <div className="field">
                                    <p className="has-text-centered has-background-light">Color Filters <span className="tag is-dark">{Object.keys(this.state.colorFilters).length}</span> </p>

                                    {Object.keys(this.state.colorFilters).map((key, i) => {
                                        const filter = this.state.colorFilters[key];
                                        const index = filter.index;
                                        const active = this.state.activeFilterIndex == index;
                                        return (

                                            <Card className={active?"has-background-warning":null} key={"card_filter_" + uniqueId()} title={"Filter #" + (i + 1)}
                                                headerIconClassName="fas fa-times"
                                                headerIconOnClick={(e) => this.removeColorFilter(index)} >
                                                <Columns cells={[
                                                    <InputField label="min" attributes={{ index: index + "_min",  }} name={"color_filter_" + index + "_min_rgb"} type="color" />
                                                    , <InputField label="max" attributes={{ index: index + "_max",  }} name={"color_filter_" + index + "_max_rgb"} type="color" />
                                                ]} />
                                                 <Columns cells={[
                                                    <InputField attributes={{ index: index, onKeyUp: this.updateFilterCharacter }}
                                                        label="character" name={"color_filter_" + index + "_character"} />,
                                                    <div>
                                                        <AnchorWithIcon onClick={(e)=> this.updateColorFilter(index)} className="is-small" iconClassName="fas fa-play">Apply</AnchorWithIcon>
                                                        <ButtonToggleActive active={active} onClick={(e) => this.setState({ activeFilterIndex: index })} />
                                                    </div>
                                                    
                                                 ]}/>
                                                <RBGTagMinMax filter={filter} />
                                                
                                            </Card>
                                        )
                                    })}

                                </div>
                                <LabelField label="Option">
                                    <div>
                                    <AnchorWithIcon className="is-light" onClick={this.addColorFilter} iconClassName="fas fa-plus">Add Filter Color</AnchorWithIcon>
                                    <p></p>
                                    <AnchorWithIcon className="is-dark" onClick={this.addColorFilterAndReducer} iconClassName="fas fa-plus">Add Filter And Reducer</AnchorWithIcon>
                                    </div>
                                </LabelField>
                                <div className="field">
                                    <p className="has-text-centered has-background-warning">Color Reducers <span className="tag is-dark">{Object.keys(this.state.colorReducers).length}</span></p>
                                    <div className="columns is-multiline">
                                        {Object.keys(this.state.colorReducers).map((key, i) => {
                                            const filter = this.state.colorReducers[key];
                                            const index = filter.index;
                                            const active = this.state.activeReducerIndex == index;
                                            return (
                                                <div className="column is-half">
                                                    <Card className={active?"has-background-warning":null} key={"card_Reducers_" + uniqueId()} title={"Reducer #" + (i + 1)}
                                                        headerIconClassName="fas fa-times" headerIconOnClick={(e) => this.removeColorReducer(index)} >

                                                        <InputField attributes={{ index: index}}
                                                            orientation="horizontal" label="color" name={"color_reducer_" + index} type="color" />

                                                        <RGBTag filter={filter} />
                                                        <AnchorWithIcon onClick={(e)=> this.updateColorReducer(index)} className="is-small" iconClassName="fas fa-play">Apply</AnchorWithIcon>
                                                        <ButtonToggleActive active={active} onClick={(e) => this.setState({ activeReducerIndex: index })} />
                                                    </Card>
                                                </div>)
                                        })}
                                    </div>
                                </div>
                                <LabelField label="Option"><AnchorWithIcon className="is-warning" onClick={this.addColorReducer} iconClassName="fas fa-plus">Add Reducer Color</AnchorWithIcon></LabelField>
                                <SubmitResetButton submitIconClassName="fas fa-play" submitText="Process"/>
                            </form>
                        </div>
                        <div className="column has-text-centered">
                            <p className="tag is-info">Preview</p>
                            <figure style={{ minHeight: '300px', display: 'none' }}>
                                {this.state.imageData ? <img className="image" src={this.state.imageData}
                                    width="300" height="300" />
                                    : <h3 className="has-text-grey">No image is selected</h3>
                                }
                            </figure>
                            <PreviewCanvas onGetRgb={this.onGetRgb} imageData={this.state.imageData} id="preview-canvas" />
                        </div>
                    </div>
                </Card>
                <Card title="Result">

                    {this.state.result ?
                        <>  
                        <div className="buttons has-addons">
                            <AnchorWithIcon onClick={this.increaseResultFontSize} iconClassName="fas fa-plus" />
                            <AnchorWithIcon onClick={this.reduceResultFontSize} iconClassName="fas fa-minus" /> 
                        </div>
                            <div style={{ overflow: 'scroll', fontFamily: 'monospace' }}>
                                {this.state.resultFontSize}
                                <div style={{ fontSize: this.state.resultFontSize + 'em' }} >
                                    <p dangerouslySetInnerHTML={{ __html: this.state.result.imageData }}></p>
                                </div>
                            </div>
                        </>
                        : "No Result"}

                </Card>
            </Section>
        )
    }
}
const ButtonToggleActive = (props) => {
    if (props.active == true) {
        return <h4 className="tag is-success"><i className="fas fa-check"></i>&nbsp;Active</h4>
    }
    return (

        <AnchorWithIcon className="is-small" iconClassName="fas fa-exclamation-circle" onClick={props.onClick}>
            Set Active
        </AnchorWithIcon>
    )
}
const RBGTagMinMax = (props) => {
    const filter = props.filter;
    return (
        <div className="tags has-addons">
            <span className="tag is-danger">min: {filter.red.min} max: {filter.red.max}</span>
            <span className="tag is-primary">min:{filter.green.min} max: {filter.green.max}</span>
            <span className="tag is-info">min: {filter.blue.min}  max: {filter.blue.max}</span>
        </div>
    )
}
const RGBTag = (props) => {
    const filter = props.filter;
    return (
        <div className="tags has-addons">
            <span className="tag is-danger"> {filter.red} </span>
            <span className="tag is-primary"> {filter.green} </span>
            <span className="tag is-info">  {filter.blue} </span>
        </div>
    )
}

