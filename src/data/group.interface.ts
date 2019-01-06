import { GroupAddPage } from "../pages/group-add/group-add";

export interface Group {
    id: string,
    img: string,
    owner: string,
    members: any [],
    isPublic: boolean,
    shortDescription: string,
    organizers: any[],
}

