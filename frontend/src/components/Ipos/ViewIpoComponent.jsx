import React, { Component } from 'react'
import IpoService from '../../services/IpoService'

class ViewIpoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            ipo: {},
            company: {},
            stockExchange: {}
        }
    }

    componentDidMount(){
        IpoService.getIpoById(this.state.id).then( res => {
            this.setState({ipo: res.data});
            this.setState({company: this.state.ipo.company});
            this.setState({stockExchange: this.state.ipo.stockExchange});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "containerH card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View IPO Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> IPO Price: </label>
                            <div> { this.state.ipo.price }</div>
                        </div>
                        <div className = "row">
                            <label> Total No Of IPOs: </label>
                            <div> { this.state.ipo.totalNumber }</div>
                        </div>
                        <div className = "row">
                            <label> Open Date and Time: </label>
                            <div> { this.state.ipo.timestamp }</div>
                        </div>
                        <div className = "row">
                            <label> Remarks: </label>
                            <div> { this.state.ipo.remarks }</div>
                        </div>
                        <div className = "row">
                            <label> Company Id: </label>
                            <div> { this.state.company.id }</div>
                        </div>
                        <div className = "row">
                            <label> Stock Exchange Id: </label>
                            <div> { this.state.stockExchange.id }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewIpoComponent
