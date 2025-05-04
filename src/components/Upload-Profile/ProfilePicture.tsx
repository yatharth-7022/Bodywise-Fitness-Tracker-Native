// components/Upload-Profile/ProfilePicture.tsx
import React from 'react';
import { View, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ProfilePictureProps {
  src?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProfilePicture = ({ src, size = 'md', className = '' }: ProfilePictureProps) => {
  const getSize = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'md':
        return 'w-10 h-10';
      case 'lg':
        return 'w-32 h-32';
      default:
        return 'w-10 h-10';
    }
  };

  return (
    <View
      className={`${getSize()} rounded-full overflow-hidden bg-zinc-800 items-center justify-center ${className}`}
    >
      {src ? (
        <Image
          source={{ uri: src }}
          className="w-full h-full"
          resizeMode="cover"
        />
      ) : (
        <Feather
          name="user"
          size={size === 'lg' ? 64 : size === 'md' ? 20 : 16}
          color="#D6FC03"
        />
      )}
    </View>
  );
};