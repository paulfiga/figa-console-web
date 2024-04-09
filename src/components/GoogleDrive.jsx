import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import OrderTable from '@/components/OrderTable';
import OrderList from '@/components/OrderList';
import FolderPicker from '@/components/FolderPicker';

import { useState } from 'react';
import { useDataSource, useDataSourceMutate } from '@/hooks';
import { Provider } from '@prisma/client';

export default function GoogleDrive({userId}) {
  const [open, setOpen] = useState(false);
  const {dataSources, isLoading, isError} = useDataSource(userId);
  const {trigger} = useDataSourceMutate(userId);

  // const { data, error, isLoading } = useSWR(`/api/user/${userId}`, fetcher)

  // let msg = "";
  // if(isError) {
  //   msg = "error";
  // }
  // else if(isLoading) {
  //   msg = "loading"
  // }
  // else {
  //   msg = user.name;
  // }

  function onAdd(selectedFolders) {
    trigger(selectedFolders.map((f) => ({id: f.id, name: f.name, provider: Provider.GoogleDrive})));
  }

  return (
    <>
      <FolderPicker open={open} setOpen={setOpen} onAdd={onAdd}/>
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: 'calc(12px + var(--Header-height))',
            sm: 'calc(12px + var(--Header-height))',
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              href="#some-link"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              href="#some-link"
              fontSize={12}
              fontWeight={500}
            >
              Dashboard
            </Link>
            <Typography color="primary" fontWeight={500} fontSize={12}>
              Orders
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box
          sx={{
            display: 'flex',
            mb: 1,
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'start', sm: 'center' },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Typography level="h2" component="h1">
            Google Drive
          </Typography>
          <Button
            color="primary"
            startDecorator={<AddBoxIcon />}
            size="sm"
            onClick={() => setOpen(true)}
          >
            Add Document
          </Button>
        </Box>
        <OrderTable dataSources={dataSources}/>
        {/* <OrderList /> */}
      </Box>
    </>
  )
}