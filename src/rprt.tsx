
import { ReactGrid, Column, Row, CellChange, TextCell, Cell, DefaultCellTypes } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { bearerToken } from './index';
import { Circles } from 'react-loader-spinner'
import {Link,useLocation, useParams } from "react-router-dom"

import React,{ useState, useEffect} from 'react';

interface Param {
    ParamID:number;
    ParamName:string;
}

function Rprt() {
  const [loading, setLoading] = useState(true);
  const location = useLocation()
  const id = location.state.id;
  const [reportid]=React.useState(id);
    const [columns, setColumns] = React.useState<Column[]>([]);

    const [datacol, setDatacol] = React.useState<Param[]>([]);
const [rows,setRows]=React.useState<Row[]>([]);

const [dataSample, setDataSample] = React.useState([]);

      React.useEffect(() => {
        fill();
      }, []);

      const fill = async () => {
        setLoading(true);
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

        jsonSample.forEach(elementSample => {
          var jj=0;
          const bodys: DefaultCellTypes[]=[];// Cell[]=[];
         
          bodys.push({ type: "text", text: elementSample.Number.toString() });
          bodys.push({ type: "text", text: elementSample.description.toString() });
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
        setLoading(false);
      }
//
      const handleChanges = (changes: CellChange<TextCell>[]) => { 
    
        setRows((prevPeople) => applyChangesToPeople(changes, prevPeople)); 
      }; 

      const applyChangesToPeople = (
        changes: CellChange<TextCell>[],
        prevPeople: Row[]
      ): Row[] => {
        changes.forEach((change) => {
          const personIndex = change.rowId;
          const fieldName = change.columnId;
          var colord = getcolordinal(fieldName.toString());
          var roword = getcolordinal(personIndex.toString());
          var xx = prevPeople.filter((i) => i.rowId === personIndex);
          var x=xx[colord];
          if ((typeof prevPeople[colord][roword])=='number')
          {
          prevPeople[personIndex][fieldName] = +change.newCell.text.replace(',','');
          }
          else
          {
            prevPeople[personIndex][fieldName] = change.newCell.text;
          }
        });
        return [...prevPeople];
      };

      const getcolordinal = (ParamID:string):number=>
      {
        //datacol.filter((i) => i.ParamID === fieldName);
        return 2;
      }
/*
      const applyChangesToPeople = (
        changes: CellChange<TextCell>[],
        prevPeople: Person[]
      ): Person[] => {
        changes.forEach((change) => {
          const personIndex = change.rowId;
          const fieldName = change.columnId;
         // alert(typeof prevPeople[personIndex][fieldName]);
          if ((typeof prevPeople[personIndex][fieldName])=='number')
          {
          prevPeople[personIndex][fieldName] = +change.newCell.text.replace(',','');
          }
          else
          {
            prevPeople[personIndex][fieldName] = change.newCell.text;
          }
        });
        return [...prevPeople];
      };*/

      const [dataReading, setDataReading] = React.useState([]);
        

    const handleColumnResize = (ci: Id, width: number) => {
      setColumns((prevColumns) => {
          const columnIndex = prevColumns.findIndex(el => el.columnId === ci);
          const resizedColumn = prevColumns[columnIndex];
          const updatedColumn = { ...resizedColumn, width };
          prevColumns[columnIndex] = updatedColumn;
          return [...prevColumns];
      });
    }
 return <div><h3 style={{color:'#944780'}}>Excel View</h3>  {loading ? 
  <Circles   height="300"   width="300"   color="#944780"   ariaLabel="circles-loading" wrapperStyle={{}}  wrapperClass="" visible={true} />
:<ReactGrid onCellsChanged={handleChanges}  onColumnResized={handleColumnResize} enableRowSelection enableFillHandle enableRangeSelection  enableColumnSelection rows={rows} columns={columns} stickyTopRows={1} />
 }
</div>
 
}


export default  Rprt