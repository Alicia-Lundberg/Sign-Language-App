export type Box = {
  id: string;
  image: string;
  title: string;
  x: number;
  y: number;

};

export type DropZone = {
  id: string;
  x: number;
  y: number;
  occupiedBy: string | null;

};
