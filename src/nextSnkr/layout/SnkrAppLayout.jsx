import { Box, Toolbar } from "@mui/material"
import { NavBar } from "../../ui/components/NavBar"
import { SideBar } from "../../ui/components/SideBar"

export const SnkrAppLayout = ({children}) => {
  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>
      <NavBar />
      <SideBar />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }} >
        <Toolbar />
        { children }
      </Box>
    </Box>
  )
}