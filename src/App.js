import './App.css';
import Movies from "./components/Movies";
import NavBar from "./components/navbar";
import {Redirect, Route, Switch} from "react-router-dom";
import jwtDecode from 'jwt-decode';
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/not-found";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/MovieForm";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Component} from "react";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {

    state = {};

    componentDidMount() {
        try{
            const jwt = localStorage.getItem("tokenKey");
            const user = jwtDecode(jwt);
            this.setState({ user });

        } catch(ex){

        }
    }

    render() {
        return (
            <>
                <ToastContainer/>
                <NavBar user={this.state.user}/>
                <main className="container mt-4">
                    <Switch>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/register" component={RegisterForm}/>
                        <ProtectedRoute path="/movies/new" component={MovieForm} />
                        <ProtectedRoute path="/movies/:id" component={MovieForm} />
                        <Route path="/movies" exact render={props => <Movies {...props} user={this.state.user} />}/>
                        <Route path="/rentals" component={Rentals}/>
                        <Route path="/customers" component={Customers}/>
                        <Route path="/not-found" component={NotFound}/>
                        <Redirect from="/" exact to="/movies"/>
                        <Redirect to="/not-found"/>
                    </Switch>

                </main>
            </>
        )
    }



}

export default App;