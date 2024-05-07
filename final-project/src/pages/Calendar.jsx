import moment from 'moment/moment'
import { Calendar as BigCalendar, momentLocalizer} from 'react-big-calendar'
import {useState,useEffect } from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export const CalendarCustomers =(props)=>{
    const [trainingsState,setTrainingsState]=useState([])
    const [calendarState,setCalendarsState]=useState([]) 
    const events =[
        {
            start:moment("2024-04-29T08:38:03.133+00:00").toDate(),
            end:moment("2024-04-29T08:38:03.133+00:00").add(50,'minutes').toDate(),
            title: "MRI REGISTRATION"
        }
    ]
    const fetchInstance = async (url) => {
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
            console.log(import.meta.env.VITE_API_URL_TRANINGS)
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
            const calendar = calendarFunc(arr)
            console.log(calendar)
        }}
        const calendarFunc = (arr)=>{
            const arrayCalendar = []
            arr.map((el)=>{
                const culendarObj={
                    start:moment(el.date).toDate(),
                    end:moment(el.date).add(el.duration,'minutes').toDate(),
                    title: `${el.activity}/${el.customer}`
                }
                arrayCalendar.push(culendarObj)
            })
            setCalendarsState(arrayCalendar)
        }
        useEffect(() => {
            fetchCustomers()
        }, []);
        
    return(
        <>
    <div>
    <BigCalendar
        localizer={localizer}
        events={calendarState}
        startAccessor="start"
        endAccessor="end"
        style={{width:1500, height: 500,color:'#000000' }}
    />
    </div>
        </>
    )
}