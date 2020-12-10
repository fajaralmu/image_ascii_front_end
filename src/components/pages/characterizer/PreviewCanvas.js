
import React, { Component } from 'react';
export default class PreviewCanvas extends Component {
    constructor(props) {
        super(props);
        this.getCanvas = () => {
            return document.getElementById(this.props.id);
        }
        this.onCanvasClick = (event) => {
            // function getCursorPosition(canvas, event) {
            const rect = event.target.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            console.log("x: " + x + " y: " + y);
            const rgb = this.getRgb(event.target, x, y);
            console.log("RGB: ", rgb);
            if (this.props.onGetRgb) {
                this.props.onGetRgb(rgb);
            }

        }
        this.getRgb = (canvas, x, y) => {
            const ctx = canvas.getContext("2d");
            var data = ctx.getImageData(x, y, 1, 1).data;
            const rgb = { r: data[0], g: data[1], b: data[2] };
            rgb.hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);
            return rgb;
        }
        this.componentToHex = (c) => {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        this.rgbToHex = (r, g, b) => {
            return "#" +  this.componentToHex(r) +  this.componentToHex(g) +  this.componentToHex(b);
        }
    }

    componentDidUpdate() {
        this.drawImage();
    }

    drawImage() {
        if (this.props.imageData == null) {
            return;
        }
        const canvas = this.getCanvas();
        canvas.height = 300;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var image = new Image();
        image.onload = function () {
            const w = image.width;
            const perc = 100 / w * 300;
            const h = image.height * perc / 100;
            if (canvas.height < h) {
                canvas.height = h;
            }
            ctx.drawImage(image, 0, 0, 300, h);
        };
        image.src = this.props.imageData;
    }

    render() {
        return (
            <div className="has-background-light">
                <canvas onClick={this.onCanvasClick} id={this.props.id} width="300" height="300" />
            </div>
        )
    }
}