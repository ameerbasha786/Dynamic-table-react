import React, { Component } from 'react';
import './column.css';


class Column extends Component {
    constructor(props) {
        super(props)
        this.state = {
            extracolumn: false,
            columnresult: '',
            errormessage: "",
            error: false
        }
    }
    columndata = (e) => {
        this.setState({ columnresult: e.target.value })
    }
    savecolumdata = (e) => {
        
        if (e.target.value.length > 0) {
            this.props.insertcol(e)
            this.setState({ extracolumn: false })
        } else {
            alert("insert heading..")
        }
    }
    addcolumn = () => {
        this.setState({ extracolumn: true })
    }
    render() {

        return (
            <React.Fragment>

                {this.state.extracolumn ? <th><input type="text" placeholder="click for heading" onDoubleClick={this.savecolumdata} onChange={this.columndata} /></th> : null}
                <th>
                    <button onClick={this.addcolumn}><i className="fa fa-plus-circle fa-3x" aria-hidden="true"></i></button>
                </th>
            </React.Fragment>
        )
    }

}



export default Column