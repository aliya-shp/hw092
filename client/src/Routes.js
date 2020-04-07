import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Artists from "./containers/Artists/Artists";
import NewArtist from "./containers/NewArtist/NewArtist";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";
import TrackHistories from "./containers/TrackHistories/TrackHistories";
import NewAlbum from "./containers/NewAlbum/NewAlbum";
import NewTrack from "./containers/NewTrack/NewTrack";

const ProtectedRoute = ({isAllowed, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/login" />
};

const Routes = ({user}) => {
    return (
        <Switch>
            <Route path='/' exact component={Artists}/>
            <ProtectedRoute
                isAllowed={(user && user.role === 'admin') || (user && user.role === 'user')}
                path="/artists/new"
                exact
                component={NewArtist}
            />
            <Route path='/artists/:id' component={Albums}/>
            <ProtectedRoute
                isAllowed={(user && user.role === 'admin') || (user && user.role === 'user')}
                path="/albums/new"
                exact
                component={NewAlbum}
            />
            <Route path='/albums/:id' component={Tracks}/>
            <ProtectedRoute
                isAllowed={(user && user.role === 'admin') || (user && user.role === 'user')}
                path="/tracks/new"
                exact
                component={NewTrack}
            />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/track-histories" exact component={TrackHistories} />
        </Switch>
    );
};

export default Routes;