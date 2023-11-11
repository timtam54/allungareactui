import * as React from "react";
import { ReactGrid, Column, Row, CellChange, TextCell, Cell, DefaultCellTypes } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { bearerToken } from './index';




interface Param {
    ParamID:number;
    ParamName:string;
}


function Rprt() {
  const [reportid]=React.useState(2923);
    const [columns, setColumns] = React.useState<Column[]>([]);

    const [datacol, setDatacol] = React.useState<Param[]>([]);
const [rows,setRows]=React.useState<Row[]>([]);

const [dataSample, setDataSample] = React.useState([]);

      React.useEffect(() => {
        fill();
      }, []);

      const fill = async () => {
        const urlParam = `https://allungawebapi.azurewebsites.net/api/Params/int/` + reportid;
        const token = await bearerToken()
        const headers = new Headers()
        const bearer = `Bearer ${token}`
        headers.append('Authorization', bearer)
        const options = {
          method: 'GET',
          headers: headers,
        }
        const response = fetch(urlParam, options);
        var ee = await response;
        if (!ee.ok) {
          throw Error((ee).statusText);
        }
        const json = await ee.json();
        console.log(json);
        setDatacol(json);

        const urlReading = `https://allungawebapi.azurewebsites.net/api/Readings/` + reportid;
/////////////////
        
    const optionsReadings = {
      method: 'GET',
      headers: headers,
    }
    const responseReading = fetch(urlReading, optionsReadings);
    var ee = await responseReading;
    if (!ee.ok) {
      throw Error((ee).statusText);
    }
    const jsonReadings = await ee.json();

    setDataReading(jsonReadings);



    //////////////
    const urlSample = `https://allungawebapi.azurewebsites.net/api/Samples/report/` + reportid;

    const optionsSample = {
      method: 'GET',
      headers: headers,
    }
    const responseSample = fetch(urlSample, optionsSample);
    var ee = await responseSample;
    if (!ee.ok) {
      throw Error((ee).statusText);
    }
    const jsonSample = await ee.json();

    setDataSample(jsonSample);

        const cols: Column[] = [];
        const cells: DefaultCellTypes[]=[];// Cell[]=[];
    
        cells.push({ type: "header", text: "Sample No" });
        cols.push({ columnId:0, width: 120 , resizable: true});
        cells.push({ type: "header", text: "Name" });
        cols.push({ columnId: 1, width: 120 , resizable: true});
        
        json.forEach(element => {//datacol
            cells.push({ type: "header", text: element.ParamName });
            cols.push({ columnId: element.ParamID, width: 60 , resizable: true});
  
        });
        const headerRow: Row  = {
          rowId: "header",
          cells: cells
        };
        rows.push(headerRow);
        
        var ii=1;
        let Samp =[1,2];
        //Samp.forEach(elementSample => {
        jsonSample.forEach(elementSample => {
          var jj=0;
          const bodys: DefaultCellTypes[]=[];// Cell[]=[];
         
          bodys.push({ type: "text", text: elementSample.Number.toString() });
          bodys.push({ type: "text", text: elementSample.description.toString() });
        //  bodys.push({ type: "text", text: elementSample.Description});
        json.forEach(element => {//datacol
          var xx = jsonReadings.filter((i) => i.Paramid === element.ParamID && i.sampleid === elementSample.SampleID);
          if (xx.length > 0) {
            bodys.push({ type: "number", value: +xx[0].value });
          }
          else
          {
            bodys.push({ type: "number", value: 0 });//jj
          }
            jj++;
        });
        const bodyRow: Row  = {
          rowId: elementSample.SampleID,
          cells: bodys
        };
        rows.push(bodyRow);
        ii++;
      });
        

        setColumns(cols);

      }
    // const getColumns = async (): Promise<Column[]> => {
      const [dataReading, setDataReading] = React.useState([]);
        
     // const GetReading = (ParamID, SampleID) => {
      //  var xx = dataReading.filter((i) => i.Paramid === ParamID && i.sampleid === SampleID);
     //   if (xx.length > 0) {
    //      return xx[0].value;// '2';
    //    }
    //    return '';
    //  }
      
 return <ReactGrid   enableRowSelection enableFillHandle enableRangeSelection  enableColumnSelection rows={rows} columns={columns} stickyTopRows={1} />

}


export default  Rprt