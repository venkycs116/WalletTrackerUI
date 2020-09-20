import React, { Component } from 'react';
import { Box, withStyles, WithStyles, createStyles, Paper, Button, Grid, Avatar, Typography } from '@material-ui/core';
import Header from 'uicomponents/Header';
import ThemeColors from 'uicomponents/ThemeColors';
import { ToastContainer, toast } from "react-toastify";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import GetRemFontSize, { GetLineHeightUnitless } from 'utils/FontCalculation';

const styles = () => createStyles({
  root: {
    '& .container': {
      width: '100%',
      height:'100%',
      display: 'flex',
      flexDirection: 'row',
    },
    '& .loginwrap': {
        width: '100%',
        height:500,
        alignItems:'center',
        justifyContent:'center',
        display: 'flex',
        alignContent:'center',
        flexDirection: 'row',
        '& .box': {
            height:350,
            width:350,
            alignItems:'center',
            justifyContent:'center',
            display: 'flex',
            alignContent:'center',
            flexDirection: 'row',
          },
      },
      '& .MuiFormControl-root': {
        width:250,
      },
      '& .bcol': {
        backgroundColor: ThemeColors.Porcelain,
        '&.left': {
          filter: 'drop-shadow(0px 0px 1px rgba(63,63,68,0.05)) drop-shadow(0px 1px 2px rgba(63,63,68,0.15))',
          width: 300
        },
        '&.right': {
          filter: 'drop-shadow(0px 0px 1px rgba(63,63,68,0.05)) drop-shadow(0px 1px 2px rgba(63,63,68,0.15))',
          // transform: 'rotate(-180deg)',
          width: 400,
          '& .hambugger-menu': {
            display: 'none'
          }
        },
        '&.middle': {
          backgroundColor: ThemeColors.AthensGray,
          overflowY: 'scroll',
          '&.nooffers': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
  
        }
      },
      '& .savebtn': {
        margin: '20px 0px 0px 20px',
        fontSize: GetRemFontSize(14),
        lineHeight: GetLineHeightUnitless(18, 14),
        fontWeight: 500,
        height: 35,
        width: 100,
        borderRadius: 2,
        color: '#fff',
        textTransform: 'capitalize',
        backgroundColor: '#0093ed',
    }
    
  }
});

interface IProps extends WithStyles<typeof styles> {

}

interface IState {
  screenWidth: number,
  screenHeight: number,
  headerHeight: number,
  userId:any,
}

type Props =  IProps;

class LoginScreen extends Component<Props, IState>{
  rootRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      headerHeight: 64,
      userId:''
    };
    this.rootRef = React.createRef();
    window.addEventListener("resize", this.UpdateScreenDimensions);
  }

  componentDidMount() {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.UpdateScreenDimensions);
  }

  UpdateScreenDimensions = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    });
  }

  handleChange = (event: any, type: string) => {
    switch (type) {
        case "UserId":
            this.setState({ userId: event.target.value });
            break;
    }

}
handleSubmit = () => {

    var Url = process.env.REACT_APP_BACKEND_ENDPOINT + 'login'
    fetch(Url,{
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: this.state.userId.trim(),
      })
  }).then((response) => {
      toast.success('LoggedIn Successfuly', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.setItem("username", JSON.stringify(this.state.userId.trim()));
      window.location.href='home';
  }).catch(function (error) {
          toast.error(error, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined, 
          });
      });


}

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header></Header>
        <Box className="container" style={{ height: this.state.screenHeight - this.state.headerHeight}}>
          <Box className="bcol middle" flexGrow={1}>
          <div className="loginwrap">
              <Paper className="box">
             
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                    onError={(errors: any) => console.log(errors)}>
                  <Grid container direction="column" justify="center" style={{marginBottom:50}} alignItems="center" >
                    <Grid item>
                    <Button title="" aria-label="logo">
                                <Avatar variant="square" alt="wallet app" src={`${process.env.PUBLIC_URL}appicon.png`}></Avatar>
                            </Button>
                    </Grid>
                    <Grid item>
                    <Typography variant="h6">WALLET TRACKER</Typography>
                    </Grid>
                           
                      
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center" >
                 
                        <TextValidator
                            label="User Name"
                            onChange={(e: any) => this.handleChange(e, 'UserId')}
                            name="text"
                            value={this.state.userId}
                            variant="outlined"
                            validators={['required']}
                            errorMessages={['User Name is required']}
                        />
                    </Grid>
                    <Grid container  direction="row" justify="center" alignItems="center" >
                        <Grid item>
                            <Button type="submit"
                                variant="contained"
                                size="small"
                                className="savebtn">
                                Login
                           </Button>
                        </Grid>
                    </Grid>
                </ValidatorForm>
                </Paper>
            </div>
          </Box>
        </Box>
        </div>
    );
  }
}

export default withStyles(styles)(LoginScreen);