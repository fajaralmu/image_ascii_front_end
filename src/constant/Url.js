
const devMode = 
    document.getElementById("rootPath").value == "${contextPath}" || 
    document.getElementById("rootPath").value == "";
const rootValue = devMode ?
     "/" : document.getElementById("rootPath").value+"/";

export const contextPath = function(){
    const contextPath = devMode? "http://localhost:8000".concat(rootValue):rootValue;
    //console.debug("contextPath: ",contextPath,document.getElementById("rootPath").value);
    
    return contextPath;
}
 
export const baseImageUrl = contextPath()+"WebAsset/Shop1/Images/";
export const baseResUrl = contextPath()+"res/img/";

export const POST = "post";
