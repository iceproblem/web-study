import React,{Component} from 'react'
import PropTypes from 'prop-types'

class MyCom extends Component{
    constructor() {
        super();
    }
    static defaultProps = {
        address:"bj"
    }
    static propTypes ={
        link:PropTypes.string
    }
    render() {
        return (
            <div>
                欢迎来到 {this.props.name} 世界~
                <p><a href={this.props.link}></a></p>
                <p>地址：{this.props.address}</p>
            </div>
        )
    }
}

export default MyCom