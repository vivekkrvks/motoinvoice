import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "./../../useStyles";
import MySnackbar from "../../../Components/MySnackbar";
import {
	Grid,
	Chip,
	Paper,
	TextField,
	Table,
	TableHead,
	TableRow,
	Tooltip,
	Fab,
	TableCell,
	TableBody,
	TableFooter,
	TablePagination,
	Divider,
    Autocomplete,
} from "@mui/material";
import ImagePreviewDelete from "./../../../Components/Common/ImagePreviewDelete";

import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama, MdLock, MdPublic, MdDeleteForever } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommonDash from "./../../MyDashboard/CommonDash"
import  {Search, StyledInputBase,SearchIconWrapper} from "./../../../Components/Common/SearchBar";
import SearchIcon from '@mui/icons-material/Search';
import allState from "./allState";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const theme = createTheme();

export default function AddInvoice() {
	const classes = useStyles();
	const [id, setId] = useState("");
	
	const [invoiceType, setInvoiceType] = useState(
		{label:"Customer Invoice",value:"customerInvoice"}
	);
    const [customerFirstName, setCustomerFirstName] = useState("");
    const [customerMiddleName, setCustomerMiddleName] = useState("");
    const [customerLastName, setCustomerLastName] = useState("");
    const [customerReferenceName, setCustomerReferenceName] = useState("");
    const [dealerName, setDealerName] = useState("");
    const [purchaseInvoiceDate, setPurchaseInvoiceDate] = useState("");
    const [purchaseInvoiceNumber, setPurchaseInvoiceNumber] = useState("");
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [email, setEmail] = useState("");
    const [gst, setGst] = useState("");
	const [stateDetail, setStateDetail] = useState(
		{state: "", tin: "",stateCode:""}
		);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [customerSecondaryAddress, setCustomerSecondaryAddress] = useState("");
    const [model, setModel] = useState({
        vehicle: "",
        quantity: "",
        code: "",
        amount: "",
        sgst: "",
        cgst: "",
        igst: "",
        roundOff: "",
        discount: "",
        totalAmount: "",
    });
    const [cessAmountOnBasePrice, setCessAmountOnBasePrice] = useState("");
    const [handlingChargesOnBasePrice, setHandlingChargesOnBasePrice] = useState("");
    const [hsn, setHsn] = useState("");
    const [chassisNumber, setChassisNumber] = useState("");
    const [engineNumber, setEngineNumber] = useState("");
    const [color, setColor] = useState("");
    const [battery, setBattery] = useState("");
    const [keyNumber, setKeyNumber] = useState("");
    const [manufacturing, setManufacturing] = useState("");
    const [dueAmount, setDueAmount] = useState("");
    const [invoiceDate, setInvoiceDate] = useState("");
    const [paymentMode, setPaymentMode] = useState("");
    const [financerName, setFinancerName] = useState("");
    const [termsOfDelivery, setTermsOfDelivery] = useState(""); 
    const [accessories, setAccessories] = useState("");
    
        
	const [allData, setAllData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [err] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();
	const [open, setOpen] = useState(false);
	const handleClose = () => {
	  setOpen(false);
	};
	const handleOpen = () => {
	  setOpen(true);
	};
	useEffect(() => {
		console.log(allState)
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleOpen();
		let newCat = { _id: id,  };
		await axios
			.post(`/api/v1/addition/invoice/${id}`, newCat)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				// getData("");
				handleClose()
				if(res.data.variant==="success"){
					handleClear();

				}
			})
			.catch((err) => console.log(err));
	};
	const getData = async (word) => {
	
		await axios
			.get(`/api/v1/addition/category/allcategory/${word}`)
			.then((res) => (setAllData(res.data)))
			.catch((err) => console.log(err));
	};
	const handleClear = () => {
		setId("");
	
	};
	const clearImage = () => { 

		// setImageUrl("");
		// setImageId("");
	}
	const clearLogo = () => {

		// setLogoUrl("");
		// setLogoId("");
	}
	const setData = async (id) => {
		handleOpen();
		await axios
			.get(`/api/v1/addition/invoice/get/${id}`)
			.then((res) => {
				setId(res.data._id);	
				
			})
			.catch((err) => console.log(err));
			handleClose();
	};

	const handleDelete = (id) => {
		axios
			.delete(`/api/v1/addition/invoice/delete/${id}`)
			.then((res) => alert(res.data.message))
			.then(
			)
			.catch((err) => console.log(err));
		handleClear();
	};
	const handleErr = (errIn) => {
		switch (errIn) {
			case "invoiceName":
				// if(title.length  < 10){
				//     setErr({errIn:"mobileNo", msg:"Enter 10 Digits Mobile No."})
				// }else setErr({errIn:"", msg:""})
				break;
			default:
				break;
		}
	};
	return (
		<>
		<CommonDash compo = {
			<Fragment>
		<Grid container>
			<Grid item xs={12} md={8}>
	
				<Paper className={classes.entryArea}>
					
				<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
		<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100vw" }}>
			<Grid container spacing={2}>
					
				<Grid item xs={4}></Grid>
				<Grid item xs={4}>
					<center>
						<Chip color="primary" label="Add Invoice" />
					</center>
				</Grid>
				<Grid item xs={4}></Grid>
                    <Grid item xs={6} md={6}>                              
                         <Autocomplete
			                options={allInvoiceType}
				            filterSelectedOptions
				            getOptionLabel={(option) => option.label}
				            onChange={(e, v) => {
                                 setInvoiceType(v);                            
				            }}
				             value={invoiceType}
                          renderInput={(params) => <TextField {...params} variant="outlined" placeholder="invoiceType" label="invoiceType" />}
                        />
			        </Grid>
					{invoiceType.value === "customerInvoice" && (<><Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("customerFirstName")}
					    	error={err.errIn === "customerFirstName" ? true : false}
					    	label={err.errIn === "customerFirstName" ? err.msg : "customerFirstName "}
					    	placeholder="Enter customerMiddleName .."
					    	value={customerFirstName}
					    	onChange={(e) => setCustomerFirstName(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("customerMiddleName")}
					    	error={err.errIn === "customerMiddleName" ? true : false}
					    	label={err.errIn === "customerMiddleName" ? err.msg : "customerMiddleName "}
					    	placeholder="Enter customerMiddleName .."
					    	value={customerMiddleName}
					    	onChange={(e) => setCustomerMiddleName(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("customerLastName")}
					    	error={err.errIn === "customerLastName" ? true : false}
					    	label={err.errIn === "customerLastName" ? err.msg : "customerLastName "}
					    	placeholder="Enter customerMiddleName .."
					    	value={customerLastName}
					    	onChange={(e) => setCustomerLastName(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("customerReferenceName")}
					    	error={err.errIn === "customerReferenceName" ? true : false}
					    	label={err.errIn === "customerReferenceName" ? err.msg : "customerReferenceName "}
					    	placeholder="Enter customerMiddleName .."
					    	value={customerReferenceName}
					    	onChange={(e) => setCustomerReferenceName(e.target.value)}
					    />
					</Grid></>)}
                    {(invoiceType.value === "otherInvoice" || 
					invoiceType.value === "returnInvoice" ) &&
					(<Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("dealerName")}
					    	error={err.errIn === "dealerName" ? true : false}
					    	label={err.errIn === "dealerName" ? err.msg : "dealerName "}
					    	placeholder="Enter customerMiddleName .."
					    	value={dealerName}
					    	onChange={(e) => setDealerName(e.target.value)}
					    />
					</Grid>)}
                    {invoiceType.value === "returnInvoice" && (<><Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("purchaseInvoiceDate")}
					    	error={err.errIn === "purchaseInvoiceDate" ? true : false}
					    	label={err.errIn === "purchaseInvoiceDate" ? err.msg : "purchaseInvoiceDate "}
					    	placeholder="Enter purchaseInvoiceDate .."
					    	value={purchaseInvoiceDate}
					    	onChange={(e) => setPurchaseInvoiceDate(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("purchaseInvoiceNumber")}
					    	error={err.errIn === "purchaseInvoiceNumber" ? true : false}
					    	label={err.errIn === "purchaseInvoiceNumber" ? err.msg : "purchaseInvoiceNumber "}
					    	placeholder="Enter purchaseInvoiceNumber .."
					    	value={purchaseInvoiceNumber}
					    	onChange={(e) => setPurchaseInvoiceNumber(e.target.value)}
					    />
					</Grid></>)}
					
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("customerPhoneNumber")}
					    	error={err.errIn === "customerPhoneNumber" ? true : false}
					    	label={err.errIn === "customerPhoneNumber" ? err.msg : "customerPhoneNumber "}
					    	placeholder="Enter customerPhoneNumber .."
					    	value={customerPhoneNumber}
					    	onChange={(e) => setCustomerPhoneNumber(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("invoiceNumber")}
					    	error={err.errIn === "invoiceNumber" ? true : false}
					    	label={err.errIn === "invoiceNumber" ? err.msg : "invoiceNumber "}
					    	placeholder="Enter invoiceNumber .."
					    	value={invoiceNumber}
					    	onChange={(e) => setInvoiceNumber(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("email")}
					    	error={err.errIn === "email" ? true : false}
					    	label={err.errIn === "email" ? err.msg : "email "}
					    	placeholder="Enter email .."
					    	value={email}
					    	onChange={(e) => setEmail(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("gst")}
					    	error={err.errIn === "gst" ? true : false}
					    	label={err.errIn === "gst" ? err.msg : "gst "}
					    	placeholder="Enter gst .."
					    	value={gst}
					    	onChange={(e) => setGst(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					<Autocomplete
				isOptionEqualToValue={(option, value) => (option.state === value.state || value.state === "")}
				 getOptionLabel={(option) => option.state}
			    options={allState}
				required
				filterSelectedOptions				
				onChange={(e, v) => {
                    setStateDetail(v);
                 
				}}
				value={stateDetail}
               renderInput={(params) => <TextField {...params} variant="outlined" placeholder="state" label="Select state" />}
              />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("address")}
					    	error={err.errIn === "address" ? true : false}
					    	label={err.errIn === "address" ? err.msg : "Address "}
					    	placeholder="Enter Address .."
					    	value={address}
					    	onChange={(e) => setAddress(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("city")}
					    	error={err.errIn === "city" ? true : false}
					    	label={err.errIn === "city" ? err.msg : "City "}
					    	placeholder="Enter City .."
					    	value={city}
					    	onChange={(e) => setCity(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("pincode")}
					    	error={err.errIn === "pincode" ? true : false}
					    	label={err.errIn === "pincode" ? err.msg : "Pincode "}
					    	placeholder="Enter Pincode .."
					    	value={pincode}
					    	onChange={(e) => setPincode(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("customerSecondaryAddress")}
					    	error={err.errIn === "customerSecondaryAddress" ? true : false}
					    	label={err.errIn === "customerSecondaryAddress" ? err.msg : "Customer Secondary Address "}
					    	placeholder="Enter Customer Secondary Address .."
					    	value={customerSecondaryAddress}
					    	onChange={(e) => setCustomerSecondaryAddress(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("model")}
					    	error={err.errIn === "model" ? true : false}
					    	label={err.errIn === "model" ? err.msg : "model "}
					    	placeholder="Enter model .."
					    	value={model}
					    	onChange={(e) => setModel(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("cessAmountOnBasePrice")}
					    	error={err.errIn === "cessAmountOnBasePrice" ? true : false}
					    	label={err.errIn === "cessAmountOnBasePrice" ? err.msg : "cessAmountOnBasePrice "}
					    	placeholder="Enter cessAmountOnBasePrice .."
					    	value={cessAmountOnBasePrice}
					    	onChange={(e) => setCessAmountOnBasePrice(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("handlingChargesOnBasePrice")}
					    	error={err.errIn === "handlingChargesOnBasePrice" ? true : false}
					    	label={err.errIn === "handlingChargesOnBasePrice" ? err.msg : "handlingChargesOnBasePrice "}
					    	placeholder="Enter handlingChargesOnBasePrice .."
					    	value={handlingChargesOnBasePrice}
					    	onChange={(e) => setHandlingChargesOnBasePrice(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("hsn")}
					    	error={err.errIn === "hsn" ? true : false}
					    	label={err.errIn === "hsn" ? err.msg : "hsn "}
					    	placeholder="Enter hsn .."
					    	value={hsn}
					    	onChange={(e) => setHsn(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("chassisNumber")}
					    	error={err.errIn === "chassisNumber" ? true : false}
					    	label={err.errIn === "chassisNumber" ? err.msg : "chassisNumber "}
					    	placeholder="Enter chassisNumber .."
					    	value={chassisNumber}
					    	onChange={(e) => setChassisNumber(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("engineNumber")}
					    	error={err.errIn === "engineNumber" ? true : false}
					    	label={err.errIn === "engineNumber" ? err.msg : "engineNumber "}
					    	placeholder="Enter engineNumber .."
					    	value={engineNumber}
					    	onChange={(e) => setEngineNumber(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("color")}
					    	error={err.errIn === "color" ? true : false}
					    	label={err.errIn === "color" ? err.msg : "color "}
					    	placeholder="Enter color .."
					    	value={color}
					    	onChange={(e) => setColor(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("battery")}
					    	error={err.errIn === "battery" ? true : false}
					    	label={err.errIn === "battery" ? err.msg : "battery "}
					    	placeholder="Enter battery .."
					    	value={battery}
					    	onChange={(e) => setBattery(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("keyNumber")}
					    	error={err.errIn === "keyNumber" ? true : false}
					    	label={err.errIn === "keyNumber" ? err.msg : "keyNumber "}
					    	placeholder="Enter keyNumber .."
					    	value={keyNumber}
					    	onChange={(e) => setKeyNumber(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("manufacturing")}
					    	error={err.errIn === "manufacturing" ? true : false}
					    	label={err.errIn === "manufacturing" ? err.msg : "manufacturing "}
					    	placeholder="Enter manufacturing .."
					    	value={manufacturing}
					    	onChange={(e) => setManufacturing(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("dueAmount")}
					    	error={err.errIn === "dueAmount" ? true : false}
					    	label={err.errIn === "dueAmount" ? err.msg : "dueAmount "}
					    	placeholder="Enter dueAmount .."
					    	value={dueAmount}
					    	onChange={(e) => setDueAmount(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("invoiceDate")}
					    	error={err.errIn === "invoiceDate" ? true : false}
					    	label={err.errIn === "invoiceDate" ? err.msg : "invoiceDate "}
					    	placeholder="Enter invoiceDate .."
					    	value={invoiceDate}
					    	onChange={(e) => setInvoiceDate(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("paymentMode")}
					    	error={err.errIn === "paymentMode" ? true : false}
					    	label={err.errIn === "paymentMode" ? err.msg : "paymentMode "}
					    	placeholder="Enter paymentMode .."
					    	value={paymentMode}
					    	onChange={(e) => setPaymentMode(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("financerName")}
					    	error={err.errIn === "financerName" ? true : false}
					    	label={err.errIn === "financerName" ? err.msg : "financerName "}
					    	placeholder="Enter financerName .."
					    	value={financerName}
					    	onChange={(e) => setFinancerName(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("termsOfDelivery")}
					    	error={err.errIn === "termsOfDelivery" ? true : false}
					    	label={err.errIn === "termsOfDelivery" ? err.msg : "termsOfDelivery "}
					    	placeholder="Enter termsOfDelivery .."
					    	value={termsOfDelivery}
					    	onChange={(e) => setTermsOfDelivery(e.target.value)}
					    />
					</Grid>
                    <Grid item xs={6}>
					    <TextField
					    	variant="outlined"
					    	fullWidth
					    	onBlur={() => handleErr("accessories")}
					    	error={err.errIn === "accessories" ? true : false}
					    	label={err.errIn === "accessories" ? err.msg : "accessories "}
					    	placeholder="Enter accessories .."
					    	value={accessories}
					    	onChange={(e) => setAccessories(e.target.value)}
					    />
					</Grid>             
							<Grid item xs={12}>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								<center>
									<Tooltip title={id === "" ? "Save" : "Update"}>
										<Fab color="primary" type="submit" className={classes.button}>
											<MdDoneAll />
										</Fab>
									</Tooltip>
									<Tooltip title="Clear All">
										<Fab size="small" color="secondary" onClick={() => handleClear()} className={classes.button}>
											<MdClearAll />
										</Fab>
									</Tooltip>
									{id !== "" && (
											<Tooltip title="Delete Forever">
												<Fab size="small" color="secondary" onClick={() => handleDelete(id)} className={classes.button}>
													<MdDeleteForever />
												</Fab>
											</Tooltip>
										)}
						
								</center>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Grid>
			<Grid item xs={12} md={4} style={{position: "sticky",top: "0",}} >
				{/* Search Section */}
				<div className={classes.search}>
				<Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder= {`Search Invoice...`}
			  onChange={(e) => getData(e.target.value)}
			   
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
				{/* <SearchBar name={ "Invoice"}  onChange={(e) => getData(e.target.value)} /> */}
				
				</div>
				<div className={classes.searchResult}>
					<Paper>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell component="th" scope="row">
										Search Results
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{allData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
									<TableRow key={data._id} onClick={() => setData(data._id)} hover>
										<TableCell component="td" scope="row">
											Name : {data.invoiceName} ; Description : {data.description} <br />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										count={allData.length}
										rowsPerPage={rowsPerPage}
										page={page}
										onChangePage={(e, page) => setPage(page)}
										onChangeRowsPerPage={(r) => setRowsPerPage(r.target.value)}
									/>
								</TableRow>
							</TableFooter>
						</Table>
					</Paper>
				</div>
			</Grid>
		</Grid>
		<MySnackbar ref={snackRef} />
	</Fragment>

		} />
		</>
		
	
	);
}
  
const allInvoiceType = [
	{label:"Customer Invoice",value:"customerInvoice"},
	{label:"Invoice to Others",value:"otherInvoice"},
	{label:"Return Invoice",value:"returnInvoice"},
]

const sampleData = [
	{label: "Sample 1", id: "withPrefix"},
	{label: "Sample 2", id: "withoutPrefix"},
	{label: "Sample 3", id: "manual"},
	// withPrefix, withoutPrefix, manual
 
];