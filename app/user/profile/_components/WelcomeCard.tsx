import { useAppSelector } from "@/redux/store";
import { IUser } from "@/types/user.type";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
interface Props {
  withBtn?: boolean
}
export default function WelcomeCard({ withBtn = true }: Props) {
  const user = useAppSelector((state) => state.auth.user) as unknown as IUser | null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className=" w-full flex flex-col  md:flex-row justify-between items-center gap-2 mb-4"
    >
      <div className="bg-gradient-to-r w-full from-green-600 to-green-400 text-white  rounded-2xl p-4 px-6 flex justify-between items-center text-center space-y-4">
        <div className="flex items-start text-start gap-1 flex-col">
          <h1 className="text-3xl font-bold">Welcome {user?.first_name}!</h1>
          <p className="text-base">
            Order you favorite fresh fruits and vegetables from the comfort of your home.
          </p>
          {
            withBtn && <Link
              href="/marketplace"
              className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-green-400/80 hover:bg-green-400 text-white transition duration-300 ease-in-out text-center shadow-sm hover:shadow dark:shadow-indigo-900/20"
            >
              Order now
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          } 
        </div>
        <div className="bg-white rounded-full p-3 ">
          <Sparkles className="h-8 w-8 text-purple-600" />
        </div>

      </div>
    </motion.div>
  );
}
