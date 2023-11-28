import { Box, Container } from "@mui/material"
import { SnkrAppLayout } from "../layout/SnkrAppLayout"

export const ProductPage = ({ children }) => {
  return (
    <SnkrAppLayout >
      <Box component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          { children }
        </Container>
      </Box>
    </SnkrAppLayout>
  )
}