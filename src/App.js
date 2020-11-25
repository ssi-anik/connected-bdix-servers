import React, {useEffect, useState} from 'react';
import TopNav from "./TopNav";
import Container from "./Container";
import {definitions} from './definitions';
import {imageResolver, serverList, today} from "./Helpers";
import 'github-fork-ribbon-css/gh-fork-ribbon.css';
import TopLoader from "react-top-loader";


export default function App () {
    const [connection, setConnection] = useState(definitions.connection);
    const [lifetimeVisitor, setLifetimeVisitor] = useState(definitions.report.lifetime);
    const [todayVisitor, setTodayVisitor] = useState(definitions.report.today);
    const [availableServers, setAvailableServers] = useState([]);
    const [serverLookupCount, setServerLookupCount] = useState(0);
    const [disclaimerVisibility, setDisclaimerVisibility] = useState(false);

    useEffect(() => {
        // get user connection information
        fetch('https://json.geoiplookup.io').then(res => res.json()).then(response => {
            if ( !response.ip ) {
                return;
            }
            setConnection(prevState => {
                return {
                    ...prevState,
                    "alert": "success",
                    "details": {
                        "ip": response.ip,
                        "isp": response.isp,
                        "connection": response.connection_type,
                        "city": `Approximate - [${response.city}]`,
                    }
                };
            });
        }).catch(error => {
            console.log("Cannot get user connection information.");
            console.log(error);
        });

        // get site lifetime visitors
        fetch(`https://api.countapi.xyz/hit/${definitions.namespace}`).then(res => res.json()).then(response => {
            setLifetimeVisitor(prevState => {
                return response.value;
            });
        }).catch(error => {
            console.log("Cannot get lifetime visitor.");
            console.log(error);
        });

        // get site daily visitors
        fetch(`https://api.countapi.xyz/hit/${definitions.namespace}-${today()}`).then(res => res.json()).then(response => {
            setTodayVisitor(prevState => {
                return response.value;
            });
        }).catch(error => {
            console.log("Cannot get today's visitor.");
            console.log(error);
        });
    }, []);

    function pingServer (server) {
        let url = server['special'] ? server['path'] : server['host'] + server['path'];

        new Promise(resolve => {
            switch ( server['type'] ) {
                case 'image':
                default:
                    imageResolver(url, resolve);
            }
        }).then(reachable => {
            setServerLookupCount(prevState => prevState - 1);

            if ( !reachable ) {
                return;
            }
            setAvailableServers(prevState => {
                return [
                    ...prevState,
                    server
                ];
            });
        });
    }

    function serverTestHandler () {
        setAvailableServers([]);
        setServerLookupCount(prevState => 0);
        let servers = serverList();
        for ( let i = 0; i < servers.length; ++i ) {
            const server = servers[i];
            if ( server.disabled ) {
                continue;
            }

            pingServer(servers[i]);
            setServerLookupCount(prevState => prevState + 1);
        }
    }

    function disclaimerToggle () {
        setDisclaimerVisibility(prevState => !prevState);
    }

    return <div>
        <TopLoader backgroundColor = "#eee6ff"
                   show = {true}
                   thickness = {serverLookupCount > 0 ? 2 : 0}
                   fixed = {true}
                   color = "#0000e4" />

        <TopNav
            name = {definitions.name} />

        <Container serverTestHandler = {serverTestHandler}
                   disclaimerVisibility = {disclaimerVisibility}
                   disclaimerVisibilityToggler = {disclaimerToggle}
                   listedServers = {serverList()}
                   availableServers = {availableServers}
                   connection = {connection}
                   lifetime = {lifetimeVisitor}
                   today = {todayVisitor} />
    </div>;
}
