import MapComponent from '@/components/map';
import { useGetMyAddressQuery } from '@/redux/api/address.api';
import { useAppSelector } from '@/redux/store';
import { IUser } from '@/types/user.type';
import {
    Building2,
    MapPinHouse,
    Globe,
    Landmark,
    LocateIcon,
    MapPin,
    LoaderCircle,
} from 'lucide-react';

const UserAddress = () => {
    const user = useAppSelector(state => state.auth.user) as IUser | null
    const { data, isLoading, error } = useGetMyAddressQuery();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-10">
                <div className="text-center">
                    {/* Loading Indicator */}
                    <div className="mb-6">
                        <LoaderCircle
                            strokeWidth={1}
                            className="w-16 h-16 text-accent-500 animate-spin"
                        />
                        {/* <div className="w-16 h-16  border-t-2 border-accent-500 rounded-full animate-spin"></div> */}
                    </div>
                    {/* Loading Text */}
                    {/* <p className="text-xl font-semibold text-gray-700">Loading...</p> */}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-10">
                <span>Error occured during fetching address</span>
            </div>
        )
    }

    const address = data?.data?.data

    if (!address) {
        return (
            <div className="flex flex-col items-center justify-center h-10">
                <span className=' italic '>No address found please add first</span>
            </div>
        )
    }

    const { street, country, city, sub_city, zip_code, latitude, longitude } = address;

    return (
        <div className="grid gap-3 text-sm  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-slate-600 ">
            <div className="flex items-center text-xs gap-2">
                <Landmark size={16} />
                <div className="flex flex-col ">
                    <span>Street</span>
                    <span className="font-medium">{street}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Building2 size={16} />
                <div className="flex flex-col ">
                    <span >City</span>
                    <span>{city}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <MapPinHouse size={16} />
                <div className="flex flex-col ">
                    <span >Sub-city</span>
                    <span>{sub_city}</span>
                </div>

            </div>
            <div className="flex items-center gap-2">
                <MapPin size={16} />
                <div className="flex flex-col ">
                    <span >Zip Code</span>
                    {/* <span>{zip_code}</span> */}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Globe size={16} />

                <div className="flex flex-col ">
                    <span >Country</span>
                    <span>{country}</span>
                </div>
            </div>
            <div className="flex items-center flex-col gap-2">
                <span>
                  Latitude,  Logitude 
                </span>
                <MapComponent
                    markers={[{ id: 0, name: user?.email || "You", location: [latitude, longitude] }]}
                    center={[latitude, longitude] }
                    zoom={13}
                    triggerText='See on map'
                />
            </div>
        </div>
    );
};

export default UserAddress;
