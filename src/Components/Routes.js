import React, { useContext } from 'react';
import SessionContext from './session/SessionContext';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../pages/NotFound';
// import Home from '../pages/Home';
import LoginPage from '../Components/LoginPage/LoginPage'
import HomeUserPosts from '../Components/HomeUserPosts/HomeUserPosts'
import RegisterPage from './RegisterPage/RegisterPage';
import PostDetails from './PostDetails/PostDetails';
import PostUpload from './PostUpload/PostUpload';
import LostItemsPage from './LostItemsPage/LostItemsPage';
import FoundItemsPage from './FoundItemsPage/FoundItemsPage';
import CateegoryItemsPage from './CategoryItemsPage/CategoryItemsPage';
import UserProfile from './UserProfile/UserProfile';
import UserPosts from './UserPosts/UserPosts';
import PostEdit from './PostEdit/PostEdit';
export default function Routes() {

    const {
        session: { user: { access_token, role } }
    } = useContext(SessionContext);

    return (
        <Switch>
            <PublicRoute path="/" component={LoginPage} exact access_token={access_token} />
            <PublicRoute path="/Register" component={RegisterPage} exact access_token={access_token} />
            

            {/* here are the users routes */}
            <PrivateRoute path="/HomeUser" component={HomeUserPosts} exact access_token={access_token} role={role}/>
            <PrivateRoute path="/PostDetails/:id" component={PostDetails} exact access_token={access_token} role={role}/>
            <PrivateRoute path="/PostUpload" component={PostUpload} exact access_token={access_token} role={role}/>
            <PrivateRoute path="/LostItems" component={LostItemsPage} exact access_token={access_token} role={role}/>
            <PrivateRoute path="/FoundItems" component={FoundItemsPage} exact access_token={access_token} role={role}/>
            <PrivateRoute path="/catItems/:data" component={CateegoryItemsPage} exact access_token={access_token} role={role}/>
            <PrivateRoute path="/Profile" component={UserProfile} exact access_token={access_token} role={role}/>
            <PrivateRoute path="/Posts" component={UserPosts} exact access_token={access_token} role={role} />
            <PrivateRoute path="/PostEdit/:id" component={PostEdit} exact access_token={access_token} role={role} />

            {/* here are the Admin routes */}
            <PrivateRoute path="/HomeAdmin"  exact access_token={access_token} role={role}/>
            

            {/* <PrivateRoute path="/" component={Home} access_token={access_token} role={role} exact /> */}
            <Route component={NotFound} />
        </Switch>
    );
}

function PublicRoute({ path, component: Component,role, access_token, ...props }) {
    return (
        <Route {...props} path={path} render={props => access_token ?
            <Redirect to={(role==="1")?'/HomeAdmin': '/HomeUser'} /> :
            <Component {...props} />
        } />
    )
}


function PrivateRoute({ path, component: Component, access_token, role, ...props }) {
    return (
        <Route {...props} path={path} render={props => {

            let redirectTo = null;
            if (!access_token) redirectTo = "/";

            switch (role) {
                case "1":
                    if (['/','/HomeAdmin'].includes(path)) redirectTo='/HomeUser';
                    break;
                case "2":
                    if (['/','/HomeUser'].includes(path)) redirectTo='/HomeAdmin';
                    break;
                default:
                    break;
            }

            if (redirectTo) return <Redirect to={redirectTo} />;
            return <Component {...props} />;

        }} />
    )
}