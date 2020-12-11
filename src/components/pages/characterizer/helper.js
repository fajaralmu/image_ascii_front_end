export const getMaxIndex = (object) => {
    // this.getMaxColorReducersID = () => {
    let max = 0;
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];
            if (element.index > max) {
                max = element.index;
            }
        }
    }
    return max;
    // }
}
export const hexToRgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
 export const objectToArray = (object) => {
    const array = [];
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];
            array.push(element);
        }
    }
    return array;
}