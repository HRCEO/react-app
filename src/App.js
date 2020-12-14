import React, { Component } from 'react'
import './App.css';
import TOC from "./components/toc.js"
import Subject from "./components/subject.js"
import ReadContent from "./components/content.js"
import Control from "./components/Control.js";
import CreateContent from "./components/createContent";
import UpdateContent from "./components/updateContent";
import {whenInput} from "web-vitals/dist/lib/whenInput";

class App extends Component{
    constructor(props) {
        super(props);
        this.max_content_id = 3;
        this.state ={
            mode:'welcome',
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
    getReadContent(){
        var i =0;
        while( i < this.state.contents.length)
        {
            var data = this.state.contents[i];
            if(data.id === this.state.selected_content_id) {
               return data;
               break;
            }
            i =  i + 1
        }
    }
    getContent(){
        var _title, _desc, _article = 'NULL';
        if(this.state.mode === 'welcome'){
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <ReadContent title={_title} desc={_desc}></ReadContent>
        }
        else if(this.state.mode === 'read'){
            var _content = this.getReadContent()
            _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
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

                // // 기존의 배열 데이터에 값을 추가하는것은 아니다. (원본을 안 건듬)  #2
                // var _contents = this.state.contents.concat(
                //     {id:this.max_content_id, title:_title, desc:_desc}
                // )
                // this.setState({
                //     contents:_contents
                // });

                /*
                원본의 값을 수정하지 않고 배열 의 값을 변경 할때

                Array.from()

                원본의 값을 수정하지 않고 객체 의 값을 변경 할때

                Object.assign()

                Immutable.js : 유사배열, 유사객체 사용시 사용되는 라이브러리

               */

                // 기존 배열 값을 안건듬, shouldComponentUpdate 사용시 사용
                var newContents = Array.from(this.state.contents);
                newContents.push({
                    id:this.max_content_id,
                    title: _title, desc:_desc
                })
                this.setState({
                    contents:newContents,
                    mode:'read',
                    selected_content_id : this.max_content_id
                });
            }.bind(this)}>
            </CreateContent>
        }
        else if(this.state.mode === 'update'){
            _content = this.getReadContent();
            _article = <UpdateContent data={_content} onSubmit={function (_id, _title,_desc){
                //this.max_content_id = this.max_content_id +1;
                var _contents = Array.from(this.state.contents);
                var i=0;
                while ( i < _contents.length)
                {
                    if(_contents[i].id ===_id)
                    {
                        _contents[i] = {id:_id, title:_title, desc:_desc};
                        break;
                    }
                    i = i + 1;
                }


                // var newContents = Array.from(this.state.contents);
                // newContents.concat({
                //     id:this.max_content_id,
                //     title: _title, desc:_desc
                // })

                this.setState({
                    contents:_contents,
                    mode:'read'
                });




            }.bind(this)}>
            </UpdateContent>
        }
        return _article
    }

    /*
    배열,객체 대체제 사용 라이브러리(원본을 변경하지 않음) : https://immutable-js.github.io/immutable-js/
    URL을 이용하여, 접근시 컴포넌트가 반응하게 할수 있음 : https://reactrouter.com/
    CREATE-REACT-APP을 이용하여 사용 할 경우, 값이 개발자가 정한것으로 사용하여야 하나,  npm run eject 를 실행하면, 설정 값을 변경 가능, 단 한번 바꾸면 수정 불가..
    redux : 컴포넌트가 많을 경우.. 모든 프록스와 이벤트를 다 거쳐야하는데. 모든 데이터의 저장소가 한곳에 모이는곳
    react server side rendering : 서버에서 html을 만들어서, 전송함으로 초기 구동시간 단축가능 (js 특유 기능 사용 가능)
    react native : react와 비슷한 기능
     */

  render(){
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
                      onChangeMode={function (_mode){
                          if(_mode === 'delete')
                          {
                              if(window.confirm('Really?')){
                                  var i =0;
                                  var _contents = Array.from(this.state.contents)
                                  while(i < this.state.contents.length){
                                      if( _contents[i].id === this.state.selected_content_id){
                                          _contents.splice(i,1);
                                          break;
                                      }
                                      i = i + 1;
                                  }
                                  this.setState({
                                      mode:'welcome',
                                      contents:_contents
                                  })
                                  alert('Delete Completed')
                              }
                          }
                          else {
                              this.setState({
                                  mode:_mode
                              });
                          }
                      }.bind(this)}>
                  </Control>
                  {this.getContent()}
        </div>
    );
  }
}

export default App;

