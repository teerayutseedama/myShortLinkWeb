export interface ISaveLinkInput {
  url: string;
  newUrl: string;
}
export interface ISaveLinkOutput {
  short: string;
  newUrl: string;
}

export interface IUpdateVisitorGetLinkInput {
  short: string;
}
export interface IUpdateVisitorGetLinkOutput {
  url: string;
}
