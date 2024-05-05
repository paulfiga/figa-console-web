import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import SaveIcon from '@mui/icons-material/Save';

import { SettingType } from '@prisma/client'
import { useSetting, useSettingMutate } from '@/hooks';

import AceEditor from "react-ace-builds";
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';
import { useState } from 'react';

export default function SettingsView({userId}){

  // const [newConfig, setNewConfig] = useState("");
  const {configs, mutate}  = useSetting(userId, SettingType.Embed);
  const {trigger}  = useSettingMutate(userId, SettingType.Embed);

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
              Settings
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
            Settings
          </Typography>
          <IconButton variant="solid" color="primary" size="sm" 
            onClick={()=>trigger(configs)}
          >
            <SaveIcon />
          </IconButton>
        </Box>
        <AceEditor
          mode="json"
          theme="monokai"
          name="embed_settings"
          onChange={value =>mutate(value, {revalidate: false})}
          fontSize={14}
          width='100%'
          height='750px'
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          value={configs}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </Box>
    </>
  );
}