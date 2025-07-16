import { useState } from "react";
import { RefreshCw } from "lucide-react";

// Real-time Bin Status Component
const BinStatusCard = ({ binId, bin, onRefresh }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const getPriorityColor = (priority) => {
    const colors = {
      CRITICAL: "bg-red-500",
      HIGH: "bg-orange-500",
      MEDIUM: "bg-yellow-500",
      LOW: "bg-green-500",
    };
    return colors[priority] || "bg-gray-500";
  };

  const getStatusEmoji = (fillLevel) => {
    if (fillLevel >= 90) return "🔴";
    if (fillLevel >= 70) return "🟡";
    return "🟢";
  };

  const handleQuickRefresh = async () => {
    setIsUpdating(true);
    // Simulate real-time update
    setTimeout(() => {
      setIsUpdating(false);
      onRefresh();
    }, 1000);
  };

  return (
    <div
      className={`bg-white rounded-lg border-l-4 ${getPriorityColor(
        bin.priority
      ).replace(
        "bg-",
        "border-"
      )} shadow-sm hover:shadow-md transition-shadow p-4`}
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-gray-800">{binId}</h4>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-1 rounded text-white ${getPriorityColor(
              bin.priority
            )}`}
          >
            {bin.priority}
          </span>
          <button
            onClick={handleQuickRefresh}
            className="p-1 hover:bg-gray-100 rounded"
            disabled={isUpdating}
          >
            <RefreshCw
              className={`w-4 h-4 text-gray-500 ${
                isUpdating ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <p className="text-sm font-medium text-gray-700 mb-3">{bin.address}</p>

      <div className="space-y-3">
        {/* Fill Level */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Fill Level:</span>
            <span className="font-medium">{bin.fill_level}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getPriorityColor(
                bin.priority
              )}`}
              style={{ width: `${bin.fill_level}%` }}
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500">Capacity:</span>
            <p className="font-medium">{bin.capacity}L</p>
          </div>
          <div>
            <span className="text-gray-500">Gas Level:</span>
            <p className="font-medium">{bin.gas_level} ppm</p>
          </div>
        </div>

        {/* Status Summary */}
        <div className="bg-gray-50 p-3 rounded text-center">
          <div className="text-sm">
            <span className="mr-2">{getStatusEmoji(bin.fill_level)}</span>
            <span className="font-medium">
              {bin.fill_level >= 90
                ? "Needs Collection"
                : bin.fill_level >= 70
                ? "Nearly Full"
                : "Normal"}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Last: {bin.last_collection}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinStatusCard;
