export type ErrorFields = {
    name?: string;
    email?: string;
    company?: string;
    position?: string;
    title?: string;
    file?: string;
    tags?: string;
    article?: string;
  };
  
export type DevTeamMemberProps = {
    name: string;
    platform: string;
    imageSrc: string;
    githubId: string;
    index: number;
  }; 

export type YoutubeSnippet = {
    title: string;
    description: string;
    tags?: string[];
    thumbnails: {
      medium: { url: string };
      maxres?: { url: string };
    };
    resourceId: {
      videoId: string;
    };
  };
  
export type YoutubeItem = {
    snippet: YoutubeSnippet;
  };

export type CardProps = {
  title: string;
  bold: string;
  href: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
};  

export type ParticlesProps = {
    id?: string;
    className?: string;
    background?: string;
    particleSize?: number;
    minSize?: number;
    maxSize?: number;
    speed?: number;
    particleColor?: string;
    particleDensity?: number;
};

export type CardPropsNew = {
    title: string;
    description: string;
  };