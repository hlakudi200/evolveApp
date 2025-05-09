"use client";
import React from 'react'
import { useDriverActions,useDriverState } from '@/providers/driver';

const DriverProfile=()=> {
const {Driver}=useDriverState();
  
return (
    <div>Account Page</div>
  )
}

export default DriverProfile;