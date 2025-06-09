export interface NavigationItem {
  id: number;
  title: string;
  path: string;
}

export interface IDestination {
  id: number;
  name: string;
  year: number;
  description: string;
  event?: string;
}

export interface DestinationListProps {
  destinations: IDestination[];
}
export interface DestinationCardProps {
  destination: IDestination;
}