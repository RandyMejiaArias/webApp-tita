import { styled } from '@mui/material/styles';

import { NavBar } from "../../ui/components/NavBar"
import { SideBar } from "../../ui/components/SideBar"
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

export const SnkrAppLayout = ({children}) => {

  const [openNav, setOpenNav] = useState(false);

  const location = useLocation();

  const handlePathnameChange = useCallback(
    () => {
      if(openNav)
        setOpenNav(false);
    },
    [openNav],
  )

  useEffect(() => {
    handlePathnameChange()
  }, [location.pathname])
  

  return (
    <>
      <NavBar onNavOpen={() => setOpenNav(true)} />
      <SideBar
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
      <LayoutRoot>
        <LayoutContainer>
          { children }
        </LayoutContainer>
      </LayoutRoot>
    </>
  )
}