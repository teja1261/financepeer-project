import {Component} from "react"
import ReactFileReader from 'react-file-reader';
import Header from '../Header'
import './index.css'

const fileTypes = ["json"];

class Upload extends Component {

  state = {errMsg: "", showErrorMsg: false, jsonData: []}


  enteringDatabase = async()=>{
    const {jsonData} = this.state;
    for(let i=0; i<jsonData.length; i++){
      console.log(jsonData[i]);
      const url = "http://localhost:6003/"
      const options = {
         headers:{
           "content-type": "application/json"
         },
         method: "POST",
         body: JSON.stringify({
           id: jsonData[i].id,
           userId : jsonData[i].userId,
           title : jsonData[i].title,
           body : jsonData[i].body,
         })
      }
      const response = await fetch(url, options);
      console.log(response)
    }
 }

 handleFiles = files => {
   if (files && files[0]) 
   {
     const extension = files[0].name.split('.').pop().toLowerCase(),
         isSuccess = fileTypes.indexOf(extension) > -1;

     if (isSuccess) {
         const reader = new FileReader();
         reader.onload =  () => {
           const parsedData = JSON.parse(reader.result);
           this.setState({jsonData: parsedData, showErrorMsg: false})
           this.enteringDatabase()
         }
         reader.readAsText(files[0]);
     }
     else { 
       this.setState({errMsg: "Upload json File", showErrorMsg: true})
     }
  }
}

  render() {
    const {showErrorMsg, errMsg} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-content">
            <h1 className="home-heading">Upload Data</h1>
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.json'}>
                  <button type="button" className="upload-button">
                     upload file
                  </button>
            </ReactFileReader>
            {showErrorMsg && <p className="error-message">*{errMsg}</p>}
          </div>
        </div>
      </>
    )
  }
}

export default Upload
