import React, { Component } from 'react'
import SectorService from '../../services/SectorService'

class ViewSectorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            sector: {}
        }
    }

    componentDidMount(){
        SectorService.getSectorById(this.state.id).then( res => {
            this.setState({sector: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = " containerH card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Sector Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Sector Name: </label>
                            <div> { this.state.sector.sectorName }</div>
                        </div>
                        <div className = "row">
                            <label> Sector Brief: </label>
                            <div> { this.state.sector.sectorBrief }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewSectorComponent
