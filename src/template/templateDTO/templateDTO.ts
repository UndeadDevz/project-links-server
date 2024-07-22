export interface ITemplate {
    id: string;
    owner: string;
    name: string
    links: Link[]
}

interface Link {
    name: string
    url: string
}