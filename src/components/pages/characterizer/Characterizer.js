
import React, { Component } from 'react';
import BaseComponent from './../../BaseComponent';
import Section from './../../layout/Section';
import ImageCharacterizerService from './../../../services/ImageCharacterizerService';
import Card from './../../container/Card';
import { SubmitResetButton, InputField, LabelField } from './../../forms/commons';
import { toBase64v2 } from './../../../utils/ComponentUtil';
import { AnchorWithIcon } from './../../buttons/buttons';
import Columns from './../../container/Columns';
import { uniqueId } from './../../../utils/StringUtil';

export default class Characterizer extends BaseComponent {
    constructor(props) {
        super(props, false);
        this.state = {
            imageData: null,
            colorFilters: {1:{
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
            }},
            colorReducers: {
                1: {index: 1, red: 0, green: 0, blue: 0, hex: '#000000'},
                2: {index: 2, red: 255, green: 255, blue: 255, hex: '#ffffff'},
                },
            result: null,
            resultFontSize: 1,
            percentage: 17
        }
        this.characterizerService = ImageCharacterizerService.instance;

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
            this.setState({ colorFilters: colorFilters });
        }
        this.addColorReducer = (e) => {
            const colorReducers = this.state.colorReducers;
            const index = this.getMaxColorReducersID() + 1;
            colorReducers[index] = {
                //l:colorFilters.length,
                index: index, red: 0, green: 0, blue: 0, hex: null,

            };
            this.setState({ colorReducers: colorReducers });
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
        this.updateColorFilter = (e) => {

            const colorFilters = this.state.colorFilters;
            const target = e.target;
            const indexRaw = target.getAttribute("index").split("_");
            const index = indexRaw[0];
            const type = indexRaw[1];
            const rgb = hexToRgb(target.value);

            if (type == "max") {
                colorFilters[index].red.max = rgb.r;
                colorFilters[index].green.max = rgb.g;
                colorFilters[index].blue.max = rgb.b;
                colorFilters[index].hexMax = target.value;
            } else {
                colorFilters[index].red.min = rgb.r;
                colorFilters[index].green.min = rgb.g;
                colorFilters[index].blue.min = rgb.b;
                colorFilters[index].hexMin = target.value;
            }

            this.setState({ colorFilters: colorFilters });
            console.debug("RGB: ", rgb, " of ", target.value);
        }

        this.updateColorReducer = (e) => {

            const colorReducers = this.state.colorReducers;
            const target = e.target;
            const index = target.getAttribute("index");
            const hex = target.value;
            const rgb = hexToRgb(hex);
            colorReducers[index].red = rgb.r;
            colorReducers[index].green = rgb.g;
            colorReducers[index].blue = rgb.b;
            colorReducers[index].hex = hex;
            this.setState({ colorReducers: colorReducers });
        }

        this.getMaxColorReducersID = () => {
            const colorReducers = this.state.colorReducers;
            let max = 0;
            for (const key in colorReducers) {
                if (colorReducers.hasOwnProperty(key)) {
                    const element = colorReducers[key];
                    if (element.index > max) {
                        max = element.index;
                    }
                }
            }
            return max;
        }

        this.getMaxColorFiltersID = () => {
            const colorFilters = this.state.colorFilters;
            let max = 0;
            for (const key in colorFilters) {
                if (colorFilters.hasOwnProperty(key)) {
                    const element = colorFilters[key];
                    if (element.index > max) {
                        max = element.index;
                    }
                }
            }
            return max;
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
            this.showInfo("Success");
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
            this.setState({percentage:e.target.value});
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
            if (null!=document.getElementById("input-form-field-percentage"))
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
    }

    componentDidMount() {
        document.title = "Characterizer";
    }
    componentDidUpdate() {
        this.setInputValuesFromState();
    }
    render() {

        return (
            <Section>    {this.title("Characterizer")}
                <Card title="Image Characterizer" >
                    <div className="columns">
                        <div className="column">
                            <form onSubmit={this.characterize}>
                                <InputField required={true} name="Image" type="file" attributes={{
                                    accept: 'image/*',
                                    onChange: this.fileOnChange
                                }} />
                                <InputField required={true}  type="number" label="Percentage" name="percentage" attributes={{
                                    min:0,
                                    onChange: this.changePercentage
                                }} />
                                <div className="field">
                                    <p className="has-text-centered has-background-light">Color Filters</p>
                                    {Object.keys(this.state.colorFilters).map((key, i) => {
                                        const filter = this.state.colorFilters[key];
                                        const index = filter.index;
                                        return (
                                            <Card key={"card_filter_" + uniqueId()} title={"Filter #" + (i + 1)}
                                                headerIconClassName="fas fa-times"
                                                headerIconOnClick={(e) => this.removeColorFilter(index)} >
                                                <Columns cells={[
                                                    <InputField label="min" attributes={{ index: index + "_min", onChange: this.updateColorFilter }}   name={"color_filter_" + index + "_min_rgb"} type="color" />
                                                    , <InputField label="max" attributes={{ index: index + "_max", onChange: this.updateColorFilter }}  name={"color_filter_" + index + "_max_rgb"} type="color" />
                                                ]} />
                                                <InputField
                                                    name={"color_filter_" + index + "_character"}
                                                    attributes={{
                                                        index: index,
                                                        onKeyUp: this.updateFilterCharacter
                                                    }}
                                                    label="character" name={"color_filter_" + index + "_character"} />
                                                <div className="tags has-addons">
                                                    <span className="tag is-danger">min: {filter.red.min} max: {filter.red.max}</span>
                                                    <span className="tag is-primary">min:{filter.green.min} max: {filter.green.max}</span>
                                                    <span className="tag is-info">min: {filter.blue.min}  max: {filter.blue.max}</span>
                                                </div>
                                            </Card>)
                                    })}
                                </div>
                                <LabelField><AnchorWithIcon className="is-light" onClick={this.addColorFilter} iconClassName="fas fa-plus">Add Filter Color</AnchorWithIcon></LabelField>
                                <div className="field">
                                    <p className="has-text-centered has-background-warning">Color Reducers</p>

                                    {Object.keys(this.state.colorReducers).map((key, i) => {
                                        const filter = this.state.colorReducers[key];
                                        const index = filter.index;
                                        return (
                                            <Card key={"card_Reducers_" + uniqueId()} title={"Reducer #" + (i + 1)}
                                                headerIconClassName="fas fa-times"
                                                headerIconOnClick={(e) => this.removeColorReducer(index)} >

                                                <InputField attributes={{ index: index, onChange: this.updateColorReducer }} 
                                                orientation="horizontal" label="color" name={"color_reducer_" + index} type="color" />

                                                <div className="tags has-addons">
                                                    <span className="tag is-danger"> {filter.red} </span>
                                                    <span className="tag is-primary"> {filter.green} </span>
                                                    <span className="tag is-info">  {filter.blue} </span>
                                                </div>
                                            </Card>)
                                    })}

                                </div>
                                <LabelField><AnchorWithIcon className="is-warning" onClick={this.addColorReducer} iconClassName="fas fa-plus">Add Reducer Color</AnchorWithIcon></LabelField>
                                <SubmitResetButton />
                            </form>
                        </div>
                        <div className="column has-text-centered">
                            <p className="tag is-info">Preview</p>
                            <figure style={{ minHeight: '300px' }}>
                                {this.state.imageData ? <img className="image" src={this.state.imageData}
                                    width="300" height="300" />
                                    : <h3 className="has-text-grey">No image is selected</h3>
                                }
                            </figure>
                        </div>
                    </div>
                </Card>
                <Card title="Result">

                    {this.state.result ?
                        <>
                            <AnchorWithIcon onClick={this.increaseResultFontSize} iconClassName="fas fa-plus">Zoom In</AnchorWithIcon>
                            <AnchorWithIcon onClick={this.reduceResultFontSize} iconClassName="fas fa-minus">Zoom Out</AnchorWithIcon>

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
const objectToArray = (object) => {
    const array = [];
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];
            array.push(element);
        }
    }
    return array;
}
const hexToRgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
