import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

class Fileupload extends Component {
    constructor(){
        super();
        this.state = {
            uploadedFiles:[],
            uploading:false
        }
    }
    
        onDrop = (files) => {
            console.log(files);
            
        }
    
        showUploadedImages = () => {

        }
    
    
    
    render() {
        return (
            <div>
                <section>
                    <div className="dropzone clear">
                    <Dropzone  onDrop={(e)=>this.onDrop(e)}
                            multiple={false}
                            className="dropzone_box"
                        >  
                    {({getRootProps, getInputProps}) => (
                     
                    <div {...getRootProps()}>
                     <input {...getInputProps()} />
                     <div className="wrap">
                    <FontAwesomeIcon
                    icon={faPlusCircle}
                    />
                                <p>Add images here</p>
                            </div>
                            </div>
                            
                            )}
                            </Dropzone>
                        { this.showUploadedImages()}
                        {
                            this.state.uploading ?
                            <div className="dropzone_box" style={{
                                textAlign: 'center',
                                paddingTop: '60px'
                            }}>
                                <CircularProgress
                                    style={{color:'#00bcd4'}}
                                    thickness={7}
                                />
                            </div>
                            :null
                        }
                        </div>
                </section>
            </div>
        );
    }
}

export default Fileupload;