import { LogoutOutlined } from "@mui/icons-material"
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from "@mui/material"
import { useAuthStore } from "../../store/auth/auth.store";

export const AccountPopover = ({ anchorEl, onClose, open }) => {

  const logout = useAuthStore(state => state.logout);
  const user = useAuthStore(state => state.user);

  const handleLogout = async () => {
    localStorage.clear();
    logout();
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
        <Typography color="text.secondary" variant="body2">{user.email}</Typography>
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