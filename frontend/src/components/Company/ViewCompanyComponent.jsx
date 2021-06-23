import React, { Component } from 'react'
import CompanyService from '../../services/CompanyService'

class ViewCompanyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            company: {},
            sector:{}
        }
    }

    componentDidMount(){
        CompanyService.getCompanyById(this.state.id).then( res => {
            this.setState({company: res.data});
            this.setState({sector: this.state.company.sector});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "  containerH card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Company Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Company Code: </label>
                            <div> { this.state.company.companycode }</div>
                        </div>
                        <div className = "row">
                            <label> Company Name: </label>
                            <div> { this.state.company.name }</div>
                        </div>
                        <div className = "row">
                            <label> CEO Name: </label>
                            <div> { this.state.company.ceoname }</div>
                        </div>
                        <div className = "row">
                            <label> Turnover: </label>
                            <div> { this.state.company.turnover }</div>
                        </div>
                        <div className = "row">
                            <label> Brief: </label>
                            <div> { this.state.company.brief }</div>
                        </div>
                        <div className = "row">
                            <label> Board Of Directors: </label>
                            <div> { this.state.company.boardDirectors }</div>
                        </div>
                        <div className = "row">
                            <label> SectorID: </label>
                            <div> { this.state.sector.id }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewCompanyComponent
