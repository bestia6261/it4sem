import { useState,useEffect } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { sum } from "lodash";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GetResponse } from "../components/GetResponse";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';



export const Statistics=()=>{

  const [value, setValue] = useState("1");

  const handleChange = (event,newValue) => {
    setValue(newValue);
  };
      const [stateTrainings,setStateTrainings] = useState([])
      const [stateTrainingsTime,setStateTrainingsTime] = useState([])
          
      ChartJS.register(ArcElement, Tooltip, Legend);
      const pie = [];
      const GetTraningsStat =async(URL)=>{
        const data = await GetResponse(URL)
        const arr = data._embedded.trainings
        const groupByArr = Object.groupBy(arr,trainings=>trainings.activity)
        const arrFor = []
        const arrForTime = []
        const arrForTimeFull = []
        
        console.log(stateTrainings)
        for(const key in groupByArr){
          arrFor.push(key)
        }
        const objValues = Object.values(groupByArr);
        objValues.map((el)=>{
          arrForTime.push(
              el.map((el)=>{
                return el.duration
              })
          )
        })
        arrForTime.map((el)=>{
          arrForTimeFull.push(sum(el))
        })
        setStateTrainings(arrFor)
        setStateTrainingsTime(arrForTimeFull)
      }
      for(let i = 0; i < stateTrainings.length; i++){
        const newObj = {value:stateTrainingsTime[i],label:stateTrainings[i]}
        pie.push(newObj)
      }
      useEffect(() => {
        GetTraningsStat(import.meta.env.VITE_API_URL_TRANINGS );
      }, []);

    return(
        <>
        <TabContext value={value}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <TabList onChange={handleChange} aria-label="lab API tabs example">
      <Tab label="Pie chart" value="1" />
      <Tab label="Bar chart" value="2" />
    </TabList>
  </Box>
  <TabPanel value="1">
    <PieChart
      series={[
        {
          data: pie,
        },
      ]}
      width={400}
      height={200}
    />
    </TabPanel>
  <TabPanel value="2"><BarChart
      series={[
        { data: stateTrainingsTime }
      ]}
      height={290}
      xAxis={[{ data: stateTrainings, scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    /></TabPanel>
</TabContext>
        </>
    )
}