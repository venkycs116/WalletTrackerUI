import React, { Component } from "react";
import { InputAdornment, Paper, WithStyles, createStyles, withStyles, Button, Grid } from "@material-ui/core";
import ThemeColors from "./ThemeColors";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ToastContainer, toast } from 'react-toastify';
import GetRemFontSize, { GetLineHeightUnitless } from "utils/FontCalculation";
const styles = createStyles({
    root: {
        backgroundColor: ThemeColors.White,
        boxShadow: 'none',
        '& .MuiTextField-root': {
            width: 300,
            marginRight: 20,
            marginBottom: 20,
        },
        '& .savebtn': {
            margin: '0px 50px 0px 24px',
            fontSize: GetRemFontSize(14),
            lineHeight: GetLineHeightUnitless(18, 14),
            fontWeight: 500,
            height: 45,
            width: 100,
            borderRadius: 2,
            color: '#fff',
            textTransform: 'capitalize',
            backgroundColor: '#0093ed',
        }

    }
});

interface IProps extends WithStyles<typeof styles> {
    isAddForm?: any;
    editData?: any,
    infoPopupClose?: any,
    tableRefreshCallback?: any
}

interface IState {
    description: string,
    date: any,
    income: number,
    expense: number,
    id: number,
    isincomedisable: boolean,
    isexpensedisable: boolean,


}
type Props = IProps;

class AddEditForm extends Component<Props, IState> {
    rootRef: any;
    tableRefreshCallback: any;
    constructor(props: Props) {
        super(props);
        this.state = {
            description: '',
            date: new Date().toISOString().substring(0, 10),
            income: 0,
            expense: 0,
            id: 0,
            isincomedisable: false,
            isexpensedisable: false,
        }
    }


    componentDidMount() {
        if (!this.props.isAddForm) {
            this.setState({
                description: this.props.editData.description,
                date: this.props.editData.date,
                income: this.props.editData.income,
                expense: this.props.editData.expense,
                id: this.props.editData.id,
                isexpensedisable: this.props.editData.income !==0 ? true : false,
                isincomedisable: this.props.editData.expense !==0 ? true : false

            });

        }
    }

    handleChange = (event: any, type: string) => {
        switch (type) {
            case "Description":
                this.setState({ description: event.target.value });
                break;
            case "Date":
                this.setState({ date: event.target.value });
                break;
            case "Income":
                this.setState({ income: parseInt(event.target.value), isexpensedisable: parseInt(event.target.value) !== 0 ? true : false, isincomedisable: false });
                break;
            case "Expense":
                this.setState({ expense: parseInt(event.target.value), isincomedisable: parseInt(event.target.value) !== 0 ? true : false, isexpensedisable: false });
                break;
        }

    }

    handleSubmit = () => {
        var Url = this.props.isAddForm ? process.env.REACT_APP_BACKEND_ENDPOINT + 'wallets' : process.env.REACT_APP_BACKEND_ENDPOINT + 'wallet/' + this.state.id;
        var method = this.props.isAddForm ? 'POST' : 'PUT';
        fetch(Url,{
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':JSON.parse(localStorage.getItem('username') || '{}')
            },
            body: JSON.stringify({
                description: this.state.description,
                date: this.state.date,
                income: this.state.income,
                expense: this.state.expense,
            })
        }).then((response) => {
            this.props.infoPopupClose();
            if (this.props.tableRefreshCallback != null ){
                this.props.tableRefreshCallback();
             }
            toast.success(this.props.isAddForm ? 'Added Successfuly' : 'Updated Successfuly', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,  
            });
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
            <Paper className={classes.root}>
               
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                    onError={(errors: any) => console.log(errors)}>
                    <Grid container spacing={1} style={{ margin: 10 }} direction="row" justify="center" alignItems="center" >
                        <TextValidator
                            label="Description"
                            onChange={(e: any) => this.handleChange(e, 'Description')}
                            name="text"
                            value={this.state.description}
                            variant="outlined"
                            validators={['required']}
                            errorMessages={['Description is required']}
                        />
                        <TextValidator
                            label="Date"
                            onChange={(e: any) => this.handleChange(e, 'Date')}
                            name="date"
                            placeholder="dd/mm/yyyy"
                            type="date"
                            value={this.state.date}
                            variant="outlined"
                            validators={['required']}
                            errorMessages={['Date is required']}
                        />
                    </Grid>
                    <Grid container spacing={1} style={{ margin: 10 }} direction="row" justify="center" alignItems="center">
                        <TextValidator
                            label="Income"
                            onChange={(e: any) => this.handleChange(e, 'Income')}
                            name="number"
                            type="number"
                            disabled={this.state.isincomedisable}
                            value={this.state.income}
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            validators={['required']}
                            errorMessages={['Income is required']}
                        />
                        <TextValidator
                            label="Expense"
                            onChange={(e: any) => this.handleChange(e, 'Expense')}
                            name="number"
                            type="number"
                            value={this.state.expense}
                            disabled={this.state.isexpensedisable}
                            variant="outlined"
                            validators={['required']}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            errorMessages={['Expense is required']}
                        />
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Button type="submit"
                                variant="contained"
                                size="small"
                                className="savebtn">
                                Submit
                           </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => this.props.infoPopupClose()}
                                style={{ color: '#0a2a69', backgroundColor: '#fff' }}
                                variant="outlined"
                                size="small"
                                className="savebtn">
                                 Cancel
                          </Button>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </Paper>
        );
    }
}
export default withStyles(styles)(AddEditForm);