export interface VideoProject {
  id: string;
  title: string;
  youtubeId: string;
  category: string;
  tags: string[];
  description: string;
  isShort?: boolean;
}

export interface GraphicProject {
  id: string;
  filename: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
}
