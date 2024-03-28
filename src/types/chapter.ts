export interface Chapter {
    comicId: string;
    name: string;
    shortName: string;
    type: number;
    content: string;
    price: number;
    updateTime: Date;
    createTime: Date;
}

export interface ChapterResponse {
    _id: string;
    comicId: string;
    name: string;
    shortName: string;
    type: number;
    content: string;
    price: number;
    updateTime: Date;
    createTime: Date;
    totalViews: number;
}
