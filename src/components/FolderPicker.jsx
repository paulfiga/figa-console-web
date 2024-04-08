import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Divider from '@mui/joy/Divider';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import Checkbox from '@mui/joy/Checkbox';
import IconButton from '@mui/joy/IconButton';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GoogleIcon from '@mui/icons-material/Google';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import { useEffect, useState } from 'react';

export default function FolderPicker({open, setOpen}) {

  const [currentFolder, setCurrentFolder] = useState({children:[]});
  const [root, setRoot] = useState({children:[]});

  useEffect(() => {
    if(!open)
      return;

    async function fetchFolders() {
      let res = await fetch(`/api/google/drive/folders`);
      let {folders} = await res.json();

      // currentFolder is now root
      let root = {children:[]};
      // now sort them into a tree structure
      for(const f of folders) {

        // there's one strange folder called 'Class Schedule' with no parent ???
        if(!f.parents)
          continue;

        let p = folders.find((i) => f.parents && f.parents[0] == i.id);
        if(p) {
          if (!p.children)
            p.children = [];
          f.parent = p;
          p.children.push(f)
        }
        else {
          f.parent = root;
          root.children.push(f);
        }
      }

      function sortChildren(parent) {
        if(!parent.children)
          return;

        parent.children.sort((a, b) => a.name.localeCompare(b.name))
        for(const c in parent.children)
          sortChildren(c);
      }
      sortChildren(root);
      setCurrentFolder(root);
      setRoot(root);
    }

    fetchFolders();
  },[open]);

  // construct the ancestor list
  let ancestors = [currentFolder];
  let f = currentFolder;
  while(f.parent) {
    ancestors.push(f.parent);
    f = f.parent;
  }
  ancestors = ancestors.reverse();

  return (<>
    <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog" minWidth={500}>
          <DialogTitle>
            <GoogleIcon />
            Google Drive
          </DialogTitle>
          <Divider />
          <DialogContent>
          <List
            variant="outlined"
            sx={{
              borderRadius: 'sm',
              // overflow: 'scroll',
              '--List-nestedInsetStart': '1rem',
            }}
          >
            <ListItem nested>
              <ListSubheader>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Breadcrumbs
                    size="sm"
                    aria-label="breadcrumbs"
                    separator={<ChevronRightRoundedIcon fontSize="sm" />}
                    sx={{ pl: 0 }}
                  >
                    {/* <Link
                      underline="none"
                      color="neutral"
                      href="#some-link"
                      aria-label="Home"
                      onClick={()=>setFolderList(root)}
                    >
                      <HomeRoundedIcon />
                    </Link> */}
                    {
                      // get the ancestry in order
                      ancestors.map((a) =>
                        <Link
                        underline="none"
                        color="neutral"
                        href="#some-link"
                        aria-label="Home"
                        fontSize={12}
                        fontWeight={500}
                        onClick={()=>setCurrentFolder(a)}
                        key={a.id}
                      >
                        {a.name ?? <HomeRoundedIcon />}
                      </Link>
                      )
                    }
                    {/* <Link
                      underline="hover"
                      color="neutral"
                      href="#some-link"
                      fontSize={12}
                      fontWeight={500}
                    >
                      Dashboard
                    </Link> */}
                    {/* <Typography color="primary" fontWeight={500} fontSize={12}>
                      Orders
                    </Typography> */}
                  </Breadcrumbs>
                </Box>
              </ListSubheader>
              <List>
                {
                  currentFolder.children.map((f) =>
                    <ListItem key={f.id}>
                      <>
                        <Checkbox label={f.name} key={f.id}/>
                        {f.children ? 
                        (  <IconButton
                            onClick={() => setCurrentFolder(f)}
                          >
                            <ChevronRightRoundedIcon/>
                          </IconButton>) : null}
                      </>
                    </ListItem>
                  )
                }
              </List>
            </ListItem>
          </List>
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="primary" onClick={() => setOpen(false)}>
              Add Selected Folders
            </Button>
            <Button variant="outlined" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
  </>)
}