import React, { Component } from 'react'
import './App.css';
import TOC from "./components/toc.js"
import Subject from "./components/subject.js"
import Content from "./components/content.js"

class App extends Component{
    constructor(props) {
        super(props);
        this.state ={
            mode:'read',
            selected_content_id:2,
            subject:{title:'WEB', sub:'World Wid Web!'},
            welcome:{title:'Welcome', desc:'Hello, React!!'},
            contents:[
                {id:1, title:'HTML', desc:'HTML is for information'},
                {id:2, title:'CSS', desc:'CSS is for design'},
                {id:3, title:'JavaScrirpt', desc:'JavaScript is for interactive'}
            ]
        }
    }
  render(){
    console.log('App.render')
    var _title, _desc = 'NULL';
    if(this.state.mode === 'welcome'){
        _title = this.state.welcome.title;
        _desc = this.state.welcome.desc;
    }
    else if(this.state.mode === 'read'){
        var i =0;
        while(i<this.state.contents.length)
        {
            var data = this.state.contents[i];
            if(data.id === this.state.selected_content_id) {
                console.log(this)
                _title = data.title;
                _desc = data.desc;
                break;
            }
        }
    }
    return(
        <div className="App">
                  <Subject
                      title={this.state.subject.title}
                      sub={this.state.subject.sub}
                      onChangePage={function (){
                          this.setState({mode:'welcome'})
                        }.bind(this)}>
                  </Subject>
                  <TOC
                      onChangePage={function (id){
                          this.setState({
                              mode:'read',
                              selected_content_id:Number(id)
                          })
                        }.bind(this)
                      }
                      data={this.state.contents}>
                  </TOC>
                  <Content
                      title={_title} desc={_desc}>
                  </Content>
        </div>
    );
  }
}

export default App;

// {/*<header>*/}
// {/*    <h1><a href="" onClick={function (evt){*/}
// {/*        evt.preventDefault()*/}
// {/*        //this.state.mode = 'welcome'; //this가 아무도 가르키지 않는다. 함수가 끝나는 부분에 .bind(this)를 넣어 주어야 한다.*/}
// {/*        this.setState({*/}
// {/*            mode:'welcome'*/}
// {/*        })*/}
// {/*    }.bind(this)}>*/}
// {/*        {this.state.subject.title}</a></h1>*/}
// {/*    {this.state.subject.sub}*/}
// {/*</header>*/}


// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;


