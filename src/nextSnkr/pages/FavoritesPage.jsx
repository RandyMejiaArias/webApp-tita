import { Box, Container, Stack, Typography, Card, CardHeader, Table, TableHead, TableRow, TableCell, Unstable_Grid2 as Grid, TableBody } from "@mui/material"
import { SnkrAppLayout } from "../layout/SnkrAppLayout"
import { useSelector } from "react-redux";

export const FavoritesPage = () => {

  const { data: dataApiUsers, loading: loadingApiUsers, error: errorApiUsers } = useSelector((state) => state.apiUsers);

  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser)
  return (
    <SnkrAppLayout >
      <Box component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          {/* <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Favorites
              </Typography>
            </div>
          </Stack> */}
          <Grid container spacing={3}>
            <Grid 
              xs={12}
              md={12}
              lg={3}
            >
              <Typography variant="h4">
                Favorites
              </Typography>
            </Grid>
            <Grid 
              xs={12}
              md={12}
              lg={9}
            >
              <Card sx={{ height: '100%' }}>
                <CardHeader title="My favs"/>
                <Box sx={{ minWidth: 800 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          Model
                        </TableCell>
                        <TableCell>
                          Colorway
                        </TableCell>
                        <TableCell>
                          Size
                        </TableCell>
                        <TableCell sortDirection="desc">
                          Score
                        </TableCell>
                        <TableCell>
                          Current Price
                        </TableCell>
                        {/* <TableCell>
                          Links
                        </TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentUser?.collectibles?.map((collectible) => {
                        return (
                          <TableRow
                            hover
                            key={collectible._id}
                          >
                            <TableCell>
                              {collectible.product.model}
                            </TableCell>
                            <TableCell>
                              {collectible.product.colorway}
                            </TableCell>
                            <TableCell>
                              {collectible.size.number}
                            </TableCell>
                            <TableCell>
                              {collectible.score}
                            </TableCell>
                            <TableCell>
                              {collectible.size.stockXPrice}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </SnkrAppLayout>
  )
}