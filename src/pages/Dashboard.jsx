import { useState, useEffect, useCallback } from "react";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { app } from "../helpers/authFirebase";
import EnhancedRouteOptimizer from "../helpers/algorithms";
import {
  Truck,
  RefreshCw,
  Download,
  Settings,
  BarChart3,
  Clock,
  Fuel,
  Leaf,
  Navigation,
  Zap,
  Wifi,
  WifiOff,
} from "lucide-react";
import RouteMap from "../components/RouteMap";
import BinStatusCard from "../components/BinStatusCard";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import useStore from "../state";

const Dashboard = () => {
  const nav = useNavigate();

    const { user } = useStore();
  // Firebase and Connection State
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  const [optimizedRoute, setOptimizedRoute] = useState([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [algorithm, setAlgorithm] = useState("genetic");
  const [truckCapacity, setTruckCapacity] = useState(6);
  const [routeStats, setRouteStats] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [database, setDatabase] = useState(null);

  const depotLocation = [37.765, -122.42];

  const auth = getAuth(app);
  const userInfo = auth.currentUser;

  const db = getDatabase(app);

  function getRandomPastDate(daysBack = 7) {
  const today = new Date();
  const pastDate = new Date();
  const randomDays = Math.floor(Math.random() * daysBack);
  pastDate.setDate(today.getDate() - randomDays);
  return pastDate.toISOString().split("T")[0];
}

  // App State management
  const [binsData, setBinsData] = useState({
    BIN_001: {
      location: [37.7749, -122.4194],
      fill_level: 85,
      priority: "HIGH",
      address: "Main Street Corner",
      capacity: 100,
      gas_level: 450,
      last_collection: getRandomPastDate(),
    },
    BIN_002: {
      location: [37.7849, -122.4094],
      fill_level: 92,
      priority: "CRITICAL",
      address: "Central Park East",
      capacity: 80,
      gas_level: 600,
      last_collection: getRandomPastDate(),
    },
    BIN_003: {
      location: [37.7649, -122.4294],
      fill_level: 78,
      priority: "MEDIUM",
      address: "Shopping Mall West",
      capacity: 120,
      gas_level: 320,
      last_collection: getRandomPastDate(),
    },
    BIN_004: {
      location: [37.7949, -122.3994],
      fill_level: 45,
      priority: "LOW",
      address: "University Campus",
      capacity: 90,
      gas_level: 180,
      last_collection: getRandomPastDate(),
    },
    BIN_005: {
      location: [37.7549, -122.4394],
      fill_level: 67,
      priority: "MEDIUM",
      address: "Residential District",
      capacity: 70,
      gas_level: 250,
      last_collection: getRandomPastDate(),
    },
    BIN_006: {
      location: [37.7449, -122.4494],
      fill_level: 95,
      priority: "CRITICAL",
      address: "Industrial Zone",
      capacity: 150,
      gas_level: 750,
      last_collection: getRandomPastDate(),
    },
    BIN_007: {
      location: [37.7349, -122.4594],
      fill_level: 34,
      priority: "LOW",
      address: "Beach Boardwalk",
      capacity: 85,
      gas_level: 120,
      last_collection: getRandomPastDate(),
    },
    BIN_008: {
      location: [37.7249, -122.4694],
      fill_level: 88,
      priority: "HIGH",
      address: "City Hall Plaza",
      capacity: 95,
      gas_level: 380,
      last_collection: getRandomPastDate(),
    },
  });

  // Initialize Firebase Connection
  useEffect(() => {
    const initDB = async () => {
      try {
        if (db) {
          setDatabase(db);
          setIsConnected(true);

          onValue(ref(db, ".info/connected"), (snapshot) => {
            setIsConnected(snapshot.val() === true);
          });

          // Load initial data directly here to avoid dependency issues
          try {
            const snapshot = await get(ref(db, "bins"));
            const firebaseData = snapshot.val();

            if (firebaseData) {
              const transformedData = {};
              Object.keys(firebaseData).forEach((binId) => {
                const bin = firebaseData[binId];
                transformedData[binId] = {
                  location: bin.location || [
                    37.7749 + Math.random() * 0.01,
                    -122.4194 + Math.random() * 0.01,
                  ],
                  fill_level: bin.fill_level || Math.floor(Math.random() * 100),
                  priority: bin.priority || "MEDIUM",
                  address: bin.address || `Location ${binId}`,
                  capacity: bin.capacity || 100,
                  gas_level: bin.gas_level || Math.floor(Math.random() * 1000),
                  last_collection:
                    bin.last_collection ||
                    new Date().toISOString().split("T")[0],
                };

                if (transformedData[binId].fill_level >= 90)
                  transformedData[binId].priority = "CRITICAL";
                else if (transformedData[binId].fill_level >= 70)
                  transformedData[binId].priority = "HIGH";
                else if (transformedData[binId].fill_level >= 50)
                  transformedData[binId].priority = "MEDIUM";
                else transformedData[binId].priority = "LOW";
              });

              setBinsData(transformedData);
              setLastUpdate(new Date());
              console.log(
                "✅ Initial data loaded from Firebase:",
                Object.keys(transformedData).length,
                "bins"
              );
            }
          } catch (dataError) {
            console.error("❌ Error loading initial Firebase data:", dataError);
          }
        } else {
          console.warn("Firebase not available, using sample data");
          setConnectionError("Firebase SDK failed to load");
        }
      } catch (error) {
        console.error("Firebase connection error:", error);
        setConnectionError(error.message);
      }
    };

    initDB();
  }, []);

  // Load data from Firebase
  const loadFirebaseData = useCallback(async (db) => {
    if (!db) return;

    try {
      const snapshot = await get(ref(db, "bins"));
      const firebaseData = snapshot.val();

      if (firebaseData) {
        // Transform Firebase data to match our structure
        const transformedData = {};
        Object.keys(firebaseData).forEach((binId) => {
          const bin = firebaseData[binId];
          transformedData[binId] = {
            location: bin.location || [
              37.7749 + Math.random() * 0.01,
              -122.4194 + Math.random() * 0.01,
            ],
            fill_level: bin.fill_level || Math.floor(Math.random() * 100),
            priority: bin.priority || "MEDIUM",
            address: bin.address || `Location ${binId}`,
            capacity: bin.capacity || 100,
            gas_level: bin.gas_level || Math.floor(Math.random() * 1000),
            last_collection:
              bin.last_collection || new Date().toISOString().split("T")[0],
          };

          // Calculate priority based on fill level if not set
          if (transformedData[binId].fill_level >= 90)
            transformedData[binId].priority = "CRITICAL";
          else if (transformedData[binId].fill_level >= 70)
            transformedData[binId].priority = "HIGH";
          else if (transformedData[binId].fill_level >= 50)
            transformedData[binId].priority = "MEDIUM";
          else transformedData[binId].priority = "LOW";
        });

        setBinsData(transformedData);
        setLastUpdate(new Date());
        console.log(
          "Data loaded from Firebase:",
          Object.keys(transformedData).length,
          "bins"
        );
      }
    } catch (error) {
      console.error("Error loading Firebase data:", error);
      setConnectionError(error.message);
    }
  }, []);

  // Simulate data update (fallback)
  const simulateDataUpdate = useCallback(() => {
    setBinsData((prevData) => {
      const newData = { ...prevData };
      Object.keys(newData).forEach((binId) => {
        const bin = newData[binId];
        const fillChange = (Math.random() - 0.3) * 5;
        bin.fill_level = Math.max(
          0,
          Math.min(100, bin.fill_level + fillChange)
        );

        const gasChange = (Math.random() - 0.5) * 50;
        bin.gas_level = Math.max(0, Math.min(1023, bin.gas_level + gasChange));

        if (bin.fill_level >= 90) bin.priority = "CRITICAL";
        else if (bin.fill_level >= 70) bin.priority = "HIGH";
        else if (bin.fill_level >= 50) bin.priority = "MEDIUM";
        else bin.priority = "LOW";
      });
      return newData;
    });
    setLastUpdate(new Date());
  }, []);

  // Enhanced data refresh that pulls from Firebase
  const refreshFireBaseData = useCallback(async () => {
    setIsRefreshing(true);

    if (database && isConnected) {
      try {
        await loadFirebaseData(database);
        console.log("✅ Data refreshed from Firebase");
      } catch (error) {
        console.error("❌ Error refreshing from Firebase:", error);
        // Fallback to local simulation if Firebase fails
        simulateDataUpdate();
      }
    } else {
      // Simulate data changes if no Firebase connection
      simulateDataUpdate();
      console.log("📡 Simulated data update (no Firebase connection)");
    }

    setIsRefreshing(false);
  }, [database, isConnected, loadFirebaseData, simulateDataUpdate]);

  // Real-time data polling from Firebase
  useEffect(() => {
    const interval = setInterval(() => {
      if (database && isConnected) {
        loadFirebaseData(database);
      } else {
        simulateDataUpdate();
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [database, isConnected, loadFirebaseData, simulateDataUpdate]);

  // Enhanced optimization function
  const optimizeRoute = useCallback(async () => {
    if (isOptimizing) return;

    setIsOptimizing(true);

    // Simulate processing time for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      let result;

      switch (algorithm) {
        case "genetic":
          result = EnhancedRouteOptimizer.geneticAlgorithm(
            binsData,
            depotLocation,
            truckCapacity,
            120
          );
          break;
        case "ant_colony":
          result = EnhancedRouteOptimizer.antColonyOptimization(
            binsData,
            depotLocation,
            truckCapacity,
            80
          );
          break;
        case "nearest_neighbor":
          result = EnhancedRouteOptimizer.nearestNeighbor(
            binsData,
            depotLocation,
            truckCapacity
          );
          break;
        default:
          result = EnhancedRouteOptimizer.geneticAlgorithm(
            binsData,
            depotLocation,
            truckCapacity
          );
      }

      setOptimizedRoute(result.route || []);

      // Calculate enhanced statistics
      const estimatedTime = Math.round(
        (result.distance / 40) * 60 + (result.route?.length || 0) * 15
      );
      const fuelConsumption = result.distance / 8.5;
      const fuelCost = fuelConsumption * 1.5;
      const co2Emissions = result.distance * 2.3;

      const stats = {
        distance: result.distance,
        estimatedTime,
        fuelConsumption: fuelConsumption.toFixed(2),
        fuelCost: fuelCost.toFixed(2),
        co2Emissions: co2Emissions.toFixed(2),
        binsCollected: result.route?.length || 0,
        efficiency: result.fitness
          ? Math.min(95, 70 + result.fitness / 1000).toFixed(1)
          : "85.0",
      };

      setRouteStats(stats);
    } catch (error) {
      console.error("Optimization failed:", error);
    } finally {
      setIsOptimizing(false);
    }
  }, [algorithm, truckCapacity, binsData, isOptimizing]);

  // Manual data refresh
  const refreshData = useCallback(() => {
    setBinsData((prevData) => {
      const newData = { ...prevData };
      Object.keys(newData).forEach((binId) => {
        const bin = newData[binId];
        const fillChange = (Math.random() - 0.3) * 5;
        bin.fill_level = Math.max(
          0,
          Math.min(100, bin.fill_level + fillChange)
        );

        const gasChange = (Math.random() - 0.5) * 50;
        bin.gas_level = Math.max(0, Math.min(1023, bin.gas_level + gasChange));

        if (bin.fill_level >= 90) bin.priority = "CRITICAL";
        else if (bin.fill_level >= 70) bin.priority = "HIGH";
        else if (bin.fill_level >= 50) bin.priority = "MEDIUM";
        else bin.priority = "LOW";
      });
      return newData;
    });
    setLastUpdate(new Date());
  }, []);

  // Export functionality
  const exportRoute = useCallback(() => {
    if (optimizedRoute.length === 0) {
      alert("Please optimize a route first");
      return;
    }

    const routeData = {
      route: optimizedRoute,
      bins: optimizedRoute.map((binId) => ({
        id: binId,
        ...binsData[binId],
      })),
      algorithm,
      truck_capacity: truckCapacity,
      stats: routeStats,
      generated: new Date().toISOString(),
      depot_location: depotLocation,
    };

    const blob = new Blob([JSON.stringify(routeData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `optimized_route_${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [optimizedRoute, binsData, algorithm, truckCapacity, routeStats]);

  // Statistics calculations
  const totalBins = Object.keys(binsData).length;
  const activeBins = Object.values(binsData).filter(
    (bin) => bin.fill_level > 0
  ).length;
  const criticalBins = Object.values(binsData).filter(
    (bin) => bin.priority === "CRITICAL"
  ).length;

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        nav("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
      
        <div className=" mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-slate-500 text-white">
              Welcome, <span className="font-bold">{user?.name}</span>
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur">
                🗑️
              </div>
              <div>
                <h1 className="text-3xl font-bold">Smart Waste Management</h1>
                <p className="text-blue-100 flex items-center gap-2">
                  AI-Powered Route Optimization System
                  <span
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      isConnected
                        ? "bg-green-500/20 text-green-100"
                        : "bg-yellow-500/20 text-yellow-100"
                    }`}
                  >
                    {isConnected ? (
                      <Wifi className="w-3 h-3" />
                    ) : (
                      <WifiOff className="w-3 h-3" />
                    )}
                    {isConnected ? "Firebase Connected" : "Sample Data Mode"}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex gap-6 text-center">
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">{totalBins}</div>
                <div className="text-sm text-blue-100">Smart Bins</div>
              </div>
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">{criticalBins}</div>
                <div className="text-sm text-blue-100">Critical</div>
              </div>
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-blue-100">Monitoring</div>
              </div>
            </div>
           <button onClick={handleSignOut} className="text-black py-1">
              Sign Out
            </button>
          </div>
        </div>
         
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Distance</p>
                <p className="text-2xl font-bold text-blue-600">
                  {routeStats ? `${routeStats.distance.toFixed(1)} km` : "0 km"}
                </p>
              </div>
              <Navigation className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Est. Time</p>
                <p className="text-2xl font-bold text-green-600">
                  {routeStats ? `${routeStats.estimatedTime} min` : "0 min"}
                </p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Fuel Cost</p>
                <p className="text-2xl font-bold text-yellow-600">
                  ${routeStats ? routeStats.fuelCost : "0.00"}
                </p>
              </div>
              <Fuel className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">CO₂ Emissions</p>
                <p className="text-2xl font-bold text-red-600">
                  {routeStats ? `${routeStats.co2Emissions} kg` : "0 kg"}
                </p>
              </div>
              <Leaf className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Route Optimization
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Algorithm:
                </label>
                <select
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="nearest_neighbor">
                    Nearest Neighbor (Fast)
                  </option>
                  <option value="genetic">Genetic Algorithm (Balanced)</option>
                  <option value="ant_colony">Ant Colony (Advanced)</option>
                </select>
              </div>
              <button
                onClick={optimizeRoute}
                disabled={isOptimizing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-dark font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                {isOptimizing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Truck className="w-4 h-4" />
                    Optimize Route
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Data Management
            </h3>
            <div className="space-y-3">
              <button
                onClick={refreshFireBaseData}
                disabled={isRefreshing}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-dark font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                {isRefreshing
                  ? "Refreshing..."
                  : isConnected
                  ? "Refresh from Firebase"
                  : "Refresh Sample Data"}
              </button>
              <button
                onClick={exportRoute}
                disabled={optimizedRoute.length === 0}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-dark font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Route
              </button>
            </div>
            <div className="mt-3 text-xs text-gray-500 space-y-1">
              <div>Last update: {lastUpdate.toLocaleTimeString()}</div>
              <div
                className={`flex items-center gap-1 ${
                  isConnected ? "text-green-600" : "text-orange-600"
                }`}
              >
                {isConnected ? (
                  <Wifi className="w-3 h-3" />
                ) : (
                  <WifiOff className="w-3 h-3" />
                )}
                {isConnected
                  ? "Real-time Firebase sync"
                  : "Sample data simulation"}
              </div>
              {connectionError && (
                <div className="text-red-500 text-xs">
                  Connection error: {connectionError}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-600" />
              Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Truck Capacity: {truckCapacity}
                </label>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={truckCapacity}
                  onChange={(e) => setTruckCapacity(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              {routeStats && (
                <div className="text-sm text-gray-600">
                  <div>Efficiency: {routeStats.efficiency}%</div>
                  <div>Bins Collected: {routeStats.binsCollected}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Route Map */}
        <div className="mb-8">
          <RouteMap
            route={optimizedRoute}
            bins={binsData}
            depot={depotLocation}
            isOptimizing={isOptimizing}
          />
        </div>

        {/* Bin Status Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6">Real-time Bin Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(binsData).map(([binId, bin]) => (
              <BinStatusCard
                key={binId}
                binId={binId}
                bin={bin}
                onRefresh={refreshData}
              />
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        {routeStats && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">
              Route Performance Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {routeStats.efficiency}%
                </div>
                <div className="text-sm text-gray-600">Route Efficiency</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {routeStats.fuelConsumption}L
                </div>
                <div className="text-sm text-gray-600">Fuel Consumption</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {routeStats.binsCollected}
                </div>
                <div className="text-sm text-gray-600">Bins in Route</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
