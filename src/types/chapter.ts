export interface Chapter {
    comicId: string;
    name: string;
    type: number;
    content: string;
    updateTime: Date;
    createTime: Date;
}

export interface ChapterResponse {
    _id: string;
    comicId: string;
    name: string;
    type: number;
    content: string;
    updateTime: Date;
    createTime: Date;
}
