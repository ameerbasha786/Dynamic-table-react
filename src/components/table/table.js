import React, { Component } from 'react';
import './table.css';
import Error from '../error/error';
import Column from '../columns/column'
//import Draging from '../daraging/dragingcolumn'

class Table extends Component {
    constructor() {
        super()
        this.state = {
            tableheadings: ["sno", "name", "email", "status"],
            rowdata: [],
            columndata: [],
            active: false,
            data: [],
            addingcol: false,
            index: null,
            error: false,
            errormessage: "",
            result: '',
            row1: null,
            row2: null,
            edit: false
        }
    }
    shouldComponentUpdate = (state, newstate) => {
        if (state !== newstate) {
            return true
        } else {
            return false
        }
    }
    componentDidMount = (prevstate, newstate) => {
        if (prevstate !== newstate) {
            return true
        } else {
            return false
        }
    }
    addcolumnheading = (e) => {
        this.setState({ edit: false, addingcol: true, row1: null, row2: null })
        var updatedcolumn = [...this.state.tableheadings];
        var updaterow = [...this.state.rowdata];
        updaterow.map((val, unq) => {
            var input = React.createElement('input', { className: "addinput",placeholder:'add item', onChange: this.changerow, onDoubleClick: () => this.savedata(unq) });
            val.push(input)
            return val
        })

        updatedcolumn.push(e.target.value)
        this.setState({ rowdata: updaterow, tableheadings: updatedcolumn })

    }
    savedata = (e) => {
        this.setState({ edit: false, row1: null, row2: null })
        if (this.state.result.length > 0) {
            var createrow = [...this.state.rowdata];
            createrow[e][createrow[e].length - 1] = this.state.result
            this.setState({ rowdata: createrow, addingcol: false })
        }
    }

    changerow = (e) => {
        this.setState({ edit: false, result: e.target.value })
    }

    inputshow = (id) => {
        if (this.state.active === false) {
            this.setState({ active: true, error: false })
        } else {
            this.setState({ index: id, active: true, error: false })
        }
    }

    insertingrow = () => {
        if (this.state.data.length === this.state.tableheadings.length) {
            if (this.state.data.includes(undefined) || this.state.data.includes(null)) {
                this.setState({ error: true, errormessage: "Enter all fields" })
            } else {
                var response = [...this.state.rowdata];
                response.push(this.state.data)
                this.setState({ rowdata: response, active: false, data: [] })
            }
        } else {
            this.setState({ error: true, errormessage: "enter all fields" })
        }
    }


    drag = (e) => {
        if (e !== undefined && !this.state.addingcol) {
           
            if (this.state.row1 === null) {
                this.setState({ row1: e })
                alert("click the row of the required postion")
            } else if (this.state.row1 !== e && this.state.row1 !== null) {
                this.setState({ row2: e, edit: true })
            }

        } else {
            this.setState({ edit: false })
        }
    }

    updaterow = () => {
        this.setState({ edit: true })
        if (this.state.row1 !== null && this.state.row2 !== null && this.state.row1 !== this.state.row2) {
            var dargrow = [...this.state.rowdata];
            var temp = dargrow[this.state.row1];
            var dragrowfil = dargrow.filter((val, index, arr) => (
                arr.indexOf(val) !== this.state.row1
            ))
            dragrowfil.splice(this.state.row2, 0, temp)
            this.setState({ rowdata: dragrowfil, row1: null, row2: null, edit: false })
        } else {
            this.setState({ edit: false })
        }
    }

    handelchange = (e) => {
        var newdata = this.state.data.slice();
        newdata[this.state.index] = e.target.value
        this.setState({ data: newdata })
    }

    cancelerr = (e) => {
        this.setState({ error: false })
    }

    render() {
        return (
            <div>
                {this.state.error ? <Error id="errortable" errormessage={this.state.errormessage} cancelerr={this.cancelerr} /> : null}
                
                <table id='tables'>
                    <caption>Details-table</caption>
                    <thead>
                        <tr>
                            {this.state.tableheadings.map((val, index) => (
                                <th key={index}>{val}</th>
                            ))}
                            <Column insertcol={this.addcolumnheading} editing={this.state.edit} />
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.rowdata.length > 0 ? this.state.rowdata.map((val, i) => (
                            <tr key={i} onClick={() => this.drag(i)} title="click on me to change the postion">
                                {val.map((data, subid) => (
                                    <td key={subid} >{data}</td>

                                ))}
                            </tr>
                        )) : null}
                        <tr>
                            {this.state.active ? this.state.tableheadings.map((val, ind) => (
                                <td key={ind}><input type='text' placeholder="add item" required onChange={this.handelchange} onClick={() => this.inputshow(ind)} /></td>
                            )) : <td><input type='text' placeholder="click here to insert row" onClick={this.inputshow} /></td>}
                        </tr>
                    </tbody>
                </table>
                {this.state.edit ? <button id="updaterowbtn" onClick={this.updaterow}>update</button> : <button id="addrowbtn" onClick={this.insertingrow}>Insert</button>}

            </div>
        )
    }

}


export default Table