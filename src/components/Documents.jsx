import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useSession } from "next-auth/react"
import DataTable from '@/components/DataTable';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import CachedIcon from '@mui/icons-material/Cached';

import {useDocuments} from '@/hooks'

const headers = [
  {label: "File Name", width: 120, key: 'name'},
  {label: "Path", width: 300, key: 'id'},
  {label: "Source", width: 120, key: 'provider'},
]

function makeCell(column, row) {
  return null;
}

export default function Documents({userId}) {
  const {documents, isLoading, isError, mutate} = useDocuments(userId);
  const { data: session } = useSession()

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
              Documents
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
            Documents
          </Typography>
          <IconButton variant="soft" color="primary" size="sm">
            <CachedIcon />
          </IconButton>
        </Box>
        <DataTable dataSources={documents} headers={headers} makeCell={makeCell}/>
      </Box>
    </>
  )
}