import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { CSVLink } from "react-csv";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './App.css'

const allowedExtensions = ["vnd.ms-excel"];

const App = () => {
	
	const [csvData, setCsvData] = useState([]);
	const [error, setError] = useState("");
	const [file, setFile] = useState("");
	const [data, setData] = useState();
    const btnClass= "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary";

   

	const handleFileChange = (e) => {
		setError("");
		
		// Check if user has entered the file
		if (e.target.files.length) {
			const inputFile = e.target.files[0];
			
			// Check the file extensions, if it not
			// included in the allowed extensions
			// we show the error
			const fileExtension = inputFile?.type.split("/")[1];

			if (!allowedExtensions.includes(fileExtension)) {
				setError("Please input a csv file");
                setFile({})
				return;
			}

			// If input type is correct set the state
			setFile(inputFile);
		}
	};
	const handleParse = () => {
        
		if (!file) return setError("Enter a valid file");

		const reader = new FileReader();
		
		reader.onload = async ({ target }) => {
			const csv = Papa.parse(target.result, { header: false });
			const parsedData = csv?.data;
            filterInformation(parsedData)
		};
		reader.readAsText(file);
	};

    const filterInformation = (columns) =>{
        let total_orders = 0;
        let productsSale = []
        let productsWithBrands = []
        columns.forEach(element => {
            if(element.length > 3){
                total_orders += 1;
                
                let sale = {
                    name: element[2],
                    qty: Number(element[3]),
                }
                
                let brandSale = {
                    name: element[2],
                    brand: element[4],
                    qty: 1
                }

                const brandIndex = productsWithBrands.findIndex(object => {
                    return  object.name === brandSale.name && object.brand === brandSale.brand;
                });

                if(brandIndex > -1){
                    productsWithBrands[brandIndex].qty += 1 
                } else {
                    productsWithBrands.push(brandSale);
                }

                const index = productsSale.findIndex(object => {
                    return  object.name === sale.name;
                });
                
                if(index > -1){
                    productsSale[index].qty += sale.qty 
                } else {
                    productsSale.push(sale);
                }
            }
        });
        
        let productsAvg = []
        productsSale.forEach(element => {
            let product = {
                name : element.name,
                avg : (element.qty / total_orders).toFixed(2)
            }
            productsAvg.push(product)
        });
        setCsvData(productsAvg);

        const link = document.createElement('a');

        let csv = convertArrayOfObjectsToCSV(productsAvg);

        const filename = `0_${file.name}`;

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();

        let productWithPopularBrand = []

        productsWithBrands.forEach( element => {
            // productWithPopularBrand
            const index2 = productWithPopularBrand.findIndex(object => {
                return  object.name === element.name;
            });

            if(index2 > -1){
                if(element.qty > productWithPopularBrand[index2].qty)
                productWithPopularBrand[index2].qty += element.qty 
                productWithPopularBrand[index2].brand += element.brand 
            } else {
                productWithPopularBrand.push(element);
            }

        });

        const link2 = document.createElement('a');

        let csv2 = convertArrayOfObjectsToCSV(productWithPopularBrand);

        const filename2 = `1_${file.name}`;

        if (!csv2.match(/^data:text\/csv/i)) {
            csv2 = `data:text/csv;charset=utf-8,${csv2}`;
        }

        link2.setAttribute('href', encodeURI(csv2));
        link2.setAttribute('download', filename2);
        link2.click();

    }

    function convertArrayOfObjectsToCSV(array) {
        let result;
    
        const columnDelimiter = ',';
        const lineDelimiter = '\n';
    
        const keys = Object.keys(array[0]);
    
        result = '';
    
        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;
    
                result += item[key];
    
                ctr++;
            });
            result += lineDelimiter;
        });
    
        return result;
    }


	return (
		<div>
            <CssBaseline />
            <Container maxWidth="md">
                <div className="mainDiv">
                    <label htmlFor="csvInput" className="labelStyle">
                        Welcome to CSV Compiler 
                    </label>
                    <div className="inputDivStyle">
                        <Button
                            className="inputButtonStyle"
                            variant="contained"
                            component="label"
                            >
                            Upload File
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                id="csvInput"
                                name="file"
                            />
                        </Button>
                        <span style={{marginLeft:"10px"}}>{file.name}</span>
                    </div>
                </div>
                
                <div className="generateDivCss">
                    {error ? error : file.name && 
                    // <CSVLink className={btnClass} data={csvData}>Generaate CSV files</CSVLink>
                    <Button variant="contained" color="primary" component="label" onClick={handleParse} >
                        Generate Files
                    </Button>
                    }
                </div>
            </Container>
		</div>
	);
};

export default App;
