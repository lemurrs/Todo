import React from "react";
import c from './ProjectPage.module.less'
import {Link} from "react-router-dom";

function ProjectCard({title}) {

    return <div className={c.Project}>
        <Link to={title}>
            <h1>{title}</h1>
        </Link>
    </div>

}

export default React.memo(ProjectCard)