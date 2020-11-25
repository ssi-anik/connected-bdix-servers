import React, {useRef, useState} from "react";

export default function (props) {

    const filterListServerTxt = useRef();
    const [filteredServer, setFilteredServer] = useState([]);

    function testClickHandler () {
        props.serverTestHandler();
    }

    function disclaimerToggleHandler (e) {
        props.disclaimerVisibilityToggler();
    }

    function handleFilterListedServer (e) {
        let token = filterListServerTxt.current.value.trim().toLowerCase();
        let matches = token.match(/(https?:\/\/)?(.*)/)

        token = matches && matches[2] ? matches[2] : '';
        if ( !token.length ) {
            setFilteredServer(prevState => []);
            return;
        }

        let filteredServers = props.listedServer.filter(server => {
            return server['name'].toLowerCase().indexOf(token) > -1 || server['host'].toLowerCase().indexOf(token) > -1
        });

        setFilteredServer(prevState => filteredServers.length ? filteredServers : []);
    }

    return <div className = "col-md-4 col-xs-12" style = {{paddingBottom: '5px'}}>
        {/*Show Lifetime visitor count*/}
        <div className = "alert alert-info" role = "alert">
            Lifetime visitor: {props.lifetime}
        </div>
        {/*Show today's visitor count*/}
        <div className = "alert alert-info" role = "alert">
            Today's visitor: {props.today}
        </div>
        {/*Show total listed server count*/}
        <div className = "alert alert-info" role = "alert">
            Listed Servers: [<strong>{props.listedServer.length}</strong>]
        </div>
        {/*Show user's connection information*/}
        {Object.keys(props.connection.details).map(key => {
            return <div key = {key} className = {`alert alert-${props.connection.alert}`} role = "alert">
                {`[${key.toUpperCase()}]:`} <strong>{`${props.connection.details[key]}`}</strong>
            </div>
        })}
        {/*Test Button*/}
        <div className = "form-group">
            <div className = "btn-group btn-block" role = "group">
                <button onClick = {testClickHandler} className = "btn btn-primary">Find Available Servers</button>
                <button onClick = {disclaimerToggleHandler} className = "btn btn-warning">Disclaimer</button>
            </div>
        </div>
        <div className = "form-group">
            <input type = "text" onChange = {handleFilterListedServer} ref = {filterListServerTxt}
                   placeholder = "Search in listed servers" className = "form-control" />
            {filteredServer.length ? <small className = "form-text text-info text-right">
                Visit following websites by clicking the names
            </small> : null}
        </div>
        {filteredServer.length ? filteredServer.map((server, idx) => {
            return <table className = "table table-bordered table-sm" key = {idx}>
                <tbody>
                <tr>
                    <td>
                        <a href = {`${server['host']}`}
                           className = {`btn btn-sm btn-block btn-${server['disabled'] ? 'danger' : 'success'}`}
                           target = "_blank"
                           rel = "noopener noreferrer">
                            {`${server['name']} - [${server['category']}][${server['disabled'] ?
                                'Disabled' :
                                'Enabled'}]`}
                        </a>
                    </td>
                    <td>
                        <a className = "btn btn-sm btn-secondary btn-block"
                           target = "_blank"
                           rel = "noopener noreferrer"
                           href = {`${server['special'] ?
                               server['path'] :
                               server['host'] + server['path']}`}>Resolver ({server['resolver'] ?? 'image'})</a>
                    </td>
                </tr>
                </tbody>
            </table>;
        }) : null}
    </div>;
}