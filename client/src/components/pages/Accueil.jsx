import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 1440,
    background:'#351f39',
     color: '#726a95',
     padding :"32px 16px"
  },
  media: {
    height: 220,
  },
  container: {
    height: '100vh',
    // background: '#a0c1b8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg_button :{
    marginTop: 24,
    background:'#a0c1b8',
    color:"white",
    fontWeight:'bold', 

  },
  parag:{
    color: '#726a95',
  },
  flex:{
    display:'flex',
    justifyContent:'space-evenly'
  }
});

export default function Accueil()
{
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={Logo}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Billionair
            </Typography>
            <Typography className={classes.parag} variant="body2" color="textSecondary" component="p">
              Inscriver Vous et rejoinier notre jeux Plusieur partisipent en ligne <br /> rejoigner la team billionair et tester vos connaissance de code avec des quize c'ets fun ,plaine de nouveauté vous attendent
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.flex}>
          <NavLink exact to="/register">
            <Button variant="contained"  className={classes.bg_button}>
              Register
              </Button>
          </NavLink>
          <NavLink exact to="/login">
            <Button variant="contained"  className={classes.bg_button}>
              Login
              </Button>
          </NavLink>
        </CardActions>
      </Card>
    </div>
  );
}
