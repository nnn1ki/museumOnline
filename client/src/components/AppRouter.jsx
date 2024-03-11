import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";

// его можно не менять

const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} exact path={path} component={Component}/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} exact path={path} component={Component}/>
            )}

            <Redirect to={SHOP_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;