import React from "react";
import c from './ProjectPage.module.less'

function ProjectCard({title}:{title:string}) {
    return <div className={c.Project}>
            <h1>{title}</h1>
    </div>

}

export default React.memo(ProjectCard)