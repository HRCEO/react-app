import React, {Component} from "react";

class createContent extends Component{
    render() {
        return(
            <article>
                <h2>Create</h2>
                <from action="/create_process" method="post">
                    onSubmit={function (evt){
                            evt.preventDefault()
                            this.props.onSubmit(
                                evt.target.title.value,
                                evt.target.desc.value);

                            alert('Submit!!')
                        }.bind(this)
                    }
                    <p>
                        <input tpye="text" name="title" placeholder="title"></input>
                    </p>
                    <p>
                        <textarea name="desc" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input tpye="submit">

                        </input>
                    </p>
                </from>
            </article>
        );
    }
}

export default createContent;