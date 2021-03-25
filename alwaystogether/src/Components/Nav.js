import React, {useRef, useState, useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import io from 'socket.io-client'
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Modall from './Modal'

import SocketContext from "./Socket";
import FileUploader from "./FileUploader"


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
      textAlign: 'center'
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    padding: 0,
    marging: 0,
  textAlign : 'center' },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(${theme.spacing(0)}vw)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40vw',
      textAlign : 'center'
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));


export default function PrimarySearchAppBar(props) {
  const socket = React.useContext(SocketContext);
  const {setVideoURL, videoURL} = props;
  const myValue = useRef();
  const inputs= useRef();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [nom, setNom] = React.useState(false);
  const [file, setFile] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  

  const handleOpenModal = (file,nom) => {
    setOpen(true);
    setFile(file)
    setNom(nom)
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    
      setVideoURL(inputs.current.value)
      var test = inputs.current.value  
    socket.emit('videoChange1', test )

    }
    
    useEffect(() => {

      socket.on('videoChange2', (videoURL) =>  {
        setVideoURL(videoURL)
        console.log( "dront data"+ videoURL)
         });
   
    socket.on('FileUploadNotif2',(file,nom)=>{
      


        
handleOpenModal(file, nom)

    })
    return()=> {
      socket.off('FileUploadNotif')
      socket.off('FileUploadNotif2')
    }
         
      
    }, [videoURL]);
    
    

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >


     {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> 
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>*/}
    </Menu>
  );


  return (
    <div className={classes.grow}>
      <AppBar position="static"
      color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Always Together
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              fullWidth={true}
              placeholder="Enter Video URL..."
              inputRef = {inputs}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={event => event.key === 'Enter' ? handleChange(event) : null}
              
            />
            

          </div>
          <Button
        variant="contained"
        onClick={event => handleChange(event)}
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
       
      >       

        enter
      </Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
           {/* <Button 
            variant="contained"
            color='primary'
            className={classes.button}
            endIcon={<Icon> upload</Icon>}>
            <Input type='file' />
           </Button> */}
          
            <FileUploader
            onFileSelectSuccess={(file) => {
            var nom = file.name
            var path = (window.URL || window.webkitURL).createObjectURL(file);
 setVideoURL(path); console.log(file) ; socket.emit('FileUploadNotif', nom )}}
          onFileSelectError={({ error }) => {alert(error); console.log(file)} }
        />
           
      
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Modall open={open} setOpen={setOpen} handleOpen={handleOpenModal} handleClose={handleCloseModal} nom={nom} file={file} setVideoURL={setVideoURL}   />
    </div>
  );
}
