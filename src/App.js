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
    quantityFunc: 1,
    arr: [],
    myArr: [],
    round: 1,
    level:1,
    firstSecond:900,
    lastSecond:1000,
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
    let {myArr} = this.state
    myArr.push(m.id)
    this.setState({
      myArr
    })
  }

  next = () => {
    let {arr, myArr, round,level} = this.state
    this.setState({
      myArr: []
    })
    if (JSON.stringify(arr) === JSON.stringify(myArr)) {
      this.setState({
        round: round + 1,
      })
      this.started()
    } else {
      console.log("error")
    }
   if (round === 5){
     this.setState({
       level:level +1,
       round: 0
     })
   }

  }


  started = () => {
    let {arr} = this.state
    let num = Math.round(Math.random() * 3)
    arr.push(num)
    this.setState({
      ...arr
    })
    this.draw()
  }


  draw = () => {
    let {arr, data,level,levelOne,firstSecond,lastSecond} = this.state
    if (level === 2){
      this.setState({
        firstSecond: 600,
        lastSecond:800,
      })
    }
    else if (level === 3){
      this.setState({
        firstSecond: 400,
        lastSecond:600,
      })
    }
    arr.forEach((el, i) => {
      setTimeout(() => {
        data.map(m => {
          if (m.id === el) {
            m.active = "active"
            this.setState({
              ...data
            })
          }
        })
        setTimeout(() => {
          data.map(m => {
            if (m.id === el) {
              m.active = ""
              this.setState({
                ...data
              })
            }
          })
        }, firstSecond)
      }, (i + 1) * 1000)
    })
    console.log(this.state)
  }


// started=(quantity)=> {
  //   let {data, quantityFunc, arr} = this.state
  //   if (quantity > quantityFunc) {
  //     this.setState({
  //       quantityFunc: quantityFunc + 1
  //     })
  //     return
  //   } else {
  //     setTimeout(() => {
  //       quantity++
  //       this.started(quantity);
  //     }, 1500);
  //     let num = Math.round(Math.random() * 3)
  //     console.log(num,"num")
  //     arr.push(num)
  //     this.setState({
  //       ...arr
  //     })
  //     data.map(m => {
  //       if (m.id === num) {
  //         m.active = "active"
  //         this.setState({
  //           ...data
  //         })
  //       }
  //     })
  //     setTimeout(() => {
  //       data.map(m => {
  //         if (m.id === num) {
  //           m.active = ""
  //           this.setState({
  //             ...data
  //           })
  //         }
  //       })
  //     }, 1000)
  //   }
  // }
  render() {

    let {data, round, arr,level} = this.state

    return (
      <>
        <div className="container">
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
                  <h1 style={{color: "#fff"}}>{m.number}</h1>
                </div>
              </div>
            )}
          </div>

          <div className="accessories">
            <h1 className="level">
              Level&nbsp;{level}/4
            </h1>

            <p>
              Round &nbsp;{round}/5
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
          </div>
        </div>
        </>
    );
  }
}

export default App;
