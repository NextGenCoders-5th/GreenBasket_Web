'use client';

import DeleteFeature, { FeatureDeleteActionType } from '@/components/modals/DeleteFetureDialog';
import { ClassName } from '@/enums/classnames.enum';
import { useDeleteUserMutation } from '@/redux/api/user.api';
import { ArrowLeft, KeyRound, Mail, Activity, ShieldCheck } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import EditUserDialog from '../_compnents/EditUser';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminUserLayout = ({ children }: LayoutProps) => {
  // Getting router instance
  const router = useRouter();
  // State to delete user
  const { userId } = useParams();

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 p-4 sm:p-6 gap-4 items-center justify-start">
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full">
        {/* Header */}
        <div className="flex px-4 sm:px-6 flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <button className="flex cursor-pointe hover:shadow-md items-center gap-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-md" title="Back" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>

          

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 items-center justify-end ">
         <EditUserDialog />
          <DeleteFeature feature="user" useDelete={useDeleteUserMutation as FeatureDeleteActionType} redirectUrl="/admin/users" featureId={userId as string} />

          <button className={` ${ClassName.BUTTON} bg-accent-500/90 hover:bg-accent-500`} title="Reset Password">
            <KeyRound className="w-4 h-4" />
            <span className="hidden sm:inline">Reset Password</span>
          </button>
          <button className={` ${ClassName.BUTTON} bg-yellow-500/90 hover:bg-yellow-500`} title="Send Onboarding Email">
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Send Onboarding Email</span>
          </button>
          <button className={` ${ClassName.BUTTON} bg-gray-700/90 hover:bg-gray-700`} title="View Activity Log">
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline">View Activity Log</span>
          </button>
          <button className={` ${ClassName.BUTTON} bg-gray-500/90 hover:bg-gray-500`} title="View Permissions">
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">View Permissions</span>
          </button>
        </div>
        </div>

      {/* Content */}
      <div className="bg-white flex-1 rounded-lg p-4 sm:p-6 w-full">{children}</div>
    </div>
    </div>
  );
};

export default AdminUserLayout;
