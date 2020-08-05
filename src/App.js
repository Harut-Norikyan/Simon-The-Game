import React, {Component} from 'react';
import {IoMdSync} from "react-icons/io";

class App extends Component {

  state = {
    data: [
      {id: 0, color: 'red', active: "", number: 0},
      {id: 1, color: 'yellow', active: "", number: 1},
      {id: 2, color: 'blue', active: "", number: 2},
      {id: 3, color: 'green', active: "", number: 3},
    ],
    arr: [],
    myArr: [],
    round: 1,
    level:1,
    firstSecond:900,
    lastSecond:1000,
    finish:'',
    active:false
  }

  mouseDown(m) {
    let {data} = this.state
    m.active = "active"
    this.setState({
      ...data
    })
  }

  mouseUp = (m) => {
    let {data} = this.state
    m.active = ""
    this.setState({
      ...data
    })
  }

  onClick = (m) => {
    let {myArr,arr,active} = this.state
    if (active && myArr.length < arr.length){
      myArr.push(m.id)
      this.setState({
        myArr
      })
    }
  }

  next = async () => {
    let {arr, myArr, round,level} = this.state
    this.setState({
      active:false
    })
    if (JSON.stringify(arr) === JSON.stringify(myArr) && arr.length !==0) {
      this.setState({
        round: round + 1,
      })
      this.started()
    } else {
      this.draw()
      this.setState({
        myArr: [],
        active:true
      })
    }
   if (round >= 10){
     this.setState({
       level:level +1,
       round: 1,
     })
   }
   if (round >= 10 && level>=4){
     this.setState({
       arr:[],
       round: 1,
       level:1,
       finish:'finish'
     })
   }
  }

  started = async () => {
    let {arr,level} = this.state
    this.setState({
      active:false
    })
    if (arr.length === 10){
     await this.setState({
        arr:[],
      })
     this.started()
    }else {
      if (level === 4){
        let num = Math.round(Math.random() * 3)
        arr.unshift(num)
        this.setState({
          ...arr
        })
        this.draw()
      }else {
        let num = Math.round(Math.random() * 3)
        arr.push(num)
        this.setState({
          ...arr
        })
        this.draw()
      }
    }

  }

  draw = async () => {
    let {arr,data,level,firstSecond,lastSecond} = this.state
    if (level === 2){
      this.setState({
        firstSecond: 600,
        lastSecond:800,
      })
    }
    else if (level === 3 || level === 4){
      this.setState({
        firstSecond: 400,
        lastSecond:600,
      })
    }
    this.setState({
      myArr: []
    })
    arr.forEach((el, i) => {
      setTimeout(() => {
        data.map(m => {
          if (m.id === el) {
            m.active = "active"
            this.setState({
              ...data,
            })
          }

        })
        setTimeout(() => {
          data.map(m => {
            if (m.id === el) {
              m.active = ""
              this.setState({
                ...data,
              })
            }
          })
        }, firstSecond)
      }, (i + 1) * lastSecond)

      setTimeout(()=>{
        this.setState({
          active:true
        })
      },(arr.length + 1)*1000)

    });
  }
  
  handleCheck=async (value)=>{
   await this.setState({
     level:+value,
     round: 1,
     arr:[],
    })
  }
  again=()=>{
    this.setState({
      finish:""
    })
  }

  render() {
    let {data, round, arr,level,myArr,finish} = this.state
    return (
      <>
        <div className="container">
          <div className={`${finish} end__block`}>
            <h1
              className="end__title"
              onClick={this.again}
            >
              CONGRATULATION !!!
            </h1>
          </div>
          <div className="title__block">
            <div>
              <h1 className="title">
                Simon Says
              </h1>
              <h3 className="title__desc">
                (my version)
              </h3>
            </div>
          </div>
          <div className="circle">
            {data.map(m =>
              <div
                onMouseDown={() => this.mouseDown(m)}
                onMouseUp={() => this.mouseUp(m)}
                key={m.id}
                style={{backgroundColor: m.color, opacity: m.opacity}}
                className={`circle__item ${m.active}`}
                onClick={() => this.onClick(m)}
              >
                <div className="opacityStyle">
                  {level !== 4 ?
                    <h1 style={{color: "#fff"}}>{m.number}</h1>
                    :null}
                </div>
              </div>
            )}
          </div>
          <div className="accessories">
            <h1 className="level">
              Level&nbsp;{level} of 4
            </h1>
            <p>
              Round &nbsp;{round} of 10
            </p>
            <div className="buttons">
              {arr.length < 1
                ?
                <button className="button" onClick={() => this.started()}>Started</button>
                :
                <button className="button" onClick={()=>this.draw()}>
                  <p className="again"><IoMdSync/></p>
                </button>
              }
              <button className="button" onClick={this.next}>Next</button>
            </div>
            <div className="myBlock">
              {level !== 4 && level !== 3?
               myArr.map(m=><h3 key={m + Math.random()} className="myNumbers">{m}</h3>)
                :null}
            </div>
          </div>

          <div className="inputs">
            <div className="form-check form-check-inline inputs__block">
              <input className="form-check-input radio" type="radio" name="inlineRadioOptions" id="gridRadios1"
                     value={1} onChange={(e)=>this.handleCheck(e.target.value,e.target)} defaultChecked/>
                <label className="form-check-label label" htmlFor="inlineRadio1">Easy</label>
            </div>
            <div className="form-check form-check-inline inputs__block">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="gridRadios2"
                     value={2} onChange={(e)=>this.handleCheck(e.target.value,e.target)}/>
                <label className="form-check-label label" htmlFor="inlineRadio2">Normal</label>
            </div>
            <div className="form-check form-check-inline inputs__block">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="gridRadios3"
                     value={3} onChange={(e)=>this.handleCheck(e.target.value,e.target)}/>
                <label className="form-check-label label" htmlFor="inlineRadio3">Hard</label>
            </div>
            <div className="form-check form-check-inline inputs__block">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="gridRadios4"
                     value={4} onChange={(e)=>this.handleCheck(e.target.value,e.target)}/>
              <label className="form-check-label label" htmlFor="inlineRadio4">Impossible</label>
            </div>
          </div>
        </div>
        </>
    );
  }
}

export default App;
