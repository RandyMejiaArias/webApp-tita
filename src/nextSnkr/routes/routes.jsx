import { BarChart, Person, ShoppingBag } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

export const routes = [
  {
    title: 'R Relación Precio unitario',
    path: '/report1',
    icon: (
      <SvgIcon fontSize="small">
        <BarChart />
      </SvgIcon>
    )
  },
  {
    title: 'R Ventas Cliente/Ciudad',
    path: '/report2',
    icon: (
      <SvgIcon fontSize="small">
        <BarChart />
      </SvgIcon>
    )
  },
  {
    title: 'R Ventas Categorias',
    path: '/report3',
    icon: (
      <SvgIcon fontSize="small">
        <BarChart />
      </SvgIcon>
    )
  },
  {
    title: 'Usuarios',
    path: '/users',
    icon: (
      <SvgIcon fontSize="small">
        <Person />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Account',
  //   path: '/account',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <Person />
  //     </SvgIcon>
  //   )
  // }
]