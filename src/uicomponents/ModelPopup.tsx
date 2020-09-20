import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Grid, IconButton } from '@material-ui/core';
import closeblueicon from 'assets/icons/close-blue.png';
import GetRemFontSize, { GetLineHeightUnitless } from 'utils/FontCalculation';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
   '& .popup-content': {      
      minHeight:615,
      position:'relative',
      outline: 'none',
      border:0,
      borderRadius:5,
      backgroundColor:'#fff',
      filter:'drop-shadow(0px 24px 13px rgba(0,0,0,0.14)) drop-shadow(0px 9px 16px rgba(0,0,0,0.12)) drop-shadow(0px 11px 6px rgba(0,0,0,0.2))',
      padding:25,
      '&.nopadding':{
        padding:1,        
        minWidth: 400
      },
      '& .popup-title': {
          fontSize: GetRemFontSize(24), 
          marginTop: 0,
          marginBottom: 10,
          lineHeight: GetLineHeightUnitless(28,24),
          textTransform:'capitalize',
          color: '#0a2a69',
          fontWeight: 500
      },
      '& .popupclose-float':{
        position:'absolute',
        right:20,
        top: 20
      },
      '& .popup-close-btn': {
          width: 30,
          minWidth: 30,
          height:30,  
          textAlign: 'center',
          backgroundColor: '#fff',
          borderRadius:2,
          '& .popup-icon': {
              width: 20,
              minWidth: 20,
              height:20,
              margin:'auto'
          },
      }
    }  
  },
});

interface IProps{
  open: boolean;
  body: any;
  title: string;
  closeCallback?: any;
  parentRef: any;
  nopadding?:boolean;
  floatHeader?:boolean;
}

function ModelPopup(props: IProps) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(props.open || false);

  useEffect(()=>{
    setOpen(props.open);
  },[props.open]);

  const handleClose = () => {
    setOpen(false);
    if ( props.closeCallback != null ){
      props.closeCallback();
    }
  };

  return (
    <Modal className={classes.root}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        container={()=> props.parentRef.current}>
          <div className={clsx({
                                ["popup-content"]: true, //eslint-disable-line no-useless-computed-key
                                ["nopadding"] : props.nopadding //eslint-disable-line no-useless-computed-key
                                }
                              )}>
            {
              props.floatHeader
              ?
              <div className="popupclose-float">
                <IconButton className="popup-close-btn" onClick={handleClose}>
                  <img className="popup-icon" src={closeblueicon} alt=""/>
                </IconButton>
              </div>
              :
              <Grid container direction="row" justify="space-between" alignItems="center">
                  <Grid item><h2 className="popup-title">{props.title}</h2></Grid>
                  <Grid item>
                    <IconButton className="popup-close-btn" onClick={handleClose}>
                      <img className="popup-icon" src={closeblueicon} alt=""/>
                    </IconButton>
                  </Grid>
              </Grid>
            }
            
            {
              props.body            
            }
          </div>
      </Modal>
  );
}
export default ModelPopup;