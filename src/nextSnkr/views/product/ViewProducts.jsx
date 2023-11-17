import { Typography } from "@mui/material"
import { ProductPage } from "../../pages/ProductPage"

export const ViewProducts = () => {
  return (
    <ProductPage title="Products">
      <Typography variant='h5' sx={{ mb: 1 }}>Select contract type: </Typography>
    </ProductPage>
  )
}