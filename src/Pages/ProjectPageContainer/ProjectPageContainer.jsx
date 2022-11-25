import React from "react";
import ProjectPage from "./ProjectPage/ProjectPage";
import {connect} from "react-redux";
import {ProjectCreator} from '../../redux/ProjectPage-reducer'

function ProjectPageContainer({ProjectData, ProjectCreator}) {

    return <ProjectPage ProjectData={ProjectData} ProjectCreator={ProjectCreator}/>
}

let mapStateToProps = (state) => ({
    ProjectData: state.ProjectPage.ProjectData
})

export default connect(mapStateToProps, {ProjectCreator})(ProjectPageContainer)

