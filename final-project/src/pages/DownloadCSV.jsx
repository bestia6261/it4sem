import React from 'react';
import Button from '@mui/material/Button';

export const DownloadCSV =({data})=>{
    const exportCSV =()=>{
        const scvContent = coverToCSV()
        const blob = new Blob([scvContent],{type:'text/csv;sharset=utf-8;'})
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download','export_data.csv')
        link.click()
    }
    const coverToCSV =()=>{
        const headers = Object.keys(data[0])
        const rows = data.map((obj)=>headers.map((header)=>obj[header]))
        const headerRow = headers.join(',')
        const csvRows = [headerRow,...rows.map((row)=>row.join(', '))]
        return csvRows.join('\n')
    }
    return(
        <>
        <Button
        size="small" 
        onClick={(e)=>exportCSV()}>
            EXPORT
        </Button>
        </>
    )
}