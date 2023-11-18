import { BarChart, Person, ShoppingBag } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

export const routes = [
  {
    title: 'Dashboard',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <BarChart />
      </SvgIcon>
    )
  },
  {
    title: 'Products',
    path: '/products',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBag />
      </SvgIcon>
    )
  },
  {
    title: 'Scoring Characterisctics',
    path: '/scoringCharacteristics',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBag />
      </SvgIcon>
    )
  },
  {
    title: 'Users',
    path: '/users',
    icon: (
      <SvgIcon fontSize="small">
        <Person />
      </SvgIcon>
    )
  }
]