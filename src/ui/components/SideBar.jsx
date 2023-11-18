import { Box, Divider, Drawer, Stack, useMediaQuery } from "@mui/material";
import { SideBarItem } from "./SideBarItem";
import { Scrollbar } from "./Scrollbar";
import { Link, useLocation } from "react-router-dom";

import { routes } from '../../nextSnkr/routes/routes.jsx'

export const SideBar = ({ open, onClose }) => {
  const location = useLocation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}  
    >
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={Link}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }}
          >
            Logo
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            { routes.map( (route) => {
              const active = route.path ? (location.pathname === route.path) : false;

              return (
                <SideBarItem 
                  active={active}
                  disabled={route.disabled}
                  icon={route.icon}
                  key={route.title}
                  path={route.path}
                  title={route.title}
                />
              )
            })}
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );

  if(lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        { content }
      </Drawer>
    )
  }

  return (
    <Drawer 
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      { content }
    </Drawer>
  );
};