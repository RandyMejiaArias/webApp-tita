import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Grid, InputAdornment, OutlinedInput, Stack, SvgIcon, Typography } from "@mui/material"
import { ProductPage } from "../../pages/ProductPage"
import { Search } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { startLoadingProducts, startSearchingProducts } from "../../../store/product/thunks"

export const ViewProducts = () => {

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product );
  const { data, loading, error } = useSelector((state) => state.api);

  const [productsToShow, setProductsToShow] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(startLoadingProducts());
  }, []); 

  useEffect(() => {
    if(data?.data?.length > 0) {
      setProductsToShow(data.data);
      setSearchResults(data.data);
    }
  }, [data]); 

  useEffect(() => {
    setProductsToShow(products);
    setSearchResults(products);
  }, [products]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredProducts = productsToShow.filter( product => 
      product.model.toLowerCase().includes(event.target.value.toLowerCase())
      || product.brand.toLowerCase().includes(event.target.value.toLowerCase())
      || product.sku.toLowerCase().includes(event.target.value.toLowerCase())
      || product.colorway.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  const handleSearchOnApi = () => {
    dispatch(startSearchingProducts(searchTerm));
    console.log(searchTerm)
  }

  return (
    <ProductPage>
      <Stack 
        direction="row"
        justifyContent="space-between"
        spacing={4}
      >
        <Stack spacing={1}>
          <Typography variant="h4">
            Products
          </Typography>
        </Stack>
      </Stack>
      <Card sx={{ p: 2, my: 4 }}>
        <OutlinedInput 
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          placeholder="Search product"
          sx={{ maxWidth: 500 }}
          startAdornment={(
            <InputAdornment  position="start">
              <SvgIcon 
                color="action"
                fontSize="small"
              >
                <Search />
              </SvgIcon>
            </InputAdornment>
          )}
        ></OutlinedInput>
        <Button
          sx= {{ ml: 2 }}
          onClick={handleSearchOnApi}
          startIcon={(
            <SvgIcon fontSize="small">
              <Search />
            </SvgIcon>
          )}
          variant="contained"
        >
          Deep Search
        </Button>

      </Card>

      <Grid container spacing={3}>
        
        { 
          loading ? <Grid container direction='row' justifyContent='center'>
            <CircularProgress color='warning'/>
          </Grid>
          : searchResults.map((product) => (
            <Grid item
              xs={12}
              md={6}
              lg={3}
              key={product._id}
            >
              <Card
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <CardContent>
                <CardMedia
                  sx={{ height: 280, width: 'auto', objectFit: 'fill' }}
                  image={product.mainImage}
                  title={product.model}
                />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      pb: 3
                    }}
                  >
                  </Box>
                  <Typography
                    align="left"
                    gutterBottom
                    variant="h5"
                  >
                    { product.model }
                  </Typography>
                  <Typography 
                    align="left"
                    variant="body1"
                  >
                    { product.colorway }
                  </Typography>
                </CardContent>
                <Box sx={{ flexGrow: 1 }} />
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ p: 2 }}
                >
                  <Typography 
                    align="left"
                    variant="body2"
                    color="text.secondary"
                  >
                    { product.brand }
                  </Typography>
                  <Typography 
                    align="left"
                    variant="caption"
                    color="text.secondary"
                  >
                    { product.type }
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </ProductPage>
  )
}