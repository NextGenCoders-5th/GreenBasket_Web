import { DisplayAddress } from '@/app/_components/AddrssComponent';
import { useAppSelector } from '@/redux/store';
import { IUser } from '@/types/user.type';

const MyAddress = () => {
    const user = useAppSelector(state => state.auth.user) as IUser | null
    

    const address = user?.address
    return (
        <DisplayAddress address={address} />
    );
};

export default MyAddress;
