import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'; 
import NavBar from './Components/NavBar';
import Grid from './Components/Grid';
import Footer from './Components/Footer';
import CustomBtn from './Components/CustomBtn';
import './App.css';
//changes to imports 
import SecurityIcon from '@material-ui/icons/Security';
import EventNoteIcon from '@material-ui/icons/EventNote';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ComputerIcon from '@material-ui/icons/Computer';
import HttpIcon from '@material-ui/icons/Http';

const theme = createMuiTheme({
  palette: {
    primary: {
      main:"#2e1667",
    },
    secondary: {
      main:"#c7d8ed",
    },
  },
  typography: {
    fontFamily: [
      'Roboto'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
      },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },
});

const styles = makeStyles({
  wrapper: {
    width: "65%",
    margin: "auto",
    textAlign: "center"
  },
  bigSpace: {
    marginTop: "5rem"
  },
  littleSpace:{
    marginTop: "2.5rem",
  },
  grid:{
    display: "flex", 
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap", 
  },
})

function App() {
  const classes = styles(); 

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar/>
        <div className={classes.wrapper}>
          <Typography variant="h2" className={classes.bigSpace} color="primary">
          34 ITEMS RECYCLED <br>
          </br>.... and Counting
          </Typography>
          <Typography variant="h5" className={classes.littleSpace} color="primary">
          Our blockchain-based platform incentivizes you to recycle with digital tokens that can be exchanged for discounts or cryptocurrencies. 
          </Typography>
          <div className={`${classes.grid} ${classes.littleSpace}`}>  
          <CustomBtn txt="Become a Recycler"/>
          <Grid icon={<ImportExportIcon style={{fill: "#fff", height:"125", width:"125"}}/>} />
          <CustomBtn txt="Support Recyclers"/>
          </div>
        </div>
        <div className={`${classes.grid} ${classes.bigSpace}`}>
        <div className={classes.wrapper}>
          <Typography variant="h2" className={classes.bigSpace} color="primary">
          About ImpactBridge
          </Typography>
          <Typography variant="h4" className={classes.bigSpace} color="primary">
          Get Rewarded for Reducing Waste
          </Typography>
          <Typography variant="h5" className={classes.littleSpace} color="primary">
          Welcome to RecycleRewards, the platform that encourages sustainable practices by incentivizing recycling, rewarding you with digital tokens that can be exchanged for discounts or cryptocurrencies. WithImpactBridge, you can make a positive impact on the environment while enjoying the benefits of our rewards program.
          </Typography>
          <Typography variant="h3" className={classes.bigSpace} color="primary">
          Transparency and Accountability in the Recycling Process
          </Typography>
          <Typography variant="h5" className={classes.littleSpace} color="primary">
          We use blockchain technology to ensure transparency and accountability in the recycling process, enabling us to monitor the number of plastic bottles recycled and the number of tokens awarded. This system promotes good health and well-being, decent work and economic growth, and mitigates the dangers of climate change due to environmental pollution.
          </Typography>
        <CustomBtn txt="View Recycle Data"/>
          
        </div>
        </div>
        
        <div className={classes.bigSpace}>
        <NavBar/>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;