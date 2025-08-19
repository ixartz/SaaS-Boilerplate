import Image from 'next/image';

export const Logo = () => (
  <Image
    src="/postup-logo.svg"
    alt="PostUp"
    width={140}
    height={32}
    priority
  />
);
