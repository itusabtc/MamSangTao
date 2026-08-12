'use client'
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
export function useInventory(){const [owned,setOwned]=useState<string[]>([]);useEffect(()=>{try{setOwned(JSON.parse(localStorage.getItem('mam-inventory')||'[]') as string[])}catch{setOwned([])}},[]);return owned}
