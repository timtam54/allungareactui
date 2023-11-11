import './App.css';

const About = ()=> {

  const imgMyimageexample = require('./background.jpg');
const divStyle = {
  width: '100%',
  height: '800px',
  backgroundImage: `url(${imgMyimageexample})`,
  backgroundSize: 'cover' ,
  verticalAlign:'top', 
};
    return (
      
      <div  style={divStyle} >
        <h1>About</h1>
        <br/>
        <div>This is a <a href="https://react.dev/">React UI</a> connected to a Ap.Net Core 6.0 data layer, bound to an Azure SQL database</div>
        <div>This allows clients to log in and see their samples tests.</div>
     
      </div>
    );
  }

export default About