export const byId = (id) => { return document.getElementById(id) }


/**
 * 
 * @param  {...string} ignoredIds 
 */
export const clearFields = (...ignoredIds) => {
    let inputs = document.getElementsByTagName("input");

    let withIgnore = ignoredIds != null;
    loop: for (let i = 0; i < inputs.length; i++) {
        if (withIgnore){
            for (let y = 0; y < ignoredIds.length; y++) {
                if (inputs[i].id == ignoredIds[y]) continue loop;
            }
        }
        
        if (inputs[i].type == "text") { inputs[i].value = ""; }
        else if (inputs[i].type == "number") { inputs[i].value = 0; }
        else { inputs[i].value = null; }
    }
}

export function toBase64(file, referer, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file.files[0]);
    reader.onload = () => callback(reader.result, referer);
    reader.onerror = error => {
        alert("Error Loading File");
    }
}

export const checkExistance = function (...ids) {
    for (let i = 0; i < ids.length; i++) {
        if (byId(ids[i]) == null) {
            console.log("component with id:", ids[i], "does not exist");
            return false;
        }
    }
    return true;
}

/**
 * 
 * @param {Number} totalButton 
 * @param {Number} currentPage 
 */
export const createNavButtons = (totalButton, currentPage) => {
    totalButton = Math.ceil(totalButton);
    if (!currentPage) { currentPage = 0 }
    let buttonData = new Array();
    let min = currentPage - 3 < 0 ? 0 : currentPage - 3;
    let max = currentPage + 3 > totalButton ? totalButton : currentPage + 3;

    if (min != 0) {
        buttonData.push({
            text: 1,
            value: 0
        });
    }

    for (let index = min; index < max; index++) {
        buttonData.push({
            text: index + 1,
            value: index
        });
    }

    if (max != totalButton) {
        buttonData.push({
            text: totalButton,
            value: totalButton - 1
        });
    }


    return buttonData;
}


export const getDropdownOptionsMonth = () => {
    let options = [];
    for (let i = 1; i <= 12; i++) {
        options.push({ value: i, text: i });
    }
    return options;
}
export const getDropdownOptionsYear = (from, to) => {
    let options = [];
    for (let i = from; i <= to; i++) {
        options.push({ value: i, text: i });
    }
    return options;
}