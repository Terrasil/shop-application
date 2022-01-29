import React  from 'react';
import {Button} from 'react-bootstrap';
import {Footer, Header} from './components/komponenty'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {InputAdornment, Grid, TextField, Button as ButtonMUI} from "@material-ui/core"
import { AccountCircle, LockRounded } from '@material-ui/icons';

import Select from 'react-select'

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";

function App() {
    const [theme, setDarkTheme] = React.useState(false)
    return (
        <div class={theme ? 'dark-theme' : 'light-theme'}>
            <Header></Header>
            <div class="sep">
               <Router>{/* <Router> z ModernUI*/}
                    <nav class="menu shadow">
                        <ul>
                            <li>
                                <Link to="/">Strona główna</Link>{/* <Link> z ModernUI*/}
                            </li>
                            <li>
                                <Link to="/oferty">Lista ofert</Link>
                            </li>
                            <li>
                                <Link to="/dodaj">Dodaj ofertę</Link>
                            </li>
                            <li id="theme">
                                <Button variant={theme ? 'light' : 'dark'} onClick={() => setDarkTheme(theme => !theme)}>
                                    {theme ? 'Light Mode' : 'Dark Mode'}
                                </Button> 
                            </li>
                            <li id="theme">
                               <Select/>
                            </li>
                        </ul>
                    </nav>
                    <Switch>{/* <Switch> z ModernUI*/}
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/oferty">
                            <TutorialsList />
                        </Route>
                        <Route path="/dodaj">
                            <AddTutorial />
                        </Route>
                        <Route path="/edytuj/:id" component={Tutorial}/>
                        <Route path="/">
                        </Route>
                    </Switch>
                </Router>    
            </div>
            <Footer></Footer>
        </div>      
    );
}

function Login() {
    return (
        <div class="login-panel">
            <Grid container style={{minHeight: '67vh'}}> {/* <Grid> z ModernUI*/}
                <Grid container item xs={12} sm={12} alignItems='center' direction='column' justify="space-between" style={{padding: 10}}>
                    <div/>
                    <div style={{display:'flex', flexDirection:'column', maxWidth:360, minWidth:360}}>
                        <Grid container justify="center">
                            <h2>Panel Logowania</h2>
                        </Grid>
                        <TextField label='Login' margin='normal' InputProps={{startAdornment:<InputAdornment><AccountCircle/></InputAdornment>}}/> {/* <TextField> z ModernUI*/}
                        <TextField label='Hasło' margin='normal' InputProps={{startAdornment:<InputAdornment><LockRounded/></InputAdornment>}}/> {/* Dodatkowo ikony */}
                    <div style={{height:20}}/>
                        <ButtonMUI variant='contained' style={{margin:'auto',display:'flex', flexDirection:'column', maxWidth:240, minWidth:240}}> {/* <Button> z ModernUI*/}
                            Zaloguj
                        </ButtonMUI>
                    </div>
                    <div/>
                </Grid>
            </Grid>
        </div>
    );
}
export default App;