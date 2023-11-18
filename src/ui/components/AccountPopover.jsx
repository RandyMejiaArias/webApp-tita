import { LogoutOutlined } from "@mui/icons-material"
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/authSlice";

export const AccountPopover = ({ anchorEl, onClose, open }) => {

  const dispatch = useDispatch();

  const handleLogout = async () => {
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <Popover 
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box 
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">Name</Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleLogout}>
          <LogoutOutlined />
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  )
}