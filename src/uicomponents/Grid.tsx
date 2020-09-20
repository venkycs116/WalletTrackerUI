import React, { Component } from 'react';
import MaterialTable from 'material-table';
import AddEditForm from './AddEditForm';
import ModelPopup from './ModelPopup';
import { WithStyles, withStyles, createStyles, Typography } from '@material-ui/core';
import ThemeColors from './ThemeColors';
import {toast } from 'react-toastify';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import GetRemFontSize, { GetLineHeightUnitless } from 'utils/FontCalculation';


const styles = createStyles({
  root: {
    backgroundColor: ThemeColors.White,
    boxShadow: 'none',
    '& .MuiTextField-root': {
      width: 300,
      marginRight: 20
    },
    '& .header': {
      margin: '40px 50px 0px 24px',
      fontSize: GetRemFontSize(18),
      lineHeight: GetLineHeightUnitless(25, 18),
      fontWeight: 500,
      height: 45,
      color: '#333333',
      padding: '20px 0px',
    }
  }
});
interface IProps extends WithStyles<typeof styles> {
}

interface IState {
  infoPopupToggle: boolean,
  coldef: any,
  popupTitle: string,
  walletData: any,
  initial:boolean,
  isAddForm: boolean,
  isEditData: any,
  walletBalance:number
}
type Props = IProps;

class Grid extends Component<IProps, IState>{
  rootRef: any;
  tableRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      infoPopupToggle: false,
      popupTitle: 'Add Transaction',
      isAddForm: false,
      initial:true,
      coldef: [
        { title: "Sl No", field: "id" },
        { title: "Date", field: "date", type: 'date' },
        { title: "Description", field: "description" },
        {
          title: "Income",
          field: "income",
          cellStyle: {
            color: 'green'
          },
        render: (rowData: { income: number }) => <div ><ArrowUpward style={{height:15}} fontSize="small"/>{rowData.income}</div>
        },
        {
          title: "Expense",
          field: "expense",
          cellStyle: {
            color: 'red'
          },
          render: (rowData: { expense: number }) => <div><ArrowDownward style={{height:15}} fontSize="small"/><span>{rowData.expense}</span></div>
        },
      ],
      walletData: [],
      isEditData: [],
      walletBalance:0
    }
    this.tableRef= React.createRef();
    this.rootRef=React.createRef();
    this.getAllWallets = this.getAllWallets.bind(this);



  }

  componentDidMount() {
    this.getAllWallets();
  }

  componentDidUpdate() {

  }

  infoPopupOpen = (title: string, type: boolean, data: any) => {
    this.setState({ popupTitle: title, isAddForm: type, isEditData: data, infoPopupToggle: true })
  }


  infoPopupClose = () => {
    this.setState({
      infoPopupToggle: false
    })
  };

  delete_data(rowData: any) {
    var Url = process.env.REACT_APP_BACKEND_ENDPOINT + 'wallet/' + rowData.id;
    fetch(Url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization':JSON.parse(localStorage.getItem('username') || '{}')
      },
    }).then((response) => {
      toast.success('Deleted Successfully!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined, 
      });
      this.getAllWallets();
      return response.json()
    })
      .then(() => {

      })
      .catch(function (error) {
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


  getAllWallets() {
    var Url = process.env.REACT_APP_BACKEND_ENDPOINT + 'wallets';
    fetch(Url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization':JSON.parse(localStorage.getItem('username') || '{}')
      },
    }).then((res) => {
      return res.json()
    })
      .then((result) => {
        this.setState({ walletData: result.transactions,walletBalance:result.walletBalance});
      })
      .catch(function (error) {
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

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.root}>
          <Typography className="header">
                  Wallet Balance : <span style={{color:this.state.walletBalance >=0 ?'green':'red'}}>${this.state.walletBalance}</span>
          </Typography>
          <MaterialTable tableRef={this.tableRef} style={{ minHeight: 500, margin: 25 }}
            columns={this.state.coldef}
            data={this.state.walletData}
            options= {{
              exportButton: true,
              actionsColumnIndex: -1
            }
            }
            actions={[
              {
                icon: 'add',
                tooltip: 'Add',
                isFreeAction: true,
                onClick: () => this.infoPopupOpen('Add Transaction', true, [])
        
              },
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event: any, rowData: any) => this.infoPopupOpen('Edit Transaction', false, rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event: any, rowData: any) => this.delete_data(rowData)
              },
            ]}
            title="Transactions"
          />
          <ModelPopup title={this.state.popupTitle}
              nopadding={false}
              floatHeader={false}
              body={<AddEditForm isAddForm={this.state.isAddForm} tableRefreshCallback={this.getAllWallets} infoPopupClose={this.infoPopupClose} editData={this.state.isEditData}></AddEditForm>}
              open={this.state.infoPopupToggle}
              closeCallback={this.infoPopupClose}
              parentRef={this.rootRef}></ModelPopup>  
      </div>
    )
  }
}


export default withStyles(styles)(Grid);
