import React, { Component } from 'react';
import { Box, withStyles, WithStyles, createStyles } from '@material-ui/core';
import Header from 'uicomponents/Header';
import ThemeColors from 'uicomponents/ThemeColors';

import Grid from 'uicomponents/Grid';
import { ToastContainer } from 'react-toastify';
const styles = () => createStyles({
  root: {
    '& .container': {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      overflow: 'auto',
      '@media (max-width: 1200px)': {
        display: 'flex',
        flexDirection: 'column-reverse',
        overflow: 'auto',
        '& .bcol': {
          backgroundColor: 'transparent',
          '&.left': {
            filter: 'drop-shadow(0px 0px 1px rgba(63,63,68,0.05)) drop-shadow(0px 1px 2px rgba(63,63,68,0.15))',
            width: '100%'
          },
          '&.right': {
            '& .hambugger-menu': {
              display: 'block',
              '& .menu-icon': {
                width: 30,
                height: 30,
              },
            },
            margin: '20px auto 20px auto',
            display: "flex",
            width: '90%',
            justifyContent: "flex-end",
            filter: 'drop-shadow(0px 0px 1px rgba(63,63,68,0.05)) drop-shadow(0px 1px 2px rgba(63,63,68,0.15))',
            '& .content-right': {
              display: 'none'
            },
          },
          '&.middle': {
            backgroundColor: ThemeColors.AthensGray,
            overflowY: 'scroll',
            '&.nooffers': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            },
            '& .header': {
              margin: '0px 50px 0px 24px',
            }
          }
        }
      }
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
    }
  }
});

interface IProps extends WithStyles<typeof styles> {

}

interface IState {
  screenWidth: number,
  screenHeight: number,
  headerHeight: number,
  drawerHeight:number,
}

type Props =  IProps;

class HomeScreen extends Component<Props, IState>{
  rootRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      headerHeight: 64,
      drawerHeight:0,
      
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
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header  showlogout={true}></Header>
        <ToastContainer position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
        <Box className="container" style={{ height: this.state.screenHeight - this.state.headerHeight - this.state.drawerHeight }}>
          <Box className="bcol left">
          </Box>
          <Box className="bcol middle" flexGrow={1}>
            <Grid></Grid>
          </Box>
          <Box className="bcol right">
          </Box>
        </Box>
        </div>
    );
  }
}

export default withStyles(styles)(HomeScreen);