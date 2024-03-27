export interface Viewer {
    comicId: string;
    chapterId: string;
    userId: string;
    createTime: Date;
}

export interface ViewerResponse {
    _id: string;
    comicId: string;
    chapterId: string;
    userId: string;
    createTime: Date;
}
