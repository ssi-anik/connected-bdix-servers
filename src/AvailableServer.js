import React, {useState} from "react";

export default function AvailableServer(props) {
    const [filter, setFilter] = useState('all');

    function handleFilterCategory(category) {
        setFilter(prevState => category);
    }

    return <div>
        <div className="btn-group btn-group-sm btn-block" style={{marginBottom: '3px'}} role="group">
            <button type="button"
                    onClick={() => handleFilterCategory('all')}
                    className="btn btn-secondary">All
            </button>
            <button type="button"
                    onClick={() => handleFilterCategory('tv')}
                    className="btn btn-primary">TV
            </button>
            <button type="button"
                    onClick={() => handleFilterCategory('ftp')}
                    className="btn btn-info">FTP
            </button>
            <button type="button"
                    onClick={() => handleFilterCategory('movie')}
                    className="btn btn-success">Movie
            </button>
        </div>
        <table className="table table-sm">
            <caption style={{
                captionSide: "top",
                textAlign: "center",
                background: "#9dcca8",
                padding: "2px",
                marginBottom: "3px",
                color: "#ffffff"
            }}>{`Total ${props.availableServers.length} available server(s)`}</caption>
            <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {props.availableServers.filter(server => {
                    return filter === 'all' || server['category'].toLowerCase() === filter;
                }).map((server, idx) => {
                    return <tr key={server['category'] + '-' + server['host']}>
                        <td>{idx + 1}</td>
                        <td>{server['category']}</td>
                        <td>
                            <a target='_blank'
                               rel="noopener noreferrer"
                               className="btn btn-block btn-info"
                               href={server['host']}>{server['name']}</a>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
};