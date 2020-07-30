import React, {Component} from 'react';

class App extends Component {

  state = {
    data: [
      {id: 0, color: 'red', active: ""},
      {id: 1, color: 'yellow', active: ""},
      {id: 2, color: 'blue', active: ""},
      {id: 3, color: 'green', active: ""},
    ],
  }


  mouseDown = (m) => {
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




  started = () => {
    let {data} = this.state
    let num = Math.round(Math.random() * 3)
    
    data.map(m=>{
      if (m.id === num){
        m.active = "active"
        this.setState({
          ...data
        })
      }
    })
   setTimeout(()=>{
     data.map(m=>{
       if (m.id === num){
         m.active = ""
         this.setState({
           ...data
         })
       }
     })
   },1000)
  }


  render() {

    let { data } = this.state
    return (
      <div className="container">
        <div className="circle">
          {data.map(m =>
            <div
              onMouseDown={() => this.mouseDown(m)}
              onMouseUp={() => this.mouseUp(m)}
              key={m.id}
              style={{backgroundColor: m.color, opacity: m.opacity}}
              className={`circle__item ${m.active}`}
              // onClick={() => this.onClick(m)}
            />
          )}
        </div>
        <button onClick={this.started}>Started</button>

      </div>
    );
  }
}

export default App;
