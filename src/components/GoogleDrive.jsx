import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import CachedIcon from '@mui/icons-material/Cached';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import { useState } from 'react';
import DataTable from '@/components/DataTable';
import { useDataSource, useEmbedDataSource } from '@/hooks';
import { Provider } from '@prisma/client'

import Chip from '@mui/joy/Chip';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import MemoryIcon from '@mui/icons-material/Memory';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import Divider from '@mui/joy/Divider';

export default function GoogleDrive({userId}) {

  const {dataSources, isLoading, isError, mutate} = useDataSource(userId, Provider.GoogleDrive);
  const {trigger} = useEmbedDataSource(userId, Provider.GoogleDrive);
  const [selected, setSelected] = useState([]);

  function onEmbed(files) {
    trigger(files);
  }

  function RowMenu() {
    return (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Rename</MenuItem>
          <MenuItem>Move</MenuItem>
          <Divider />
          <MenuItem color="danger">Delete</MenuItem>
        </Menu>
      </Dropdown>
    );
  }

  function makeCell(column, row) {
    if(column === "Status") {
      return (
        <td>
          <Chip
            variant="soft"
            size="sm"
            startDecorator={
              {
                New: <AddCircleOutlineIcon />,
                Embedding: <MemoryIcon />,
                Done: <CheckRoundedIcon />,
              }[row.status]
            }
            color={
              {
                New: 'primary',
                Embedding: 'neutral',
                Done: 'success',
              }[row.status]
            }
          >
            {row.status}
          </Chip>
        </td>
      );
    }
    else if(column === "") {
      return (
        <td>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Link level="body-xs" component="button" onClick={()=>onEmbed([row.id])}>
              Embed
            </Link>
            <RowMenu />
          </Box>
        </td> 
      );
    }
    else 
      return null;
  }
  
  const headers = [
    {label: "Folder Name", width: 120, key: 'name'},
    {label: "Path", width: 300, key: 'id'},
    {label: "Status", width: 120, key: 'status'},
    {label: "", width: 120},
  ]

  const props = {
    dataSources: dataSources, 
    headers: headers,
    makeCell: makeCell,
    selected: selected, 
    setSelected: setSelected,
  }

  return (
    <>
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
              Data Source
            </Link>
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
          <IconButton variant="soft" color="primary" size="sm" onClick={()=>mutate()}>
            <CachedIcon />
          </IconButton>
        </Box>
        <DataTable {...props}/>
      </Box>
    </>
  )
}