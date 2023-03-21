import * as React from 'react';
import { Card, CardHeader, CardContent, List, ListItem, ListItemText, ListItemButton, IconButton } from '@mui/material';
import axios from 'axios';

export default function Cart({ data, add, remove }) {
  const [itens, setItens] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const cart = await Promise.all(data.map(async (item) => {
        console.log(item, process.env.REACT_APP_API + 'produto/' + item[0] + '/' + item[1]);
        const result = await axios(
          process.env.REACT_APP_API + 'produto/' + item[0] + '/' + item[1],
        );
        console.log("teste", result.data);
        return {...result.data, qtd: item[2]};
      }));
      setItens(cart);
    }
    fetchData();
  }, [data]);

  console.log(itens);

  return (
    <Card sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      pl: 2,
      pr: 2,
    }} >
      <CardHeader title={"Carrinho"} sx={{ textAlign: "center" }} />
      <CardContent sx={{ flexGrow: 1 }}>
      <List sx={{
        maxHeight: '50vh',
        position: 'relative',
        overflow: 'auto',
      }}>
        {itens.map( (item) => (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="remove">
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
              <ListItemButton edge="start" />
              <ListItemText edge="start" primary={item.qtd || item.qtd} />
              <ListItemButton edge="start" />
              <ListItemText primary={item.nome || item.name} />
          </ListItem>
        ))}
      </List>
      </CardContent>
    </Card>
  );
}
