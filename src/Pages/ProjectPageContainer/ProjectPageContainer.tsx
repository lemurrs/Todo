import React from "react";
import ProjectPage from "./ProjectPage/ProjectPage";
import {connect} from "react-redux";
import {ProjectCreator} from '../../redux/ProjectPage-reducer'
import {Project} from "../../Interfaces";
import {AppStateType} from "../../redux/redux-store";
import {ActionCreator} from "redux";
import {
    ProjectCreatorType,
    ProjectPageProps
} from "../../Types";

const ProjectPageContainer: React.FC<ProjectPageProps> = ({ProjectData, ProjectCreator}) => {

    return <ProjectPage ProjectData={ProjectData} ProjectCreator={ProjectCreator}/>
}

type MapStateToPropsType = {
    ProjectData: Project[]
}
type MapDispatchToPropsType = {
    ProjectCreator: ActionCreator<ProjectCreatorType>,
}
type OwnPropsType = {}


let mapStateToProps = (state: AppStateType) => ({
    ProjectData: state.ProjectPage.ProjectData
})

export default React.memo(connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {ProjectCreator})(ProjectPageContainer))

