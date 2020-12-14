import React, {Component} from "react";

class Control extends Component {
    render(){
        return (
            <ul>
                <li><a href="/create" onClick={function (evt){
                    evt.preventDefault();
                    this.props.onChangeMode('create');
                }.bind(this)}>create</a></li>
                <li><a href="/update"  onClick={function (evt){
                    evt.preventDefault();
                    this.props.onChangeMode('update');
                }.bind(this)}>update</a></li>
                <li><input type="button" value="delete"  onClick={function (evt){
                    evt.preventDefault();
                    this.props.onChangeMode('delete');
                }.bind(this)}></input></li>
            </ul>
        );
    }
}

export default Control;

// 딜리트는 링크 방식이 아닌 버튼 방식인 이유
// 사용자가 사이트에 방문 할때, 자동으로 링크를 클릭하는 프로그램이 있어서 자동으로 딜리트가 될수도 있다.