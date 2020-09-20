import React, { Component } from "react";
import { AppBar, IconButton, Avatar, Box, WithStyles, createStyles, withStyles, Button } from "@material-ui/core";
import ThemeColors from "./ThemeColors";
import ExitToApp from '@material-ui/icons/ExitToApp';
import GetRemFontSize, { GetLineHeightUnitless } from "utils/FontCalculation";

const styles = createStyles({
    root:{
        backgroundColor: ThemeColors.White,
        height: 64,
        flexDirection:'row',
        filter:'drop-shadow(0px 2px 2px rgba(0,0,0,0.04))',
        boxShadow:'none',        
        '& .MuiAvatar-square':{
            width: 96            
        },
        '& .MuiAvatar-img':{
            objectFit: 'contain'            
        },        
        '& .hcol.left, & .hcol.right':{
            flex:0
        },
        '& .hcol.left':{
            paddingLeft: 20
        },
        '& .hcol.middle':{
            flex:1
        },
        '& .hcol.right': {
            alignSelf:'center',
            '& .linkscontainer':{
                flexDirection:'row',
                flexShrink:0,
                flexGrow:1,
                display:'flex',
                marginRight:10                
            },            
            '& .links':{
                flex:0,
                width:24,
                height: 24,
                backgroundColor:ThemeColors.SilverSand,
                margin:'0px 10px',
                borderRadius:0                
            },
            '& .logout':{
                flex:0,
                margin:'0px 10px',
                borderRadius:0,
                color:'#313131' ,
                fontSize: GetRemFontSize(14),
                lineHeight: GetLineHeightUnitless(18, 14),           
            }
            
        }        
    }
});

interface IProps extends WithStyles<typeof styles> {
    showlogout? : any;
}

interface IState{
}
type Props = IProps;

class Header extends Component<Props, IState> {   
    rootRef: any;

    logout(){
        localStorage.clear();
        window.location.href='/'
    }
   
    render(){
        const { classes } = this.props;
     return (
    <AppBar className={classes.root} position="sticky">
        <Box className="hcol left">
            <Button title="" aria-label="logo">
                <Avatar variant="square" alt="wallet app" src={`${process.env.PUBLIC_URL}appicon.png`}></Avatar>Wallet Tracker
            </Button>
        </Box>
        <Box className="hcol middle" />
        <Box className="hcol right">    
        {
            this.props.showlogout ?  <IconButton className="logout" onClick={this.logout} ><ExitToApp/>Logout</IconButton> : null
        } 
        </Box>
    </AppBar>    
  );
    }
}
export default withStyles(styles)(Header);