import ReactDOM from "react-dom";
import MyCom from "./components/MyCom";

let outData = {
    pname:"qiqi",
    page:23,
    psex:"man",
    pfriend:"xm"
}

ReactDOM.render(<MyCom personObj={outData} name="杨洋" link="https://react.docschina.org"/>,document.getElementById("root"))