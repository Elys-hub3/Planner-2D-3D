export interface Wall {
    id: string
  
    startX: number
    startY: number
  
    endX: number
    endY: number
  
    thickness: number
  
    height: number
  
    material?: string
  }

  export interface WallData {
    width: number;
    height: number;
    thickness: number;
  }