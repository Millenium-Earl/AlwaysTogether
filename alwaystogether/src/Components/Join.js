import React, {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import FireplaceIcon from '@material-ui/icons/Fireplace';



const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleRoom = (event) => {
        setRoom(event.target.value);
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          height: '100vh',
        },
        image: {
          
          backgroundRepeat: 'no-repeat',
          backgroundColor:"black",
          backgroundSize: 'contain',
          backgroundPosition: 'right',
          
        },
        paper: {
          margin: theme.spacing(8, 4),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      
        backdrop: {
          zIndex: theme.zIndex.drawer + 1,
          color: '#fff',
        },
        TextField:{
            width :"60%", 
        },
      
      }));
      const classes = useStyles();
      const join = useRef();

      function PressEnter(e){
        e.preventDefault();
        if(e.keyCode == 13){
           alert("pressed enter key");
        }
        return false;
    }
    

    return(
         <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={6} className={classes.image} />
    <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
    <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FireplaceIcon />
        </Avatar>
        <Typography component="h1" variant="h3">
          Always Together
        </Typography>
        
        </div>
        <div className="joinConainterExt">
            <div className="joinContainerInt">
            <Typography component="h1" variant="h5">
          Join room
        </Typography>
                <div><TextField 
                 placeholder="Name" 
                 className={classes.TextField} 
                 type='text' 
                 variant="outlined"
                 margin="normal"
                 id="name"
                 label="Name"
                 name="name" 
                 autoFocus
                 onChange={handleName} /> </div>


                <div><TextField 
                 placeholder="Room" 
                 className={classes.TextField}
                 type='text' 
                 variant="outlined"
                 margin="normal"
                 name="room"
                 label="Room"
                 id="room"
                 onChange={handleRoom}
                 onKeyPress={(event) => { if (event.key ==='Enter') { if (!name || !room) {event.preventDefault(); alert('Please choose a name and a room')} else  { return null } }}} 

                //onKeyPress={event => event.key === 'Enter' ? handleChange(event) : null}
                  />
                 </div>

                    <Link ref={join} onClick={(event)=> { if (!name || !room) {event.preventDefault(); alert('Please choose a name and a room')} else  { return null } }} to={`/mainTV?name=${name}&room=${room}`}  
                    onKeyPress={(event) => { if (event.key ==='Enter') { if (!name || !room) {event.preventDefault(); alert('Please choose a name and a room')} else  { return null } }}} >
                    <Button  type='submit'
                    variant="contained"
                    color="primary"
                    className={classes.submit} > Entrez </Button> 
                    </Link>


            </div>

        </div>
        </Grid>
        </Grid>)

}
export default Join;