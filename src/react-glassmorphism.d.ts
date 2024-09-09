declare module '@tsamantanis/react-glassmorphism' {
    import * as React from 'react';
  
    export interface CustomCardProps {
      children?: React.ReactNode; // Cho phép children
      style?: React.CSSProperties;
      effectColor?: string;
      color?: string;
      blur?: number;
      borderRadius?: number;
    }
  
    export const CustomCard: React.FC<CustomCardProps>;
  }
  