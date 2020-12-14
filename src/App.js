import React, { Component } from 'react'
import './App.css';
import TOC from "./components/toc.js"
import Subject from "./components/subject.js"
import ReadContent from "./components/content.js"
import Control from "./components/Control.js";
import CreateContent from "./components/createContent";
import {whenInput} from "web-vitals/dist/lib/whenInput";

class App extends Component{
    constructor(props) {
        super(props);
        this.max_content_id = 3;
        this.state ={
            mode:'create',
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
    var _title, _desc, _article = 'NULL';
    if(this.state.mode === 'welcome'){
        _title = this.state.welcome.title;
        _desc = this.state.welcome.desc;
        _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }
    else if(this.state.mode === 'read'){
        var i =0;
        while( i < this.state.contents.length)
        {
            var data = this.state.contents[i];
            if(data.id === this.state.selected_content_id) {
                _title = data.title;
                _desc = data.desc;
                break;
            }
            i =  i + 1
        }
        _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }
    else if(this.state.mode === 'create'){
        _article = <CreateContent onSubmit={function (_title,_desc){
            this.max_content_id = this.max_content_id +1;

            //Array Data input control
            //Origin Data Change ! push (원본 데이터 배열에 값을 넣어 줌)
            //즉 원본 이 바뀌면채 가장위의 constructor 가 변경됨으로, rander가 재 시작 됨으로 관계없는 버튼이 눌릴때도 모두다 재 호출 된다.
            // this.starte.contents.push(
            //     {id:this.max_content_id, title:_title, desc:_desc}
            // );
            // 기존의 배열 데이터에 값을 추가하는것은 아니다. (원본을 안 건듬)
            var _contents = this.state.contents.concat(
                {id:this.max_content_id, title:_title, desc:_desc}
            )
            this.setState({
                contents:_contents
            });
        }.bind(this)}>

        </CreateContent>
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
                  <Control
                      onChangeMode={function (mode){
                      this.setState({
                          mode:mode
                      })
                  }.bind(this)}>
                  </Control>
                  {_article}
        </div>
    );
  }
}

export default App;

