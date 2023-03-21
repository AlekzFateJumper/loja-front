import * as React from 'react';
import { AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Box, Toolbar, Typography, Container, Link, Badge, IconButton } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Search from './Search.js';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Loja imaginária
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Album() {
  const [products, setProducts] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);

  const cookies = new Cookies();

  const filter = function(s) {
      if(typeof s === 'undefined' || s === '' || !s){
        setFiltered(products);
      }else{
        setFiltered(products.filter(
          (i) => (i.nome + ' ' + i.name + ' ' + i.descricao + i.description).toLowerCase().indexOf(s.toLowerCase()) > -1
        ));
      }
  };

  React.useEffect(() => {
    async function fetchData() {
      const result = await axios(
        process.env.REACT_APP_API + 'produtos',
      );
      setProducts(result.data);
      setFiltered(result.data);
    }
    fetchData();
  }, []);

  const cart = JSON.parse(cookies.get('cart') || '[]');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Grid container>
            <Grid item={true} xs={6} sx={{ display: "flex", justifyContent: "flex-start" }}>
              <StoreIcon sx={{ mr: 2, mt: .5 }} />
              <Typography variant="h6" color="inherit" noWrap>
                Loja imaginária
              </Typography>
            </Grid>
            <Grid item={true} xs={6}  sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Search onChange={ filter } />
              <IconButton>
                <CartIcon sx={{ ml: 2, mt: .6, color: "#FFF" }} />
                <Badge
                  anchorOrigin={{ vertical: "bottom" }}
                  badgeContent={"0"}
                  color={"info"}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 15,
            pb: 2,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Loja imaginária
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Escolha seus produtos
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {filtered.map((card) => (
              <Grid item key={card.fornecedor + '-' + card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image={card.imagem || card.gallery[0]}
                    alt={ card.nome || card.name }
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      { card.nome || card.name }
                    </Typography>
                    <Typography>
                      { card.descricao || card.description }
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button size="small">Adicionar ao carrinho</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
