import ReactDOM from "react-dom"
import MyCom from "./components/MyCom"

let outData = {
    pname: "qiqi",
    page: 200,
    psex: "man",
    friend: "xiaoming"
}
ReactDOM.render(<MyCom personObj={ outData } />, document.getElementById("root"))




















