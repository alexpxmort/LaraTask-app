import React from 'react'
import { Alert, AlertTitle } from '@mui/material'

export type AlertColor = 'success' | 'info' | 'warning' | 'error';

interface Props {
  label: string
  title: string
  type: AlertColor
}

type InputProps = Props

export default function AlertX({ label,title,type }: InputProps) {

  return (
    <>
       <Alert severity={type} closeText='x'>
            <AlertTitle>{label}</AlertTitle>
                {title}
        </Alert>
    </>
  )
}