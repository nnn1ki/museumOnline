import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.user)

    return (
        <Switch>
            {isAuth && authRoutes.map(({path, Component}) =>
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