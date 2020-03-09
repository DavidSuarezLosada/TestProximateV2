export interface Menu {
  
    Children?: Menu[];
    Id:number;
    FolderId:number;
    Code:String;
    Name:String;
    RouteLink:String;
    Icon:String;
    IsFolder:boolean;
    ShowInApp:boolean;
    
  }