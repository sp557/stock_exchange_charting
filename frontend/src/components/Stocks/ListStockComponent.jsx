import React, { Component } from 'react'
import StockService from '../../services/StockService'
import '../styling.css';
import * as UserService from  '../../services/user.service';

class ListStockComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                stocks: [],
                currentUser: {}
        }
        this.addStock = this.addStock.bind(this);
        this.editStock = this.editStock.bind(this);
        this.deleteStock = this.deleteStock.bind(this);
    }

    deleteStock(id){
        StockService.deleteStock(id).then( res => {
            this.setState({stocks: this.state.stocks.filter(stock => stock.id !== id)});
        });
    }
    viewStock(id){
        this.props.history.push(`/stocks/${id}/show`);
    }
    editStock(id){
        this.props.history.push(`/stocks/${id}/edit`);
    }

    componentDidMount(){
        StockService.getStocks().then((res) => {
            this.setState({ stocks: res.data});
        });

        if(localStorage.getItem('username')){
            UserService.getUserDetails().then( res => {
                this.setState({currentUser: res.data});
            })
        }
    }

    addStock(){
        this.props.history.push('/stocks/new');
    }

    render() {
        return (
            <>
            <div>
                 <h2 className="text-center">Stocks List</h2>
                 {this.state.currentUser.isAdmin === "YES" ?
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addStock}> Add Stock</button>
                 </div>
                 :
                 <div></div>
                 }
                 <br></br>
                 <div className = "row">
                        <table id="mytable">

                            <thead>
                                <tr>
                                    <th> Price </th>
                                    <th> Date </th>
                                    <th> Time </th>
                                    <th> Company Id </th>
                                    <th> Stock Exchange Id </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.stocks.map(
                                        stock => 
                                        <tr key = {stock.id}>
                                             <td> { stock.price} </td>   
                                             <td> { stock.date} </td>  
                                             <td> { stock.time} </td>
                                             <td> { stock.company.id} </td>  
                                             <td> { stock.stockExchange.id} </td> 
                                             <td>
                                             {this.state.currentUser.isAdmin === "YES" ?
                                                 <span>
                                                 <button onClick={ () => this.editStock(stock.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteStock(stock.id)} className="btn btn-danger">Delete </button>
                                                 </span>
                                                 :
                                                 <div></div>
                                                }
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewStock(stock.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
            </>
        )
    }
}

export default ListStockComponent
