import React, { Component } from 'react'
import StockService from '../../services/StockService'

class ViewStockComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            stock: {},
            company: {},
            stockExchange: {}
        }
    }

    componentDidMount(){
        StockService.getStockById(this.state.id).then( res => {
            this.setState({stock: res.data});
            this.setState({company: this.state.stock.company});
            this.setState({stockExchange: this.state.stock.stockExchange});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "containerH card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Stock Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Stock Price: </label>
                            <div> { this.state.stock.price }</div>
                        </div>
                        <div className = "row">
                            <label> Stock Date: </label>
                            <div> { this.state.stock.date }</div>
                        </div>
                        <div className = "row">
                            <label> Stock Time: </label>
                            <div> { this.state.stock.time }</div>
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

export default ViewStockComponent
