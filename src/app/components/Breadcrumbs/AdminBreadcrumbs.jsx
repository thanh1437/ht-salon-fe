import React, { Fragment } from 'react';
import { NavigateNext, Home } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
export default function AdminBreadcrumbs({ routeSegments }) {
    return (
        <div className="d-flex-align-center position-relative">
            {routeSegments ? (
                <Fragment>
                    <h4 className="m-0 pb-2 fs-16 text-capitalize align-middle">
                        {routeSegments[routeSegments.length - 1]['name']}
                    </h4>
                    <h4 className="m-0 pb-2 ml-8 text-hint">|</h4>
                </Fragment>
            ) : null}
            <NavLink to="/">
                <Home
                    className="align-middle ml-8 mb-1"
                    fontSize="large"
                    color="primary"
                />
            </NavLink>
            {routeSegments
                ? routeSegments.map((route, index) => (
                      <Fragment key={index}>
                          <NavigateNext
                              className="text-hint"
                              fontSize="medium"
                          />
                          {route.path ? (
                              <NavLink to="/">
                                  <span className="text-capitalize text-muted link--hover">
                                      {route.name}
                                  </span>
                              </NavLink>
                          ) : (
                              <span className="text-capitalize text-muted">
                                  {route.name}
                              </span>
                          )}
                      </Fragment>
                  ))
                : null}
        </div>
    );
}
