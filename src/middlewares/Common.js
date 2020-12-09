

export const commonAuthorizedHeader = () => {
    const token = getLoginKey();
    const header = {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer '+ getLoginKey()
    }
    if (token != null && token.toString().trim() != "") {
        header['Authorization'] = 'Bearer '+ token;
    }
    return header;
};

export const getLoginKey = () => {
    return getCookie('kafila_api_token');
}
export const setApiToken = (token) => {
    console.log("setApiToken: ", token);
    return setCookie('kafila_api_token', token);
}

export const getRequestId = () => {
    return getCookie("requestId");// document.getElementById("requestId").value;
}

export const setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
export const getCookie = function (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}