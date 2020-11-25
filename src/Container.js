import React from 'react';
import './style.css';
import AvailableServer from "./AvailableServer";
import LeftSidebar from "./LeftSidebar";

export default function Container (props) {
    return <div className = "container-fluid">
        <div className = "row" style = {{display: props.disclaimerVisibility ? 'block' : 'none'}}>
            <div className = "col-md-12 col-xs-12 col-12">
                <div className = "alert alert-secondary" role = "alert">
                    <h4 className = "alert-heading">Disclaimer!</h4>
                    <hr />
                    <ul>
                        <li>This project is not maintained by BDIX or any ISP.</li>
                        <li>Few servers may be shown as active but requires partnership with ISPs.</li>
                        <li>If the providers don't use secure HTTP (HTTPS) server, then you may not find them under active connection.</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className = "row">
            <LeftSidebar
                disclaimerVisibilityToggler = {props.disclaimerVisibilityToggler}
                listedServer = {props.listedServers}
                serverTestHandler = {props.serverTestHandler}
                connection = {props.connection}
                lifetime = {props.lifetime}
                today = {props.today} />
            <div className = "col-md-8 col-xs-12">
                {props.availableServers.length === 0 ?
                    <hr data-content = "No active server available." className = "hr-text" /> :
                    <AvailableServer availableServers = {props.availableServers} />}
            </div>
        </div>
    </div>;
}