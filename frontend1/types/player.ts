export interface Player {
  id: number;
  name: string;
  preferredPosition: string;
  suitablePositions: string[];
  dob: number;
  lastUpgrade: number;
  level: number;
  imageURI: string;
  themeColor: string;
  textColor: string;
}

export default Player;
