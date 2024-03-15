export interface Transaction {
    _id: string;
    amount: number;
    sourceId: string;
    targetId: string;
    type: number;
    status: number;
    createTime: Date;
    updateTime: Date;
}

export interface TransactionResponse {
    _id: string;
    amount: number;
    sourceId: string;
    targetId: string;
    type: number;
    status: number;
    createTime: Date;
    updateTime: Date;
}

export interface TransactionData {
    data: TransactionResponse[];
    currentPage: number;
    totalPage: number;
}
