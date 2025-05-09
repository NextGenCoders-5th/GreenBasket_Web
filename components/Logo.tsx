import Image from 'next/image';

export const Logo = () => {
    return (
        <Image src="/logo.png" alt="GreenBasket Logo" width={32} height={32} />
    );
}