import React from 'react'
import CustomBtn from './CustomBtn'
import {Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"; 

const styles = makeStyles({
    bar:{
        paddingTop: "1.15rem",
        backgroundColor: "#fff",
        ['@media (max-width:780px)']: { 
           flexDirection: "column"
          }
    },
    menuItem: {
        cursor: "pointer", 
        flexGrow: 1,
        "&:hover": {
            color:  "#4f25c8"
        },
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem"    }
    }
})

function NavBar() {
    const classes = styles()
    return (
            <Toolbar position="sticky" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>   
                <Typography variant="h4" className={classes.menuItem}>
                Impactrensic
                </Typography>
                <Typography variant="h6" className={classes.menuItem}>
                   Home
                </Typography>
                <Typography variant="h6" className={classes.menuItem}>
                    About
                </Typography>
                <Typography variant="h6" className={classes.menuItem}>
                    Community
                </Typography>
                <Typography variant="h6" className={classes.menuItem}>
                    Ecosystem 
                </Typography>
                <CustomBtn txt="Become a Recycler"/>
            </Toolbar>
    )
}

export default NavBar