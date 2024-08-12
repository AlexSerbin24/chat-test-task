import Message from "./message";

export default interface Chat {
    id:string,
    user:string,
    firstName:string,
    lastName:string,
    messages:Message[],
    lastRead:Date
}

