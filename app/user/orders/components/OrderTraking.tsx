import React from 'react';

const OrderTracking = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-lg font-semibold text-gray-800">Order Tracking</h2>
        <span className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
          Order ID : #115876
        </span>
      </div>

      {/* Status & Estimated Delivery */}
      <div className="space-y-2">
        <h3 className="text-base font-medium text-gray-700">Out For Delivery</h3>
        <p className="text-sm text-gray-500">
          Estimated Delivery Date :{' '}
          <span className="font-medium text-gray-700">Monday, Jun 20</span>
        </p>

        {/* Progress Bar */}
        <div className="mt-4 space-y-3">
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-purple-600 w-1/6 float-left"></div>
            <div className="h-full bg-red-500 w-1/6 float-left"></div>
            <div className="h-full bg-green-500 w-1/6 float-left"></div>
            <div className="h-full bg-sky-500 w-1/6 float-left"></div>
            <div className="h-full bg-white w-2/6 float-left"></div>
          </div>

          {/* Legends */}
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
              Preparing <span className="text-green-600 ml-1">(Completed)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              Pickup <span className="text-green-600 ml-1">(Completed)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              In Transit <span className="text-green-600 ml-1">(Completed)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              Delivered <span className="text-blue-600 ml-1">(Pending)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipment Progress */}
      <div>
        <h3 className="text-base font-semibold text-gray-700 mb-3">
          Shipment Progress :
        </h3>

        <div className="space-y-6 pl-4 border-l-2 border-dotted border-purple-500 relative">
          {/* Timeline Item 1 */}
          <div className="relative">
            <span className="absolute -left-2.5 top-1 w-3 h-3 bg-purple-600 rounded-full border-2 border-white shadow"></span>
            <p className="text-sm font-semibold text-gray-700">
              June, 29 11:30 AM
            </p>
            <p className="text-sm text-gray-500">
              Label Created At{' '}
              <span className="text-blue-600 underline cursor-pointer">
                Hyderabad Office
              </span>{' '}
              SDNWS-NSW
            </p>
          </div>

          {/* Timeline Item 2 */}
          <div className="relative">
            <span className="absolute -left-2.5 top-1 w-3 h-3 bg-purple-600 rounded-full border-2 border-white shadow"></span>
            <p className="text-sm font-semibold text-gray-700">
              June, 30 12:43 AM
            </p>
            <p className="text-sm text-gray-500">
              Arrived at Hyderabad Local Facility -{' '}
              <span className="font-medium">SUNDAY LOCAL CENTER</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
