import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "../useStyles";
import MySnackbar from "../../Components/MySnackbar";
import {
	Grid,
	Chip,
	Paper,
	TextField,
	Tooltip,
	Fab,
	Divider,
  Autocomplete,
  IconButton,
  Button,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { MdDoneAll } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommonDash from "./../MyDashboard/CommonDash"
import CachedIcon from '@mui/icons-material/Cached';
import allState from "./allState";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Checkbox from '@mui/material/Checkbox';
const theme = createTheme();

export default function AddCompanyProfile() {


	const classes = useStyles();
	const [dataId, setDataId] = useState("");
    const [firmName, setFirmName] = useState("");
    const [dealerCode, setDealerCode] = useState("");
    const [companyGstNo, setCompanyGstNo] = useState("");
    const [pMobileNumber, setPMobileNumber] = useState("");
    const [sMobileNumber, setSMobileNumber] = useState("");
    const [stateDetail, setStateDetail] = useState(
		{state: "", tin: "",stateCode:""}
		);

    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [logoUrl, setLogoUrl] = useState("");
	const [logoId, setLogoId] = useState("");
    const [invoicePrefixType, setInvoicePrefixType] = useState(
		{label: "With Prefix (auto generated)", id: "withPrefix"}
	);
    const [invoicePrefix, setInvoicePrefix] = useState("");
    const [firstInvoiceNo, setFirstInvoiceNo] = useState("");
    const [needForm21, setNeedForm21] = useState(true);
    const [needCustomerSign, setNeedCustomerSign] = useState(false);
    const [needProfomaInvoice, setNeedProfomaInvoice] = useState(true);
    const [tradeCertificateNo, setTradeCertificateNo] = useState("");
    // Delar Info
	const [needDealerInfo, setNeedDealerInfo] = useState(false);
    const [dealerName, setDealerName] = useState("");
    const [dealerAddress, setDealerAddress] = useState("");
	const [dealerState, setDealerState] = useState(
		{state: "", tin: "",stateCode:""}
		);
    const [dealerCity, setDealerCity] = useState("");
    const [dealerPincode, setDealerPincode] = useState("");
    const [dealerMobileNo, setDealerMobileNo] = useState("");
    const [needDeOnF20, setNeedDeOnF20] = useState(false);
    const [needDeOnF21, setNeedDeOnF21] = useState(false);
    const [dealerTradeCertificateNo, setDealerTradeCertificateNo] = useState("");
    


	const [status, setStatus] = useState("Click the button");
	const [err] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();
	useEffect(() => {
		getData("");
	}, []);
	const handleChange=(value,name,type)=>{
		if(type==="text"){
		   var re = /^[A-Za-z_ ]*$/;
		   if (value === '' || re.test(value)) {
			  switch (name) {
				 case "firmName":
					setFirmName(value)
					break;				
                    case "dealerCode":
                    setDealerCode(value)
                    break;
                    case "companyGstNo":
                    setCompanyGstNo(value)
                    break;
                  
                    case "state":
                    setStateDetail(value)
                    break;
                    case "city":
                    setCity(value)
                    break;
                    case "address":
                    setAddress(value)
                    break;
                                     
                    case "invoicePrefixType":
                    setInvoicePrefixType(value)
                    break;
                    case "invoicePrefix":
                    setInvoicePrefix(value)
                    break;                 
                    case "tradeCertificateNo":
                    setTradeCertificateNo(value)
                    break;
                
                    case "dealerName":
                    setDealerName(value)
                    break;
                    case "dealerAddress":
                    setDealerAddress(value)
                    break;
                    case "dealerState":
                    setDealerState(value)
                    break;
                    case "dealerCity":
                    setDealerCity(value)
                    break;  
                    case "dealerTradeCertificateNo":
                    setDealerTradeCertificateNo(value)
                    break;                  
				
				
				 default:
					break;
			  }
		   }
  
		}else if(type==="number"){
		   const re = /^[0-9\b]+$/;
		   if (value === '' || re.test(value)) {
			 switch (name) {
				case "pincode":
                    setPincode(value)
                    break;
				   case "pMobileNumber":
                    setPMobileNumber(value)
                    break;
                    case "sMobileNumber":
                    setSMobileNumber(value)
                    break;
					case "firstInvoiceNo":
					setFirstInvoiceNo(value)
					break;
					case "dealerPincode":
					setDealerPincode(value)
					break;
					case "dealerMobileNo":
					setDealerMobileNo(value)
					break;
				default:
				   break;
			 }
		   }
		}
	   
	}
	
	const getData = async () => {

	
		await axios
			.get(`/api/v1/profile/addCompanyProfile/getProfile`,config)
			.then((res) => (setComProfile(res.data)))
			.catch((err) => console.log(err));
	};

	const setComProfile=(data)=>{ 
		setDataId(data._id)
		setFirmName(data.firmName)
		setDealerCode(data.dealerCode)
		setCompanyGstNo(data.companyGstNo)
		setPMobileNumber(data.pMobileNumber)
		setSMobileNumber(data.sMobileNumber)
		if(data.stateDetail)setStateDetail(data.stateDetail)
		setCity(data.city)
		setAddress(data.address)
		setPincode(data.pincode)
		if(data.logo){
		setLogoUrl(data.logo.url)
		setLogoId(data.logo.publicId)}
		if(data.invoicePrefixType)setInvoicePrefixType(data.invoicePrefixType)
		setInvoicePrefix(data.invoicePrefix)
		setFirstInvoiceNo(data.firstInvoiceNo)
		setNeedForm21(data.needForm21)
		setNeedCustomerSign(data.needCustomerSign)
		setNeedProfomaInvoice(data.needProfomaInvoice)
		setTradeCertificateNo(data.tradeCertificateNo)
		setNeedDealerInfo(data.needDealerInfo)
		setDealerName(data.dealerName)
		setDealerAddress(data.dealerAddress)
		if(data.dealerState)setDealerState(data.dealerState)
		setDealerCity(data.dealerCity)
		setDealerPincode(data.dealerPincode)
		setDealerMobileNo(data.dealerMobileNo)
		setNeedDeOnF20(data.needDeOnF20)
		setNeedDeOnF21(data.needDeOnF21)
		setDealerTradeCertificateNo(data.dealerTradeCertificateNo)
		
	}
	const handleSubmit = async (e) => {
		console.log("submi");
		e.preventDefault();
		let allData = { _id: dataId, firmName, dealerCode, companyGstNo,
			 pMobileNumber, sMobileNumber, stateDetail, city, address,
			pincode, logoUrl, logoId, invoicePrefixType, invoicePrefix,
		firstInvoiceNo, needForm21, needCustomerSign, needProfomaInvoice,
		 tradeCertificateNo, needDealerInfo, dealerName, dealerAddress,
		  dealerState, dealerCity, dealerPincode, dealerMobileNo,
		   needDeOnF20, needDeOnF21, dealerTradeCertificateNo 		
		};
		await axios
			.post(`/api/v1/profile/addCompanyProfile/`, allData,config)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
			})
			.catch((err) => console.log(err));
	};
	const handleErr = (errIn) => {
		switch (errIn) {
			case "title":
				// if(title.length  < 10){
				//     setErr({errIn:"mobileNo", msg:"Enter 10 Digits Mobile No."})
				// }else setErr({errIn:"", msg:""})
				break;
			default:
				break;
		}
	};
    const handleImageUpdate = async () => {
		// /api/v1/profile/addCompanyProfile/updateImage/:id
		console.log({dataId});
		
		if(dataId){
			let newUpdate = { dataId: dataId, logoUrl:"",logoId:""};
			await axios
				.post(`/api/v1/profile/addCompanyProfile/updateImage/${dataId}`, newUpdate,config)
				.then((res) => {
					snackRef.current.handleSnack(res.data);
					setLogoUrl("");
					setLogoId("")
				})
				.catch((err) => console.log(err));
		}else {
			setLogoUrl("");
					setLogoId("")
		}
	
	};
    const imgUpload = async (e, name) => {
		console.log("imgUpload");
		if (e) {
			const selectedFile = e;
			const imgData = new FormData();
			imgData.append("photo", selectedFile, selectedFile.name);
			let link = `/api/v1/other/fileUpload/mainfolder/nofolderName`
			if(name === "companyLogo"){
				link = `/api/v1/other/fileUpload/mainfolder/companyLogo`
			}
			
				await axios
					.post(link, imgData, {
						headers: {
							accept: "application/json",
							"Accept-Language": "en-US,en;q=0.8",
							"Content-Type": `multipart/form-data; boundary=${imgData._boundary}`,
						},
					})
					.then((res) => {
						 if (name === "companyLogo") {
							setLogoUrl(res.data.result.secure_url)
							setLogoId(res.data.result.public_id)
						}
					
					})
					.catch((err) => console.log(err));
			
		}
	};
    const deleteImage = async (logoId) => {
		console.log(logoId)
		await axios
		.post(`/api/v1/other/fileupload/delete`, {logoId},config)
		.then((res) => {
			console.log(res.data)
			if(res.data.variant==="success"){
				
                handleImageUpdate()
				 
				}	

		})
		.catch((err) => console.log(err));
};
	return (
		<>
		<CommonDash compo = {
			<Fragment>
		<Grid container>
			<Grid item xs={0} md={1}> </Grid>
	
			<Grid item xs={12} md={10}>
				<Paper className={classes.entryArea}>
					<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100vw" }}>
						<Grid container spacing={2}>
							
							<Grid item xs={12} style={{display:"flex",alignItems:"center",}}>
						
							
							<span style={{flexGrow:1.1}}/>
								
									<Chip color="primary" label= "Firm / Company Details"  />
									<span style={{flexGrow:1}}/>
									
									<IconButton onClick={()=>getData()} color="primary" href="/AddCompanyProfile"  rel="noopener noreferrer">
									<CachedIcon />

  									</IconButton>
								
								<span style={{flexGrow:0.1}}/>
							


							</Grid>
             <Grid item xs={12} md={6}>  
				<TextField
					variant="outlined"
					focused 
					required
					fullWidth
					inputProps={{ maxLength: "42" }}
					onBlur={() => handleErr("firmName")}
					error={err.errIn === "firmName" ? true : false}
					label={err.errIn === "firmName" ? err.msg : "Firm Name"}
					placeholder="Enter Firm Name*..."
					value={firmName}
					onChange={(e) => handleChange(e.target.value,"firmName","text") }
				/>
			</Grid>
             <Grid item xs={12} md={6}>  
				<TextField
					variant="outlined"
					focused 
					required
					fullWidth
					inputProps={{ maxLength: "42" }}
					onBlur={() => handleErr("dealerCode")}
					error={err.errIn === "dealerCode" ? true : false}
					label={err.errIn === "dealerCode" ? err.msg : "Dealer Code"}
					placeholder="Enter Dealer Code*..."
					value={dealerCode}
					onChange={(e) => handleChange(e.target.value,"dealerCode","text") }
				/>
			</Grid>
             <Grid item xs={12} md={6}>  
				<TextField
					focused 
					variant="filled"
					color="success"
					helperText="You can't change this"
					required
					disabled
					fullWidth
					inputProps={{  readOnly: true,maxLength: "20" }}
					onBlur={() => handleErr("companyGstNo")}
					error={err.errIn === "companyGstNo" ? true : false}
					label={err.errIn === "companyGstNo" ? err.msg : "Firm Gst Number(Can't be changed)"}
					placeholder="Enter Gst Number..."
					value={companyGstNo}
					onChange={(e) => handleChange(e.target.value,"companyGstNo","text") }
				/>
			</Grid>
             <Grid item xs={12} md={6}>  
				<TextField
					variant="filled"
					color="success"
					helperText="You can't change this"
					required
					disabled
					fullWidth
					inputProps={{  readOnly: true,maxLength: "10" }}
					onBlur={() => handleErr("pMobileNumber")}
					error={err.errIn === "pMobileNumber" ? true : false}
					label={err.errIn === "pMobileNumber" ? err.msg : "Primary Mobile Number(Can't be changed)"}
					placeholder="Enter Primary Mobile Number..."
					value={pMobileNumber}
					onChange={(e) => handleChange(e.target.value,"pMobileNumber","number") }
				/>
			</Grid>
             <Grid item xs={12} md={6}>  
				<TextField
					variant="outlined"
					focused 
					fullWidth
					inputProps={{ maxLength: "10" }}
					onBlur={() => handleErr("sMobileNumber")}
					error={err.errIn === "sMobileNumber" ? true : false}
					label={err.errIn === "sMobileNumber" ? err.msg : "Secondary Mobile Number"}
					placeholder="Enter Secondary Mobile Number..."
					value={sMobileNumber}
					onChange={(e) => handleChange(e.target.value,"sMobileNumber","number") }
				/>
			</Grid>
             <Grid item xs={12} md={6}>  
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
             <Grid item xs={6} md={3}>  
             <TextField
                disabled
                id="filled-disabled"
                label="tin"
                value={stateDetail?.tin}
                variant="filled"
        />
			</Grid>
             <Grid item xs={6} md={3}>  
             <TextField
                disabled
                id="filled-disabled"
                label="stateCode"
                 value={stateDetail?.stateCode}
                variant="filled"
        />
			</Grid>
             <Grid item xs={12} md={6}>  
				<TextField
					variant="outlined"
					focused 
					required
					fullWidth
					inputProps={{ maxLength: "42" }}
					onBlur={() => handleErr("city")}
					error={err.errIn === "city" ? true : false}
					label={err.errIn === "city" ? err.msg : "City"}
					placeholder="Enter City..."
					value={city}
					onChange={(e) => handleChange(e.target.value,"city","text") }
				/>
			</Grid>
             <Grid item xs={12} md={6}>  
				<TextField
					variant="outlined"
					focused 
					required
					fullWidth
					inputProps={{ maxLength: "100" }}
					onBlur={() => handleErr("address")}
					error={err.errIn === "address" ? true : false}
					label={err.errIn === "address" ? err.msg : "Address"}
					placeholder="Enter Address..."
					value={address}
					onChange={(e) => handleChange(e.target.value,"address","text") }
				/>
			</Grid>
             <Grid item xs={12} md={6}>  
				<TextField
					variant="outlined"
					focused 
					required
					fullWidth
					inputProps={{ maxLength: "6" }}
					onBlur={() => handleErr("pincode")}
					error={err.errIn === "pincode" ? true : false}
					label={err.errIn === "pincode" ? err.msg : "Pincode"}
					placeholder="Enter Pincode..."
					value={pincode}
					onChange={(e) => handleChange(e.target.value,"pincode","number") }
				/>
			</Grid>
            <Grid item xs={12} md={6}>
		{(logoUrl !== "" && logoUrl !== null) && (
            
            <Grid container spacing={0.25}>
                    <Grid item xs={7}>
                        <Button 
                        href={logoUrl} target="_blank"
                        variant="contained" 
                        color="success" 
                        endIcon={<SendIcon />}>
                         {"Logo"}
                        </Button>
                    </Grid>
                    <Grid item xs={5} >
                        <Button 
                        variant="outlined" 
                        onClick={()=>deleteImage(logoId)}
                        startIcon={<DeleteIcon/>}>
                        Delete
                        </Button>
                    </Grid>
            </Grid>
            
		)} 
		{
			(logoUrl === "" || logoUrl === null)  && (
				<TextField
				// required
					variant="outlined"
					type="file"
					InputLabelProps={{ shrink: true }}
					inputProps={{ accept: "image/png" }}
					fullWidth
					onBlur={() => handleErr("logo")}
					error={err.errIn === "logo" ? true : false}
					label={err.errIn === "logo" ? err.msg : "Logo (PNG Only)"}
					onChange={(e) =>  imgUpload(e.target.files[0],"companyLogo")}
				/> 
			)
		}			
	  						</Grid>
							  <Grid item xs={0} md={6}> 
							  	</Grid>
							  <Grid item xs={12} md={6}>  
             <Autocomplete
			 isOptionEqualToValue={(option, value) => (option.label === value.label || value.label === "")}
			    options={allInvoicePrefixType}
				filterSelectedOptions
				getOptionLabel={(option) => option.label}
				onChange={(e, v) => {
                    setInvoicePrefixType(v);
                 
				}}
				value={invoicePrefixType}
               renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Invoice Prefix Type" label="How do you need Invoice Numbers?" />}
              />
			</Grid>
			{ invoicePrefixType.id !== "withPrefix" && invoicePrefixType.id !== "withoutPrefix" && (
				<Grid item xs={0} md={6}> </Grid>
			)}
             { invoicePrefixType.id === "withPrefix" && (<Grid item xs={12} md={6}>  
				<TextField
					variant="outlined"
					color="secondary"
					focused 
					required
					fullWidth
					inputProps={{ maxLength: "10" }}
					onBlur={() => handleErr("invoicePrefix")}
					error={err.errIn === "invoicePrefix" ? true : false}
					label={err.errIn === "invoicePrefix" ? err.msg : "Invoice Prefix (Max Length: 10)"}
					placeholder="Eg: For XYZ India Pvt. Ltd. - XIPT or Dealer Code - A12345 (Max Length: 10)"
					value={invoicePrefix}
					onChange={(e) => handleChange(e.target.value,"invoicePrefix","text") }
				/>
			</Grid>)}
			{invoicePrefixType.id === "withoutPrefix" && (
             <Grid item xs={12} md={6}>  
				<TextField
					variant="outlined"
					color="secondary"
					focused 
					required
					fullWidth
					inputProps={{ maxLength: "17" }}
					onBlur={() => handleErr("firstInvoiceNo")}
					error={err.errIn === "firstInvoiceNo" ? true : false}
					label={err.errIn === "firstInvoiceNo" ? err.msg : "First Invoice No"}
					placeholder="Enter your 1st Invoice Number to be generated*"
					value={firstInvoiceNo}
					onChange={(e) => handleChange(e.target.value,"firstInvoiceNo","number") }
				/>
			</Grid>)}
             <Grid item xs={12} md={6}>
			 <FormControlLabel 

			 control={
			 <Checkbox
			 checked={needForm21}
			 onChange={(e) =>setNeedForm21(e.target.checked)
			
			}
			 inputProps={{ 'aria-label': 'controlled' }}
			  />
			 } 
			 label="Need FORM21 (Sale Certificate)?"
			 />
		
			</Grid>
			{needForm21 &&(<Grid item xs={12} md={6}>  
				<TextField
					variant="outlined"
					required
					focused
					color="secondary"
					fullWidth
					inputProps={{ maxLength: "42" }}
					onBlur={() => handleErr("tradeCertificateNo")}
					error={err.errIn === "tradeCertificateNo" ? true : false}
					label={err.errIn === "tradeCertificateNo" ? err.msg : "Trade Certificate Number"}
					placeholder="Enter Trade Certificate Number*..."
					value={tradeCertificateNo}
					onChange={(e) => handleChange(e.target.value,"tradeCertificateNo","text") }
				/>
			</Grid>)}
             <Grid item xs={12} md={6}>
			 <FormControlLabel 

			 control={
			 <Checkbox
			 checked={needCustomerSign}
			 onChange={(e) => setNeedCustomerSign(e.target.checked)
			
			}
			 inputProps={{ 'aria-label': 'controlled' }}
			  />
			 } 
			 label="Need Customer Signature on Invoice?"
			 />
		
			</Grid>
             <Grid item xs={12} md={6}>
			 <FormControlLabel 

			 control={
			 <Checkbox
			 checked={needProfomaInvoice}
			 onChange={(e) => setNeedProfomaInvoice(e.target.checked)
			
			}
			 inputProps={{ 'aria-label': 'controlled' }}
			  />
			 } 
			 label="Need Proforma Invoice/Challan?"
			 />
		
			</Grid>
    
			<Grid item xs={12} md={6}>
			 <FormControlLabel 

			 control={
			 <Checkbox
			 checked={needDealerInfo}
			 onChange={(e) => setNeedDealerInfo(e.target.checked)
			
			}
			 inputProps={{ 'aria-label': 'controlled' }}
			  />
			 } 
			 label="Do you want Dealer Details in any Document?"
			 />
		
			</Grid>
        {needDealerInfo  &&(   <> 
             <Grid item xs={12} md={6}>  
				<TextField
					variant="outlined"
					focused 
					required
					fullWidth
					inputProps={{ maxLength: "42" }}
					onBlur={() => handleErr("dealerName")}
					error={err.errIn === "dealerName" ? true : false}
					label={err.errIn === "dealerName" ? err.msg : "Dealer Name"}
					placeholder="Enter Dealer Name..."
					value={dealerName}
					onChange={(e) => handleChange(e.target.value,"dealerName","text") }
				/>
			</Grid>
			<Grid item xs={12} md={6}>  
				<TextField
					variant="outlined"
					focused 
					required
					fullWidth
					inputProps={{ maxLength: "100" }}
					onBlur={() => handleErr("dealerAddress")}
					error={err.errIn === "dealerAddress" ? true : false}
					label={err.errIn === "dealerAddress" ? err.msg : "Dealer Address"}
					placeholder="Enter Dealer Address*..."
					value={dealerAddress}
					onChange={(e) => handleChange(e.target.value,"dealerAddress","text") }
				/>
			</Grid>  
			<Grid item xs={12} md={6}>  
             <Autocomplete
			 isOptionEqualToValue={(option, value) => (option.state === value.state || value.state === "")}
			    options={allState}
				filterSelectedOptions
				getOptionLabel={(option) => option.state}
				onChange={(e, v) => {
                    setDealerState(v);
                 
				}}
				value={dealerState}
               renderInput={(params) => <TextField {...params} variant="outlined" placeholder="state" label="Select Dealer State" />}
              />
			</Grid>
                   
             <Grid item xs={12} md={6}>  
				<TextField
					variant="outlined"
					focused 
					required
					fullWidth
					inputProps={{ maxLength: "42" }}
					onBlur={() => handleErr("dealerCity")}
					error={err.errIn === "dealerCity" ? true : false}
					label={err.errIn === "dealerCity" ? err.msg : "Dealer City"}
					placeholder="Enter Dealer City*..."
					value={dealerCity}
					onChange={(e) => handleChange(e.target.value,"dealerCity","text") }
				/>
			</Grid>
             <Grid item xs={12} md={6}>  
				<TextField
					variant="outlined"
					focused 
					required
					fullWidth
					inputProps={{ maxLength: "6" }}
					onBlur={() => handleErr("dealerPincode")}
					error={err.errIn === "dealerPincode" ? true : false}
					label={err.errIn === "dealerPincode" ? err.msg : "Dealer Pincode"}
					placeholder="Enter Dealer Pincode*..."
					value={dealerPincode}
					onChange={(e) => handleChange(e.target.value,"dealerPincode","number") }
				/>
			</Grid>
             <Grid item xs={12} md={6}>  
				<TextField
					variant="outlined"
					focused 
					required
					fullWidth
					inputProps={{ maxLength: "10" }}
					onBlur={() => handleErr("dealerMobileNo")}
					error={err.errIn === "dealerMobileNo" ? true : false}
					label={err.errIn === "dealerMobileNo" ? err.msg : "Dealer Mobile No"}
					placeholder="Enter Dealer Phone Number*..."
					value={dealerMobileNo}
					onChange={(e) => handleChange(e.target.value,"dealerMobileNo","number") }
				/>				
			</Grid>
			<Grid item xs={12} md={6}>
			 <FormControlLabel 

			 control={
			 <Checkbox
			 checked={needDeOnF20}
			 onChange={(e) =>setNeedDeOnF20(e.target.checked)
			
			}
			 inputProps={{ 'aria-label': 'controlled' }}
			  />
			 } 
			 label=" Need Dealer Info on Form-20 ?"
			 />
		
			</Grid>
			<Grid item xs={12} md={6}>
			 <FormControlLabel 

			 control={
			 <Checkbox
			 checked={needDeOnF21}
			 onChange={(e) =>setNeedDeOnF21(e.target.checked)
	
			}
			 inputProps={{ 'aria-label': 'controlled' }}
			  />
			 } 
			 label="Need Dealer Info on Form-21 ?"
			 />
		
			</Grid>           
             
			</>)}
			{ needDeOnF21 &&
				(
					<Grid item xs={12} md={6}>  
				<TextField
					variant="outlined"
					color="secondary"
					focused 
					required
					fullWidth
					inputProps={{ maxLength: "42" }}
					onBlur={() => handleErr("dealerTradeCertificateNo")}
					error={err.errIn === "dealerTradeCertificateNo" ? true : false}
					label={err.errIn === "dealerTradeCertificateNo" ? err.msg : "Dealer Trade Certificate No"}
					placeholder="Dealer Trade Certificate Number*"
					value={dealerTradeCertificateNo}
					onChange={(e) => handleChange(e.target.value,"dealerTradeCertificateNo","text") }
				/>
			</Grid>
				)
			}
             

              
						
							<Grid item xs={12}>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								<center>
						
								 <Tooltip title={dataId === "" ? "Save" : "Update"}>
										<Fab variant="extended" color="primary" type="submit" className={classes.button}>
											<MdDoneAll />
											{dataId === "" ? "Save" : "Update"}
										</Fab>
									</Tooltip> 
																					
															
								</center>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Grid>
			
			<Grid item xs={0} md={1}> </Grid>

		</Grid>
		<MySnackbar ref={snackRef} />
	</Fragment>

		} />
		</>
		
	
	);
}

const allInvoicePrefixType = [
	{label: "With Prefix (auto generated)", id: "withPrefix"},
	{label: "Without Prefix (auto generated)", id: "withoutPrefix"},
	{label: "Manual (type your own)", id: "manual"},
	// withPrefix, withoutPrefix, manual
 
];
const raw = localStorage.getItem("data")
const payload= JSON.parse(raw)
const config = {
	headers:{
		"Authorization": payload.token,
		"Content-Type": "application/json",
	}
  };