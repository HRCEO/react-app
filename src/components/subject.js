import React, {Component} from "react";

class Subject extends Component {
    render(){
        return (
            <header>
                <h1>
                    <a
                        onClick={function (evt){
                            this.props.onChangePage()
                        }.bind(this)}
                    >
                        {this.props.title}
                    </a>
                </h1>
                {this.props.sub}
            </header>
        );
    }
}

export default Subject;