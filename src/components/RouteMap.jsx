import React, { useMemo } from "react";
import EnhancedRouteOptimizer from "../helpers/algorithms";
import { MapPin, RefreshCw, Truck } from "lucide-react";

// Enhanced Map Component with Real Visualization
const RouteMap = ({ route, bins, depot, isOptimizing }) => {
  const mapRef = React.useRef();

  const routeCoordinates = useMemo(() => {
    if (!route.length) return [];

    const coords = [depot];
    route.forEach((binId) => {
      if (bins[binId]) {
        coords.push(bins[binId].location);
      }
    });
    coords.push(depot); // Return to depot
    return coords;
  }, [route, bins, depot]);

  const totalDistance = useMemo(() => {
    return EnhancedRouteOptimizer.calculateRouteDistance(route, bins, depot);
  }, [route, bins, depot]);

  return (
    <div className="bg-white rounded-lg border-2 border-blue-500 p-6 min-h-96">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Route Visualization
        </h3>
        {totalDistance > 0 && (
          <div className="text-sm text-gray-600">
            Distance:{" "}
            <span className="font-semibold">{totalDistance.toFixed(2)} km</span>
          </div>
        )}
      </div>

      {isOptimizing ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
            <p className="text-gray-600">Optimizing route...</p>
          </div>
        </div>
      ) : route.length > 0 ? (
        <div className="space-y-4">
          {/* Route Path Visualization */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Optimized Route Path:</h4>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                🏢 Depot
              </span>
              {route.map((binId) => (
                <React.Fragment key={binId}>
                  <span className="text-gray-400">→</span>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      bins[binId]?.priority === "CRITICAL"
                        ? "bg-red-500"
                        : bins[binId]?.priority === "HIGH"
                        ? "bg-orange-500"
                        : bins[binId]?.priority === "MEDIUM"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {binId}
                  </span>
                </React.Fragment>
              ))}
              <span className="text-gray-400">→</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                🏢 Depot
              </span>
            </div>
          </div>

          {/* Interactive Route Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {route.map((binId, index) => {
              const bin = bins[binId];
              if (!bin) return null;

              return (
                <div
                  key={binId}
                  className="bg-gray-50 p-3 rounded-lg border-l-4"
                  style={{
                    borderLeftColor:
                      bin.priority === "CRITICAL"
                        ? "#ef4444"
                        : bin.priority === "HIGH"
                        ? "#f97316"
                        : bin.priority === "MEDIUM"
                        ? "#eab308"
                        : "#22c55e",
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">
                        Stop #{index + 1}: {binId}
                      </h5>
                      <p className="text-sm text-gray-600">{bin.address}</p>
                      <div className="text-xs text-gray-500 mt-1">
                        Fill: {bin.fill_level}% | Gas: {bin.gas_level} ppm
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded text-white ${
                        bin.priority === "CRITICAL"
                          ? "bg-red-500"
                          : bin.priority === "HIGH"
                          ? "bg-orange-500"
                          : bin.priority === "MEDIUM"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {bin.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <Truck className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>
              Click "Optimize Route" to generate an efficient collection path
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default RouteMap;
