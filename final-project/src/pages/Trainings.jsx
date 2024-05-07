import { AgGridReact } from 'ag-grid-react'; 
import { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";

import { DeleteCustomers } from "../components/DeleteResponse"

export const Trainings = ()=>{
    const [trainingsState,setTrainingsState]=useState([])
    console.log(trainingsState)
    const [colDefs] = useState([
        { field: "date", filter: true },
        { field: "duration", filter: true },
        { field: "activity", filter: true },
        { field: "customer", filter: true },
        {
            cellRenderer: (params) => (
            <Button
                size="small"
                color="error"
                onClick={() => deleteCustomers(params.data._links.training.href)}
            >
                Delete
            </Button>
            ),
            width: 150,
        },
        ]);
        const fetchInstance = async (url) => {
            console.log(import.meta.env.VITE_API_URL_TRANINGS)
            const response = await fetch(url);
            const data = await response.json();
            return data;
            };
        
            const fetchTrainings = async () => {
            const data = await fetchInstance(import.meta.env.VITE_API_URL_TRANINGS);
            return data._embedded.trainings;
            };
        
            const getLinks = async () => {
            let links = [];
            const response = await fetchTrainings();
        
            for (let i = 0; i < response.length; i++) {
                links.push(response[i]._links.customer.href);
            }
        
            return links;
            };
        
            const fetchCustomers = async () => {
            const trainings = await fetchTrainings();
            const links = await getLinks();
            const pro = [];
            for (let i = 0; i < links.length; i++) {
                pro.push(await fetchInstance(links[i]));
            }
        
            const names = pro.map((item) => item.lastname);
        
            if (names.length === 0 || trainings.length === 0) {
                throw new Error(`No training for ${trainings.length} trainings`);
            } else if (names.length === trainings.length) {
                const arr = [];
                for (let i = 0; i < names.length; i++) {
                const newObj = { ...trainings[i], customer: names[i] };
                arr.push(newObj);
                }
                setTrainingsState(arr);
            }
            };
        
            useEffect(() => {
            fetchCustomers();
            }, []);
            const deleteCustomers = (url) => {
            DeleteCustomers(url)
                .then(() => fetchCustomers())
                .catch((err) => console.error(err));
            };
                return(         
                    <>
                            <div 
                            className="ag-theme-quartz" 
                            style={{ height: 500,maxWidth:"900px" }}
                            >
                            <AgGridReact
                            rowData={trainingsState}
                            columnDefs={colDefs}
                            />
                            </div>
                    </>
                    )
}