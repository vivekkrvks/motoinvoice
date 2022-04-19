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
} from "@mui/material";
import ImagePreviewDelete from "./../../../Components/Common/ImagePreviewDelete";

import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama, MdLock, MdPublic, MdDeleteForever } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommonDash from "./../../MyDashboard/CommonDash"
import  {Search, StyledInputBase,SearchIconWrapper} from "./../../../Components/Common/SearchBar";
import SearchIcon from '@mui/icons-material/Search';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const theme = createTheme();

export default function AddBikeModels() {
	const classes = useStyles();
	const [id, setId] = useState("");
    const [vehicleName, setVehicleName] = useState("");
    const [modelCode, setModelCode] = useState("");
    const [makersName, setMakersName] = useState("");
    const [classOfVehicle, setClassOfVehicle] = useState("");
    const [basePrice, setBasePrice] = useState("");
    const [sgst, setSgst] = useState("");
    const [cgst, setCgst] = useState("");
    const [exShowroomPrice, setExShowroomPrice] = useState("");
    const [fuelUsed, setFuelUsed] = useState("");
    const [horsePower, setHorsePower] = useState("");
    const [noOfCylinders, setNoOfCylinders] = useState("");
    const [cubicCapacity, setCubicCapacity] = useState("");
    const [seatingCapacity, setSeatingCapacity] = useState("");
    const [unladenWeight, setUnladenWeight] = useState("");
    const [frontAxle, setFrontAxle] = useState("");
    const [rearAxle, setRearAxle] = useState("");
    const [anyOtherAxle, setAnyOtherAxle] = useState("");
    const [tandemAxle, setTandemAxle] = useState("");
    const [grossVehicleWeight, setGrossVehicleWeight] = useState("");
    const [wheelBase, setWheelBase] = useState("");
    const [typeOfBody, setTypeOfBody] = useState("");
    const [noOfTyers, setNoOfTyers] = useState("");
    const [tankCapacity, setTankCapacity] = useState("");

	const [allCat, setAllCat] = useState([]);
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
		getData("");
	}, []);
	const getData = async (word) => {
	
		await axios
			.get(`/api/v1/addition/bikeModels/allbikeModels/${word}`)
			.then((res) => (setAllCat(res.data)))
			.catch((err) => console.log(err));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleOpen();
		let newCat = { _id: id,  };
		await axios
			.post(`/api/v1/addition/bikeModels/${id}`, newCat)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				getData("");
				handleClose()
				if(res.data.variant==="success"){
					handleClear();

				}
			})
			.catch((err) => console.log(err));
	};
	const handleClear = () => {
		setId("");
		
	};
	const setData = async (id) => {
		handleOpen();
		await axios
			.get(`/api/v1/addition/bikeModels/get/${id}`)
			.then((res) => {
				setId(res.data._id);

				
			})
			.catch((err) => console.log(err));
			handleClose();
	};

	const handleDelete = (id) => {
		axios
			.delete(`/api/v1/addition/bikeModels/delete/${id}`)
			.then((res) => alert(res.data.message))
			.then(() => getData(""))
			.catch((err) => console.log(err));
		handleClear();
	};
	const handleErr = (errIn) => {
		switch (errIn) {
			case "bikeModelsName":
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
									<Chip color="primary" label="Add BikeModels" />
								</center>
							</Grid>
							<Grid item xs={4}></Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("vehicleName")}
									error={err.errIn === "vehicleName" ? true : false}
									label={err.errIn === "vehicleName" ? err.msg : "vehicleName"}
									placeholder="Name of the vehicleName.."
									value={vehicleName}
									onChange={(e) => setVehicleName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("modelCode")}
									error={err.errIn === "modelCode" ? true : false}
									label={err.errIn === "modelCode" ? err.msg : "modelCode"}
									placeholder="Name of the modelCode.."
									value={modelCode}
									onChange={(e) => setModelCode(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("makersName")}
									error={err.errIn === "makersName" ? true : false}
									label={err.errIn === "makersName" ? err.msg : "makersName"}
									placeholder="Name of the makersName.."
									value={makersName}
									onChange={(e) => setMakersName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("classOfVehicle")}
									error={err.errIn === "classOfVehicle" ? true : false}
									label={err.errIn === "classOfVehicle" ? err.msg : "classOfVehicle"}
									placeholder="Name of the classOfVehicle.."
									value={classOfVehicle}
									onChange={(e) => setClassOfVehicle(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("basePrice")}
									error={err.errIn === "basePrice" ? true : false}
									label={err.errIn === "basePrice" ? err.msg : "basePrice"}
									placeholder="Name of the basePrice.."
									value={basePrice}
									onChange={(e) => setBasePrice(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("sgst")}
									error={err.errIn === "sgst" ? true : false}
									label={err.errIn === "sgst" ? err.msg : "sgst"}
									placeholder="Name of the sgst.."
									value={sgst}
									onChange={(e) => setSgst(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("cgst")}
									error={err.errIn === "cgst" ? true : false}
									label={err.errIn === "cgst" ? err.msg : "cgst"}
									placeholder="Name of the cgst.."
									value={cgst}
									onChange={(e) => setCgst(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("exShowroomPrice")}
									error={err.errIn === "exShowroomPrice" ? true : false}
									label={err.errIn === "exShowroomPrice" ? err.msg : "exShowroomPrice"}
									placeholder="Name of the exShowroomPrice.."
									value={exShowroomPrice}
									onChange={(e) => setExShowroomPrice(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("fuelUsed")}
									error={err.errIn === "fuelUsed" ? true : false}
									label={err.errIn === "fuelUsed" ? err.msg : "fuelUsed"}
									placeholder="Name of the fuelUsed.."
									value={fuelUsed}
									onChange={(e) => setFuelUsed(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("horsePower")}
									error={err.errIn === "horsePower" ? true : false}
									label={err.errIn === "horsePower" ? err.msg : "horsePower"}
									placeholder="Name of the horsePower.."
									value={horsePower}
									onChange={(e) => setHorsePower(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("noOfCylinders")}
									error={err.errIn === "noOfCylinders" ? true : false}
									label={err.errIn === "noOfCylinders" ? err.msg : "noOfCylinders"}
									placeholder="Name of the noOfCylinders.."
									value={noOfCylinders}
									onChange={(e) => setNoOfCylinders(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("cubicCapacity")}
									error={err.errIn === "cubicCapacity" ? true : false}
									label={err.errIn === "cubicCapacity" ? err.msg : "cubicCapacity"}
									placeholder="Name of the cubicCapacity.."
									value={cubicCapacity}
									onChange={(e) => setCubicCapacity(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("seatingCapacity")}
									error={err.errIn === "seatingCapacity" ? true : false}
									label={err.errIn === "seatingCapacity" ? err.msg : "seatingCapacity"}
									placeholder="Name of the seatingCapacity.."
									value={seatingCapacity}
									onChange={(e) => setSeatingCapacity(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("unladenWeight")}
									error={err.errIn === "unladenWeight" ? true : false}
									label={err.errIn === "unladenWeight" ? err.msg : "unladenWeight"}
									placeholder="Name of the unladenWeight.."
									value={unladenWeight}
									onChange={(e) => setUnladenWeight(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("frontAxle")}
									error={err.errIn === "frontAxle" ? true : false}
									label={err.errIn === "frontAxle" ? err.msg : "frontAxle"}
									placeholder="Name of the frontAxle.."
									value={frontAxle}
									onChange={(e) => setFrontAxle(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("rearAxle")}
									error={err.errIn === "rearAxle" ? true : false}
									label={err.errIn === "rearAxle" ? err.msg : "rearAxle"}
									placeholder="Name of the rearAxle.."
									value={rearAxle}
									onChange={(e) => setRearAxle(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("anyOtherAxle")}
									error={err.errIn === "anyOtherAxle" ? true : false}
									label={err.errIn === "anyOtherAxle" ? err.msg : "anyOtherAxle"}
									placeholder="Name of the anyOtherAxle.."
									value={anyOtherAxle}
									onChange={(e) => setAnyOtherAxle(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("tandemAxle")}
									error={err.errIn === "tandemAxle" ? true : false}
									label={err.errIn === "tandemAxle" ? err.msg : "tandemAxle"}
									placeholder="Name of the tandemAxle.."
									value={tandemAxle}
									onChange={(e) => setTandemAxle(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("grossVehicleWeight")}
									error={err.errIn === "grossVehicleWeight" ? true : false}
									label={err.errIn === "grossVehicleWeight" ? err.msg : "grossVehicleWeight"}
									placeholder="Name of the grossVehicleWeight.."
									value={grossVehicleWeight}
									onChange={(e) => setGrossVehicleWeight(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("wheelBase")}
									error={err.errIn === "wheelBase" ? true : false}
									label={err.errIn === "wheelBase" ? err.msg : "wheelBase"}
									placeholder="Name of the wheelBase.."
									value={wheelBase}
									onChange={(e) => setWheelBase(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("typeOfBody")}
									error={err.errIn === "typeOfBody" ? true : false}
									label={err.errIn === "typeOfBody" ? err.msg : "typeOfBody"}
									placeholder="Name of the typeOfBody.."
									value={typeOfBody}
									onChange={(e) => setTypeOfBody(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("noOfTyers")}
									error={err.errIn === "noOfTyers" ? true : false}
									label={err.errIn === "noOfTyers" ? err.msg : "noOfTyers"}
									placeholder="Name of the noOfTyers.."
									value={noOfTyers}
									onChange={(e) => setNoOfTyers(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("tankCapacity")}
									error={err.errIn === "tankCapacity" ? true : false}
									label={err.errIn === "tankCapacity" ? err.msg : "tankCapacity"}
									placeholder="Name of the tankCapacity.."
									value={tankCapacity}
									onChange={(e) => setTankCapacity(e.target.value)}
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
			<Grid item xs={12} md={4}>
				{/* Search Section */}
				<div className={classes.search}>
				<Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder= {`Search BikeModels...`}
			  onChange={(e) => getData(e.target.value)}
			   
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
				{/* <SearchBar name={ "BikeModels"}  onChange={(e) => getData(e.target.value)} /> */}
				
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
								{allCat.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
									<TableRow key={data._id} onClick={() => setData(data._id)} hover>
										<TableCell component="td" scope="row">
											Name : {data.bikeModelsName} ; Description : {data.description} <br />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										count={allCat.length}
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
