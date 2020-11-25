import React from "react";

export default function TopNav (props) {
    return <nav className = "navbar navbar-dark sticky-top bg-dark mb-3 flex-md-nowrap p-0">
        <a className = "navbar-brand col-sm-3 col-md-2 mr-0" href = "./">{props.name}</a>
        <a target = "_blank" className = "github-fork-ribbon right-top fixed"
           href = "https://github.com/ssi-anik/bdix-connected-servers"
           rel = "noopener noreferrer"
           data-ribbon = "Star me on GitHub" title = "Star me on GitHub">
            Star me on GitHub
        </a>
    </nav>;
}