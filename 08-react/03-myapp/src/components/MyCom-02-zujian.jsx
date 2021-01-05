import React,{Component} from 'react'
import PropTypes from 'prop-types'

class MyCom extends Component{
    constructor() {
        super();
        this.state = {
            counter:0,
            number:666,

            name:"wc",
            age:100,
            sex:"man",
            friend:"xq"
        }

    }
    static defaultProps = {
        address:"bj"
    }
    static propTypes ={
        link:PropTypes.string
    }
    // state= {
    //     number:666
    // }
    render() {
        let { counter,name,age,sex,friend  } = this.state;
        let { pname,page,psex,pfriend } = this.props.personObj;

        return (
            <div>
                欢迎来到 {this.props.name} 世界~
                {/*<p>age: {age}</p>*/}
                <p><a href={this.props.link}></a></p>
                <p>地址：{this.props.address}</p>
                <p>number: {this.state.number}</p>
                <button onClick={ ()=>{ this._dealChangeNumber()}}>换一个number</button>
                <p>counter: {counter}</p>
                <p>---------------------------------------------------</p>
                <h2>个人介绍（数据来自于state）</h2>
                <p>
                    姓名：{ name },
                    年龄：{ age },
                    性别：{ sex },
                    朋友：{ friend }
                </p>
                <button onClick={ ()=>this._dealChangePerson() }>换个人</button>
                <p>--------------------------------</p>
                <h2>个人介绍（数据来自于props）</h2>
                <p>
                    姓名：{ pname },
                    年龄：{ page },
                    性别：{ psex },
                    朋友：{ pfriend }
                </p>
                <button onClick={ ()=>this._dealChangePerson2() }>换个人</button>
            </div>
        )
    }
    // 点击的方法
    _dealChangeNumber(){
        this.setState({
            number:999
        })
    }
    _dealChangePerson(){
        // 更新状态机
        this.setState({
            name:"xq",
            age:200,
            sex:"woman",
            friend:"wc"
        })
    }
    _dealChangePerson2(){
        // 已经把props中的数据修改了，但是它不会引起render方法的执行
        this.setState((preState,props)=>{
            this.props.personObj.pname = "lalala"
        })

    }
    componentDidMount() {

        // setState的参数可以是一个函数
        // 如果setState的参数是一个函数，函数默认有两个形参
        // 形参1：表示上一次的状态
        // 形参2：表示当前的组件接收的数据
        this.setState((preState,props)=>{
            return{
                counter: this.state.counter + 111
            }
        }, ()=>{
            // setState中可以指定第二个函数参数
            // 在这里，可以获取最新的状态
            console.log(this.state.counter);
        })

        // 更新状态的方式一
        // setTimeout(()=>{
        //     // 更新状态机（只要状态更新了，render函数就会重新执行）
        //     this.setState({
        //         counter:100
        //     })
        // },2000)

        // 更新状态的方式二
        // setTimeout(()=>{
        //     this.state.counter = 100
        //     this.setState({}); // 会引起重新render
        // },2000)

        // this.setState(
        //     {counter: this.state.counter + 1}
        // )


    }
}

export default MyCom