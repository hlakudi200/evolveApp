"use client";
import React from 'react'
import { useLaneActions ,useLaneState} from '@/providers/lane';

const QueueTaxi=()=> {
    const {}=useLaneActions();
    const {}=useLaneState();
  return (
    <div>queue-taxi</div>
  )
}

export default QueueTaxi;