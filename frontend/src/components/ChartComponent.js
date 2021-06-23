import React, {Component} from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import CompanyService from '../services/CompanyService';
import StockService from '../services/StockService';
import SectorService from '../services/SectorService';
import SearchComponent from './SearchComponent';

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);



class ChartComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
        companies: [],
        stocks: [],
        sectors: [],
        xaxis: "",
        yaxis: "",
        caption:"",
        selectedCompany: "",
        chartType: "column2d",
        chartData: []
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount(){
    CompanyService.getCompanies().then((res) => {
        this.setState({ companies: res.data});
    });

    SectorService.getSectors().then((res) => {
      this.setState({ sectors: res.data});
    });

    StockService.getStocks().then((res) => {
      this.setState({ stocks: res.data});
      //alert(JSON.stringify(this.state.stocks));
    }); 
    
  }

  setCompany = (theC) => {
    this.setState({selectedCompany: theC});
    let data = [];
    let oneCompany = this.state.selectedCompany;
    let allCompanies = this.state.companies; //we can make a state and hence give user freedom to choose company
    for(let i=0; i<allCompanies.length; i++){
      if(allCompanies[i].name===oneCompany){
        let id = allCompanies[i].id;
        let allstocks = this.state.stocks;
        for(let i=0; i<allstocks.length; i++){
          if(allstocks[i].company.id===id){
          let aPair = {label: allstocks[i].time, value: allstocks[i].price};
          data.push(aPair);
          }
        }
        this.setState({chartData: data});
      }
    }
    this.setState({caption: `${this.state.selectedCompany} Stocks At Different Times`, xaxis: "Time", yaxis: "Price"});
  }

  onChangeHandler(e){
    let selectedChart = e.target.value;
    if(selectedChart==="stockTime"){
      let data = [];
      let allCompanies = this.state.companies;
      let oneCompany = this.state.selectedCompany;
       //we can make a state and hence give user freedom to choose company
      for(let i=0; i<allCompanies.length; i++){
        if(allCompanies[i].name===oneCompany){
          let id = allCompanies[i].id;
          let allstocks = this.state.stocks;
          for(let i=0; i<allstocks.length; i++){
            if(allstocks[i].company.id===id){
            let aPair = {label: allstocks[i].time, value: allstocks[i].price};
            data.push(aPair);
            }
          }
          this.setState({chartData: data});
        }
      }
      //alert(JSON.stringify(data));
      this.setState({caption: `${this.state.selectedCompany} Stocks At Different Times`, xaxis: "Time", yaxis: "Price"});
    }
    else if(selectedChart==="sectorTime"){
      let data =[];
      let allSectors = this.state.sectors;
      let allStocks = this.state.stocks;
      for(let i=0; i<allSectors.length; i++){
        let lab = allSectors[i].sectorName;
        //alert(lab);
        let val = 0;
        for(let j=0; j<allStocks.length; j++){
          //alert(allStocks[i].company.sector.id);
          if(allStocks[i].company.sector.id===allSectors[i].id){
            val = val + allStocks[i].price;
          }
        }
        let aPair = {label: lab, value: val};
        data.push(aPair);
      }
      //alert(JSON.stringify(data));
      this.setState({chartData: data});
      this.setState({caption: "Total Price of All Stocks in Different Sectors", xaxis: "Sectors", yaxis: "Total Price of All Stocks"});
    }
    else if(selectedChart==="sectorTurnover"){
      let data =[]
      let allSectors = this.state.sectors
      let allCompanies = this.state.companies
      for(let i=0; i<allSectors.length; i++){
        let id = allSectors[i].id;
        let val = 0;
        for(let j=0; j<allCompanies.length; j++){
          if(allCompanies[j].sector.id===id){
            val = val + allCompanies[j].turnover;
          }
        }
        let aPair = {label: allSectors[i].sectorName, value: val};
        data.push(aPair);
      }
      //alert(JSON.stringify(data));
      this.setState({chartData: data});
      this.setState({caption: "Total Turnover of Different Sectors", xaxis: "Sectors", yaxis: "Net Turnover"});
    }

  }



  render() {

    const chartConfigs = {
      type: this.state.chartType, 
      width: "700", 
      height: "400", 
      dataFormat: "json", 
      dataSource: {
        chart: {
          caption: this.state.caption,    
          subCaption: "",             
          xAxisName: this.state.xaxis,           
          yAxisName: this.state.yaxis, 
          theme: "fusion"                 
        },
        data: this.state.chartData
      }
    };


    return (
        <div className="container">
          <div className="row">
            <div className="col-7">
              <ReactFC {...chartConfigs}/>
            </div>
            <div className="col-5" onChange={(e) => this.onChangeHandler(e)}>
              <label><strong>Charts</strong></label>
              <input type="radio" value="stockTime" name="chartValue" defaultChecked/> Company Stocks At Different Times
              <input type="radio" value="sectorTime" name="chartValue" /> Sector With Stock Price
              <input type="radio" value="sectorTurnover" name="chartValue" /> Sectors With Turnover
            </div>
            <div onChange={(e) => this.setState({chartType: e.target.value})}>
              <label><strong>Chart Type</strong></label>
              <input type="radio" value="area2d" name="charttype" defaultChecked/> 2D Area
              <input type="radio" value="pie2d" name="charttype" /> 2D Pie
              <input type="radio" value="line" name="charttype" /> 2D Line
            </div>
            <h>Select Company For Type 1 Chart</h>
            <SearchComponent companies={this.state.companies} setParentCompany={this.setCompany}/>
          </div>
        </div>
        
    );
  }
}

export default ChartComponent;