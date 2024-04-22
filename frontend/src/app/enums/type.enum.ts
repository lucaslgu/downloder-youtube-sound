export enum TypeOptions{
    MUSIC = "music",
    VIDEO = "video"
  }
  
  export class TypeEnum {
      static Type = [
        { value: TypeOptions.MUSIC, label: 'Música' },
        { value: TypeOptions.VIDEO, label: 'Vídeo' },
      ];
      
      static getDescription(value:string) {
        let _item = this.Type.find(item => item.value == value);
        if (_item)
            return _item.label;
        return '';
      }
  }