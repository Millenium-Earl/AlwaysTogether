import { makeStyles } from '@material-ui/core'


import React, {forwardRef, useRef} from 'react'

const FileUploader = ({onFileSelect,onFileSelectError,onFileSelectSuccess}) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0]
       
    if( file.type !== 'video/mp4' && file.type !=='video/x-matroska' )
    
 
    onFileSelectError({error : "Entrez un fichier valide (MP4 ou MKV)"}) 
    
    
    
  else {onFileSelectSuccess(file);}
    } 
    const useStyle = makeStyles({
        customFileUpload:  {
            backgroundColor: "red",
            color: "white",
            padding: "0.5rem",
            fontFamily: "sans-serif",
            borderRadius: "0.3rem",
            cursor: "pointer",
            marginTop: "1rem",
          
    },

    })

    const classes = useStyle()
    return (
        <div className={classes.fileUploader}>

          
   
           
            <input type="file" id="fileUpload" onChange={handleFileInput} onClick={e => fileInput.current && fileInput.current.click()} hidden  />
            <label for="fileUpload"className={classes.customFileUpload}>Upload Local file</label>
            
          

         </div>
    )
}
export default forwardRef(FileUploader);
