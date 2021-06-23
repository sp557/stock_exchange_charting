import React, { Component } from 'react'
import StockService from '../../services/StockService';
import * as UserService from  '../../services/user.service';

class UpdateStockComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            currentUser: {},
            price: '',
            date: '',
            time: '',
            company: {id: ''},
            stockExchange: {id: ''}
        }
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeTimeHandler = this.changeTimeHandler.bind(this);
        this.changeCompanyHandler = this.changeCompanyHandler.bind(this);
        this.changeStockExchangeHandler = this.changeStockExchangeHandler.bind(this);
        this.updateStock = this.updateStock.bind(this);
    }

    componentDidMount(){
        StockService.getStockById(this.state.id).then( (res) =>{
            let stock = res.data;
            this.setState({price: stock.price,
                date: stock.date,
                time: stock.time,
                company: {id: stock.company.id},
                stockExchange: {id: stock.stockExchange.id}
            });
        });
        if(localStorage.getItem('username')){
            UserService.getUserDetails().then( res => {
                this.setState({currentUser: res.data});
            })
        }
    }

    updateStock = (e) => {
        e.preventDefault();
        let stock = {price: this.state.price,
            date: this.state.date,
            time: this.state.time,
            company: {id: this.state.company.id},
            stockExchange: {id: this.state.stockExchange.id}
        }
        StockService.updateStock(stock, this.state.id).then( res => {
            this.props.history.push('/stocks/all');
        });
    }
    
    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }

    changeDateHandler= (event) => {
        this.setState({date: event.target.value});
    }

    changeTimeHandler= (event) => {
        this.setState({time: event.target.value});
    }

    changeCompanyHandler= (event) => {
        this.setState({company: { id : event.target.value}});
    }

    changeStockExchangeHandler= (event) => {
        this.setState({stockExchange: { id : event.target.value}});
    }

    cancel(){
        this.props.history.push('/stocks/all');
    }

    render() {
        return (
            <>
            {this.state.currentUser.isAdmin === "YES" ? 
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Stock</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Price: </label>
                                            <input placeholder="Price" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changePriceHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Date: </label>
                                            <input placeholder="Date" name="date" className="form-control" 
                                                value={this.state.date} onChange={this.changeDateHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Time: </label>
                                            <input placeholder="Time" name="time" className="form-control" 
                                                value={this.state.time} onChange={this.changeTimeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Company Id: </label>
                                            <input placeholder="Company Id" name="companyId" className="form-control" 
                                                value={this.state.company.id} onChange={this.changeCompanyHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Stock Exchange Id: </label>
                                            <input placeholder="Stock Exchange Id" name="stockExchangeId" className="form-control" 
                                                value={this.state.stockExchange.id} onChange={this.changeStockExchangeHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateStock}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
            :
            <div>You are not authorized!!!</div>
        }
            </>
        )
    }
}

export default UpdateStockComponent
