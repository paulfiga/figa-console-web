import * as React from 'react';
import { Inter } from "next/font/google";

import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';

import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';

import { useSession } from "next-auth/react"
import { useSelector } from 'react-redux'
import { PAGE_ID } from '@/stores/currentPageSlice';

function page(currentPage) {
  switch(currentPage) {
    case PAGE_ID.DASHBOARD: return <Dashboard/>
    default: return null
  }
}

export default function Home() {
  const { data: session, status } = useSession()
  const currentPage = useSelector((state) => state.currentPage.value)
  
  if(status == "loading") {
    return (<></>)
  }
  return (
      <main>
        {/* <ModeToggle /> */}
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
          <Header />
          <Sidebar />
          {page(currentPage)}
        </Box>
      </main>
    );
}
