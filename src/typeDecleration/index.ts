export interface SingleOrgProp {
    _id: string;
    name: string;
    dashboardLink: string;
    website: string;
    github: string;
    discord: string;
    twitter: string;
    isPrivate: boolean;
    createdBy: string;
    isVerified: boolean;
    image: string;
    accounts: {
      name: string;
      address: string;
      chain: string;
    }[];
    createdDate: string;
    networks: {
      [key: string]: string;
    };
    isActive: boolean;
    isDeleted: boolean;
    isFavorited: boolean;
    balance:number
    governanceSlug:string
    lastDayBalance:number
  }