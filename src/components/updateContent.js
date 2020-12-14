import React, {Component} from "react";

class UpdateContent extends Component{
    constructor(props) {
        super(props);
        this.state ={
            id:this.props.data.id,
            title:this.props.data.title,
            desc:this.props.data.desc
        }
        this.inputFormHandler = this.inputFormHandler.bind(this);
    }
    inputFormHandler(evt){
        this.setState({
            [evt.target.name]:evt.target.value
        });
    }
    render() {
        return(
            <article>
                <h2>Update Create</h2>
                <form action="/create_process" method="post"
                      onSubmit={function (evt){
                            evt.preventDefault()
                            this.props.onSubmit(
                                this.state.id,
                                this.state.title,
                                this.state.desc
                            );
                            alert('Submit!!')
                        }.bind(this)}>

                    <input type="hidden" name="id" value={this.state.id}></input>

                    <p>
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            value={this.state.title}
                            onChange={this.inputFormHandler}
                        >
                        </input>
                    </p>
                    <p>
                        <textarea
                            name="desc"
                            placeholder="description"
                            value ={this.state.desc}
                            onChange={this.inputFormHandler}
                        >
                        </textarea>
                    </p>
                    <p>
                        <input type="submit">
                        </input>
                    </p>
                </form>
            </article>
        );
    }
}

export default UpdateContent;