import React, { Component } from 'react'
import ExchangeService from '../../services/ExchangeService'

class ViewExchangeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            exchange: {}
        }
    }

    componentDidMount(){
        ExchangeService.getExchangeById(this.state.id).then( res => {
            this.setState({exchange: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "containerH card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Employee Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Exchange Name: </label>
                            <div> { this.state.exchange.name }</div>
                        </div>
                        <div className = "row">
                            <label> Exchange Intro: </label>
                            <div> { this.state.exchange.intro }</div>
                        </div>
                        <div className = "row">
                            <label> Exchange Address: </label>
                            <div> { this.state.exchange.address }</div>
                        </div>
                        <div className = "row">
                            <label> Exchange Remarks: </label>
                            <div> { this.state.exchange.remarks }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewExchangeComponent
