import React,{useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FileUploader from "./FileUploader"


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
    const modalButton = useRef()
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  let {open, setOpen, handleClose, handleOpen, file,nom,setVideoURL, socket} = props;

  

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <Button color='secondary' onClick={handleClose}> Let me out</Button>
      <h2 id="simple-modal-title">Un fichier a été mis</h2>
      <p id="simple-modal-description">
        Votre ami {nom} vient de mettre le fichier : 
        <p>{file} </p>        
        <p> Veuillez mettre le même fichier </p>
        <p style={{float : 'right'}}>
             <FileUploader
            onFileSelectSuccess={(file) => {
            var path = (window.URL || window.webkitURL).createObjectURL(file);
            setOpen(false); alert(path); }  }
          onFileSelectError={({ error }) => {alert(error); console.log(file)} }
        /> 
        </p>
       
      </p>
      <SimpleModal />
    </div>
  );

  return (
    <div>
    
      <Modal
        open={open}
       // onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}