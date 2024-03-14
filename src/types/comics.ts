export interface ComicBaseResponse {
    _id: string;
    name: string;
    thumbnail: string;
    chapters: {
        _id: string;
        name: string;
        updateTime: Date;
        createTime: Date;
    }[];
    genres: {
        _id: string;
        name: string;
    }[];
    author: string;
}

export interface ComicResponse extends ComicBaseResponse {
    otherName: string[];
    description: string;
    totalViews: number;
}

export interface ComicData {
    data: ComicResponse[];
    currentPage: number;
    totalPage: number;
}

export interface ComicBaseData {
    data: ComicBaseResponse[];
    currentPage: number;
    totalPage: number;
}

export interface Comic {
    name: string;
    description: string;
    thumbnail: string;
    otherName: string[];
    follower: number;
    genres: string[];
    status: number;
    totalViews: number;
    author: string;
    createTime: Date;
    updateTime: Date;
    createBy: string;
}
