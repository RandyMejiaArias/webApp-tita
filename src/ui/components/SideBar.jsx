import { Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { SideBarItem } from "./SideBarItem"
import { TurnedInNot } from "@mui/icons-material"

export const SideBar = ({ drawerWidth = 240 }) => {
  return (
    <Box component='nav'
      sx={{ 
        width: { sm: drawerWidth }, 
        flexShrink: { sm: 0 },
      }}
      >
      <Drawer variant='permanent' open
        PaperProps={{
          sx: {
            backgroundColor: 'primary.main', 
            color: 'white'
          }
        }}
        sx={{ 
          display: { sx: 'block' }, 
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth 
          }
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>Who is next?</Typography>
        </Toolbar>
        <Divider />
        <List>
          <SideBarItem title="Products">
            <TurnedInNot />
          </SideBarItem>
          <SideBarItem title="Scoring Characteristics">
            <TurnedInNot />
          </SideBarItem>
          <SideBarItem title="Users">
            <TurnedInNot />
          </SideBarItem>
        </List>
      </Drawer>
    </Box>
  )
}