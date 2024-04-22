import { TypeOptions } from "../enums/type.enum";

export class DownloaderModel {

    url:string = "";
    type:string = TypeOptions.MUSIC;
  
    parseJsonToObject(jsonData:any): DownloaderModel {
      JSON.parse(jsonData);
      return this;
    }
}