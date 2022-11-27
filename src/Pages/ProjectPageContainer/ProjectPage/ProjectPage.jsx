import React, {useState} from "react";
import c from './ProjectPage.module.less'
import Modal from "../../../Components/Modal/Modal";
import ProjectCard from "./ProjectCard";
import {Link} from "react-router-dom";

function ProjectPage({ProjectData, ProjectCreator}) {
    const [modalActive, setModalActive] = useState(false)

    function ModalForm() {
        const [title, setTitle] = useState('')

        function HandleSubmit(e) {
            e.preventDefault()
            ProjectCreator(title, ProjectData.length + 1)
            setModalActive(false)
        }
        return (<form className={c.ProjectPage__form} onSubmit={(e) => HandleSubmit(e)}>
            <input value={title} pattern={"[A-Za-z0-9]+"} title="Only english alphabet" onChange={(e) => {
                setTitle(e.target.value)
            }} type={'text'} placeholder={'Name Project'}/>
            <button disabled={!title}>Save</button>
        </form>)
    }
    return (<section className={c.ProjectPage}>
        <div className={c.ProjectPage__Button}>
            <button onClick={() => setModalActive(true)}>Create Project</button>
        </div>
        <div className={c.Projects}>
            {
                ProjectData.map((el) => <Link to={el.name} key={el.id}>
                    <ProjectCard id={el.id} title={el.name} key={el.id}/>
                    </Link>
                )}
        </div>

        <Modal active={modalActive} setActive={setModalActive}>
            <ModalForm/>
        </Modal>
    </section>)
}

export default React.memo(ProjectPage)