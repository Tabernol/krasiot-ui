
import React from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";

export interface ProtectedRouteProps
    extends Omit<RouteProps, "component" | "render" | "children"> {
    authenticated: boolean;
    authenticationPath: string;
    redirectPathOnAuthentication: string;
    children?: React.ReactNode;
}

export function PrivateRoute(props: ProtectedRouteProps) {
    const { authenticated, authenticationPath, redirectPathOnAuthentication, ...rest } = props;
    const currentLocation = useLocation();

    const redirectPath = authenticated
        ? redirectPathOnAuthentication
        : authenticationPath;

    if (redirectPath !== currentLocation.pathname) {
        return <Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />;
    }

    return <Route {...rest} />;
}
