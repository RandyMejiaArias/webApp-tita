import { Box, Button, Card, CardContent, CardMedia, Checkbox, CircularProgress, Container, FormControlLabel, Grid, Modal, Stack, Typography } from "@mui/material"
import { SnkrAppLayout } from "../../layout/SnkrAppLayout"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingProductById } from "../../../store/product";
import { startLoadingSizesByProduct } from "../../../store/size/thunks";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { startLoadingPreferredScore } from "../../../store/preferredScore/thunks";
import { Field, Form, Formik } from "formik";
import { startAddingFavToUser, startRemovingFavToUser } from "../../../store/user/thunks";

export const SingleProductView = () => {

  const { productId } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { data: dataApiProducts, loading: loadingApiProducts, error: errorApiProducts } = useSelector((state) => state.apiProducts);
  const { data: dataApiSizes, loading: loadingApiSizes, error: errorApiSizes } = useSelector((state) => state.apiSizes);
  const { data: dataApiUsers, loading: loadingApiUsers, error: errorApiUsers } = useSelector((state) => state.apiUsers);
  const { currentProduct } = useSelector((state) => state.product);
  const { preferredScores } = useSelector(state => state.preferredScores );
  const { sizes, total } = useSelector((state) => state.size);
  const { currentUser } = useSelector((state) => state.user);
  
  const [followedBy, setFollowedBy] = useState([])
  const [sizesOnFavs, setSizesOnFavs] = useState(null)
  const [formikInitialValues, setFormikInitialValues] = useState(null)
  const [isOnFavs, setIsOnFavs] = useState(false)
  const [selectedSize, setSelectedSize] = useState(null)
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(startLoadingProductById(productId));
    dispatch(startLoadingSizesByProduct(productId));
    dispatch(startLoadingPreferredScore());
    forceRefresh()
  }, []);
  
  useEffect(() => {
    setFollowedBy(currentProduct.followedBy)
    resetInitialValues()
    console.log({currentProduct, currentUser, sizes, preferredScores})
  }, [refresh]);

  const forceRefresh = () => {
    setRefresh(prevRefresh => !prevRefresh);
  };

  const resetInitialValues = () => {
    const initialValues = {
      scores: preferredScores.map(score => ({
        scoreCharacteristic: score.scoreCharacteristic._id,
        name: score.scoreCharacteristic.name,
        value: false
      }))
    };
    setFormikInitialValues(initialValues)
  };
  
  useEffect(() => {
    forceRefresh()
    const isUserFollowingProduct = followedBy?.includes(currentUser._id)
    if(isUserFollowingProduct) {
      const foundSizes = currentUser.collectibles.reduce((acc, collectible) => {
        const foundSize = sizes.find(size => size._id === collectible.size);
        if (foundSize) {
          acc.push(foundSize);
        }
        return acc;
      }, []);
      setSizesOnFavs(foundSizes.length > 0 ? foundSizes : []);
    }else 
      setSizesOnFavs([]);
  }, [followedBy]);

  const handleSizeSelection = (size) => {
    setSelectedSize(size === selectedSize ? null : size)
    const foundSize = sizesOnFavs?.some(e => e._id === (size === selectedSize ? null : size._id));
    setIsOnFavs(foundSize ?? false)
  };

  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFavButton = () => {
    if(!selectedSize) return
    console.log({isOnFavs, selectedSize})
    if(isOnFavs) {
      const dataToUpload = {
        size: selectedSize._id,
        product: productId
      }
      dispatch(startRemovingFavToUser(dataToUpload))
      setIsOnFavs(isOnFavs => !isOnFavs)
    }
    else {
      handleOpenModal()
    }
  }

  const handleSubmit = (values) => {
    const dataToUpload = {
      size: selectedSize._id,
      product: productId,
      evaluateConditions: values.scores
    }
    dispatch(startAddingFavToUser(dataToUpload))
    resetInitialValues()
    setIsOnFavs(isOnFavs => !isOnFavs)
    handleCloseModal()
  };

  const validateForm = (values) => {
    const areAllFalse = values.scores.every(score => !score.value);
    return areAllFalse ? { _error: 'Must select at least one option' } : {};
  };

  return (
    <SnkrAppLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-set-characteristics"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add product to favorites
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              { currentProduct.model } { currentProduct.colorway} on size { selectedSize?.number }
            </Typography>
            <Formik initialValues={formikInitialValues} onSubmit={handleSubmit} validate={validateForm}>
              {({ errors }) => (
                <Form>
                  {formikInitialValues?.scores?.map((score, index) => (
                    <div key={score.scoreCharacteristic}>
                      <FormControlLabel
                        control={
                          <Field
                            as={Checkbox}
                            type="checkbox"
                            id={`scores.${index}.value`}
                            name={`scores.${index}.value`}
                          />
                        }
                        label={score.name}
                      />
                    </div>
                  ))}
                  {errors._error && <div style={{ color: 'red' }}>{errors._error}</div>}
                  <Button variant="contained" color="primary" type="submit">
                    Enviar
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>
        
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <div>
              <Typography variant="h4">
                Product
              </Typography>
            </div>
            <div>
              {
                loadingApiProducts || loadingApiSizes ? <Grid container direction='row' justifyContent='center'>
                  <CircularProgress color='warning' />
                </Grid>
                : <Grid
                  container
                  spacing={3}
                >
                  <Grid item
                    xs={12}
                    md={6}
                    lg={6}
                  >
                    <Card>
                      <CardContent>
                        <CardMedia
                          component="img"
                          height="360"
                          sx={{ width: '100%', objectFit: 'contain', aspectRatio: '3/2' }}
                          image={currentProduct.mainImage}
                          title={currentProduct.model}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item
                    xs={12}
                    md={6}
                    lg={6}
                  >
                    <Card>
                      <CardContent>
                        <Typography
                          align="left"
                          gutterBottom
                          variant="body1"
                        >
                          { currentProduct.model }
                        </Typography>
                        <Typography
                          align="left"
                          gutterBottom
                          variant="h5"
                        >
                          { currentProduct.colorway }
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />
                        <Typography
                          align="left"
                          gutterBottom
                          variant="body2"
                          sx={{ mt: '1.5rem' }}
                        >
                          Sizes
                        </Typography>
                        <Grid container spacing={2}>
                          {sizes.map((size) => (
                            <Grid item key={size._id}>
                              <Button
                                variant={selectedSize === size ? 'contained' : 'outlined'}
                                onClick={() => handleSizeSelection(size)}
                              >
                                {size.number}
                              </Button>
                            </Grid>
                          ))}
                        </Grid>
                        <Stack
                          direction="row"
                          justifyContent="space-around"
                          alignItems="center"
                          spacing={2}
                          sx={{ mt: '1.5rem' }}
                        >
                          <Checkbox 
                            checked={isOnFavs}
                            onChange={handleFavButton}
                            icon={<FavoriteBorder />} 
                            checkedIcon={<Favorite />} 
                          />
                          <Typography variant="h6">
                            Price: $ { selectedSize?.goatPrice > selectedSize?.stockXPrice ? selectedSize?.goatPrice : selectedSize?.stockXPrice }
                          </Typography>
                          <Box sx={{ flexGrow: 1 }} />
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              }
            </div>
          </Stack>
        </Container>
      </Box>
    </SnkrAppLayout>
  )
}