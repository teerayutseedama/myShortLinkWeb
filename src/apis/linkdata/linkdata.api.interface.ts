export interface ISaveLinkReq {
  url: string;
  newUrl: string;
}
export interface ISaveLinkRes {
  short: string;
  newUrl: string;
}

export interface IUpdateVisitorGetLinkReq {
  short: string;
}
export interface IUpdateVisitorGetLinkRes {
  url: string;
}
