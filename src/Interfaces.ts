
export interface ExtraTask {
    id:number,
    text:string,
    status:string
}
export interface IComments {
    id:number,
    parentId:number,
    text:string,
}
export interface ITodo {
    name: string,
    id: number,
    title: string,
    description: string,
    priority: string,
    created: Date,
    deadLine: Date,
    status: string,
    extraTasks:ExtraTask[],
    comments:IComments[],
    files:File[]
}
export interface Project {
    name:string,
    id:number,
    Todo:ITodo[]
}