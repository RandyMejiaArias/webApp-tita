import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

export const SideBarItem = ({children, title = '', route = ''}) => {
  return (
    <ListItem disablePadding>
      <ListItemButton >
        <ListItemIcon>
          {children}
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={title}/>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}