import * as React from 'react';
import Head from 'next/head'
import '@fontsource/inter';

import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Documents from '@/components/Documents'
import Dashboard from '@/components/Dashboard';
import GoogleDrive from '@/components/GoogleDrive';

import { useSession } from "next-auth/react"
import { useSelector } from 'react-redux'
import { PAGE_ID } from '@/stores/currentPageSlice';

function page(currentPage, userId, userEmail) {
  switch(currentPage) {
    case PAGE_ID.DASHBOARD: return <Dashboard userId={userId}/>
    case PAGE_ID.GOOGLE_DRIVE: return <GoogleDrive userId={userId}/>
    case PAGE_ID.DOCUMENTS: return <Documents userId={userId} userEmail={userEmail}/>
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
        <Head>
          <title>Figa Console</title>
        </Head>
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
          <Header />
          <Sidebar />
          {page(currentPage, session.userId, session.user.email)}
        </Box>
      </main>
    );
}
