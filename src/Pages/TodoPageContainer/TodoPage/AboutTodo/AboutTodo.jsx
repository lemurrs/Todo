import React, {useEffect, useState} from "react";
import c from "../TodoPage.module.less";
import ExtraBlock from "./ExtraBlock/ExtraBlock";
import CommentsBlock from "./CommentsBlock/CommentsBlock";
import InfoBlock from "./InfoBlock/InfoBlock";

function AboutTodo({TodoId, pathName, SetExtraAsDoneCreator, AddExtraTask, ChangeTodo, addCommentCreator,currentProject}) {

    let ActiveTodo = currentProject.Todo.filter(el => el.id === TodoId)

    return <div className={c.TodoPage__AboutTodo}>
        <ExtraBlock TodoId={TodoId} ActiveTodo={ActiveTodo} pathName={pathName} SetExtraAsDoneCreator={SetExtraAsDoneCreator} AddExtraTask={AddExtraTask}/>
        <InfoBlock TodoId={TodoId} ActiveTodo={ActiveTodo} pathName={pathName} ChangeTodo={ChangeTodo}/>
        <CommentsBlock TodoId={TodoId} ActiveTodo={ActiveTodo} pathName={pathName} addCommentCreator={addCommentCreator}/>
    </div>
}

export default React.memo(AboutTodo)