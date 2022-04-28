export interface DocumentVault {
    parentFolderId: number;
    branchId: string;
    organizationalId: string;
    globalCustomerId: string;
    name: string;
    parentLink: string;
    createdAt: Date;
    userStatus: boolean;
    dealerStatus: boolean;
    eventFolderList: EventFolderList[];
}

export interface EventFolderList {
    eventFolderId: number;
    link: string;
    folderName: string;
    documents: Document[];
}

export interface Document {
    documentId: number;
    link: string;
    documentName: string;
    fileType: string;
    methodType: string;
}
