'use client';
import { Role } from '@/enums/role.enum';
import { useAppSelector } from '@/redux/store';
import { IUser } from '@/types/user.type';
import { useRouter } from 'next/navigation';
import { useToast } from '@/providers/toast.provider';

interface PermissionProviderProps {
  children: React.ReactNode;
  roles: Role[];
}
const PermissionProvider: React.FC<PermissionProviderProps> = ({ children, roles }) => {
  // Getting logged in user
  const toast = useToast();
  const user = useAppSelector((state) => state.auth.user);

  // Getting router instance
  const router = useRouter();

  if (user && !roles.includes((user as IUser).role)) {
    toast.error('You do not have permission to access this page');
    router.push('/login');
  }

  return <>{children}</>;
};

export default PermissionProvider;
