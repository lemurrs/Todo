import React, {FormEvent, useState} from "react";
import c from './ProjectPage.module.less'
import Modal from "../../../Components/Modal/Modal";
import ProjectCard from "./ProjectCard";

function ProjectPage({ProjectData, ProjectCreator}) {
    const [modalActive, setModalActive] = useState(false)

    function ModalForm() {
        const [title, setTitle] = useState('')
        function HandleSubmit(e) {
            e.preventDefault()
            ProjectCreator(title,ProjectData.length+1)
            setModalActive(false)
        }

        return (<form onSubmit={(e) => HandleSubmit(e)}>
            <input value={title} onChange={(e) => {
                setTitle(e.target.value)
            }} type={'text'} placeholder={'title'}/>
            <button>Save</button>
        </form>)
    }

    return (<section className={c.ProjectPage}>
        <div className={c.Projects}>
            {
                ProjectData.map((el) =>
                    <ProjectCard id={el.id} title={el.title} key={el.id}/>)}
        </div>
        <button onClick={() => setModalActive(true)}>Creat Project</button>
        <Modal active={modalActive} setActive={setModalActive}>
            <ModalForm/>
        </Modal>
    </section>)
}

export default React.memo(ProjectPage)