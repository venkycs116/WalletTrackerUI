import React, { Component, Suspense } from 'react';
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { LinearProgress } from '@material-ui/core';
const HomeScreen = React.lazy(()=>import('../src/screens/home'));
const LoginScreen = React.lazy(()=>import('../src/screens/login'));


interface IProps {
    
}

interface IState{

}

export default class App extends Component<IProps,IState>{
  
  render(){
    return (
      <BrowserRouter basename={'/'}>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} render={(props:any)=> 
            <Suspense fallback={
              <LinearProgress></LinearProgress>
            }>
              <LoginScreen/>
            </Suspense>
            
          }></Route>
            <Route exact path={`${process.env.PUBLIC_URL}/home`} render={(props:any)=> 
            <Suspense fallback={
              <LinearProgress></LinearProgress>
            }>
              <HomeScreen/>
            </Suspense>
            
          }></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
