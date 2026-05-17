import React from 'react';

interface Props {
  isLoading: boolean;
  Skeleton: any;
  children: React.ReactNode;
}

export function ShowSkeletonOnLoading({ isLoading, Skeleton, children }: Props) {
  return isLoading ? <Skeleton /> : children;
}
