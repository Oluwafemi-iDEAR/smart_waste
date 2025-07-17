import { MapPin, Settings, BarChart3, Clock, Leaf, Zap } from "lucide-react";
import "./App.css";
import { useNavigate } from "react-router";
import { app } from "./helpers/authFirebase";
import { getAuth, signOut } from "firebase/auth";

import chiamanda from "./assets/chiamanda.png";
import chidebelu from "./assets/chidebelu.png";
import chris from "./assets/chris.png";
import kambili from "./assets/kambili.png";
import noble from "./assets/noble.png";
import oluwafemi from "./assets/oluwafemi.png";
import steve from "./assets/steve.png";


// Main Dashboard Component
const SmartWasteManagement = () => {
  const nav = useNavigate();

  const auth = getAuth(app);
  const user = auth.currentUser;

  //Sign out
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      {/* <section className="relative bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700 text-white overflow-hidden"> */}
      <section class="relative bg-teal-900" x-data="{ mobileNavOpen: false }"><img class="absolute top-0 left-0 w-full h-full" src="fauna-assets/headers/bg-waves.png" alt=""/>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-32 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-10 w-28 h-28 bg-white rounded-full"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping opacity-30"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-40"></div>
          <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-white rounded-full animate-bounce opacity-20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          {!user && (
            <button className="text-black" onClick={() => nav("login")}>
              Log In
            </button>
          )}
          {user &&(
           <button onClick={handleSignOut} className="text-black py-1">
              Sign Out
            </button>
          )}

          <div className="text-center">
            {/* Logo and Title */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl backdrop-blur-sm border border-white/30">
                🗑️
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  C.L.E.A.R Route
                </h1>
                <div className="text-lg md:text-xl text-blue-100 font-medium">
                  Smart Waste Management Solutions
                </div>
              </div>
            </div>

            {/* Main Tagline */}
            <h2 className="text-2xl md:text-4xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
              Revolutionizing Urban Waste Collection with
              <span className="text-yellow-300"> AI-Powered Intelligence</span>
            </h2>

            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your city's waste management with our cutting-edge IoT
              sensors, machine learning algorithms, and real-time route
              optimization technology. Reduce costs by 40%, cut emissions by
              35%, and create cleaner communities.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="font-semibold mb-2">AI-Powered Optimization</h3>
                <p className="text-sm text-blue-100">
                  Advanced algorithms predict optimal collection routes and
                  schedules
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">🌱</div>
                <h3 className="font-semibold mb-2">Eco-Friendly Impact</h3>
                <p className="text-sm text-blue-100">
                  Reduce carbon emissions and fuel consumption with smart
                  routing
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-semibold mb-2">Real-Time Monitoring</h3>
                <p className="text-sm text-blue-100">
                  24/7 IoT sensor data with instant alerts and analytics
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-300">40%</div>
                <div className="text-sm text-blue-100">Cost Reduction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-300">35%</div>
                <div className="text-sm text-blue-100">Less Emissions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-300">24/7</div>
                <div className="text-sm text-blue-100">Monitoring</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-300">95%</div>
                <div className="text-sm text-blue-100">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us / Project Description Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              About EcoRoute AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading the transformation of urban waste management through
              intelligent technology and sustainable innovation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Our Mission
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                EcoRoute AI is dedicated to revolutionizing waste management
                systems worldwide. We combine cutting-edge Internet of Things
                (IoT) technology, artificial intelligence, and advanced
                optimization algorithms to create smarter, more efficient, and
                environmentally sustainable waste collection solutions.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our platform empowers cities, municipalities, and private waste
                management companies to reduce operational costs, minimize
                environmental impact, and improve service quality through
                data-driven decision making and automated route optimization.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  Smart Cities
                </span>
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  Sustainability
                </span>
                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                  AI/ML
                </span>
                <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                  IoT Technology
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="text-3xl mb-3">🏆</div>
                <h4 className="font-semibold mb-2">Award Winning</h4>
                <p className="text-sm text-gray-600">
                  Recognized for innovation in smart city technology
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="text-3xl mb-3">🌍</div>
                <h4 className="font-semibold mb-2">Global Impact</h4>
                <p className="text-sm text-gray-600">
                  Deployed in 50+ cities worldwide
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-semibent mb-2">Real-Time Processing</h4>
                <p className="text-sm text-gray-600">
                  Processing millions of data points daily
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                <div className="text-3xl mb-3">🔒</div>
                <h4 className="font-semibold mb-2">Enterprise Security</h4>
                <p className="text-sm text-gray-600">
                  Bank-level security and data protection
                </p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Our Technology Stack
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-medium text-gray-800">ESP32 IoT</h4>
                <p className="text-xs text-gray-500">Hardware Control</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <span className="text-2xl">🔥</span>
                </div>
                <h4 className="font-medium text-gray-800">Firebase</h4>
                <p className="text-xs text-gray-500">Real-time Database</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <span className="text-2xl">⚛️</span>
                </div>
                <h4 className="font-medium text-gray-800">React</h4>
                <p className="text-xs text-gray-500">Frontend UI</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <span className="text-2xl">🐍</span>
                </div>
                <h4 className="font-medium text-gray-800">Python AI</h4>
                <p className="text-xs text-gray-500">ML Algorithms</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <span className="text-2xl">🧠</span>
                </div>
                <h4 className="font-medium text-gray-800">TensorFlow</h4>
                <p className="text-xs text-gray-500">Deep Learning</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <span className="text-2xl">☁️</span>
                </div>
                <h4 className="font-medium text-gray-800">Cloud API</h4>
                <p className="text-xs text-gray-500">Integration</p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className=" mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Platform Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Smart Route Optimization
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Advanced algorithms including Genetic Algorithm, Ant Colony
                  Optimization, and Machine Learning models find the most
                  efficient collection routes.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Real-time traffic integration</li>
                  <li>• Dynamic route recalculation</li>
                  <li>• Multi-vehicle coordination</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  IoT Sensor Network
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive sensor arrays monitor fill levels, gas
                  emissions, temperature, and location data from every waste bin
                  in real-time.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Ultrasonic fill level detection</li>
                  <li>• GPS location tracking</li>
                  <li>• Gas emission monitoring</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Predictive Analytics
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Machine learning models predict bin fill patterns, optimize
                  collection schedules, and detect anomalies before they become
                  problems.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Fill level prediction</li>
                  <li>• Maintenance scheduling</li>
                  <li>• Anomaly detection</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Real-Time Dashboard
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive monitoring dashboard provides live insights into
                  fleet operations, bin status, and performance metrics.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Live fleet tracking</li>
                  <li>• Performance analytics</li>
                  <li>• Custom reporting</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Environmental Impact
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Track and reduce your environmental footprint with detailed
                  carbon emission calculations and sustainability metrics.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• CO₂ emission tracking</li>
                  <li>• Fuel consumption optimization</li>
                  <li>• Sustainability reporting</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Enterprise Integration
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Seamlessly integrate with existing ERP systems, fleet
                  management software, and municipal databases through robust
                  APIs.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• RESTful API integration</li>
                  <li>• Custom data export</li>
                  <li>• Third-party connectors</li>
                </ul>
              </div>
            </div>
          </div>
          <section class="py-24 bg-gray-50">
              <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div class="flex justify-between items-center flex-col lg:flex-row md:mt-20">
                      <div class="w-full lg:w-1/2">
                          <h2
                              class="font-manrope text-5xl text-gray-900 font-bold leading-[4rem] mb-7 text-center lg:text-left">
                              Our leading, strong & creative team</h2>
                          <p class="text-lg text-gray-500 mb-16 text-center lg:text-left">These people work on making the world a greener place.</p>
                          <button class="cursor-pointer py-3 px-8 w-60 bg-indigo-600 text-white text-base font-semibold transition-all duration-500 block text-center rounded-full hover:bg-indigo-700 mx-auto lg:mx-0">Join
                              our team</button>
                      </div>
                      <div class="w-full lg:w-1/2 lg:mt-0 md:mt-40 mt-16 max-lg:max-w-2xl">
                          <div class="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 gap-8">
                              <img src={steve} alt="Steve" class="w-44 h-56 rounded-2xl object-cover md:mt-20   mx-auto           min-[450px]:mr-0" />
                              <img src={oluwafemi} alt="Oluwafemi" class="w-44 h-56 rounded-2xl object-cover mx-auto    min-[450px]:ml-0  md:mx-auto" />
                              <img src={chris} alt="Chris" class="w-44 h-56 rounded-2xl object-cover md:mt-20   mx-auto           min-[450px]:mr-0  md:ml-0" />
                              <img src={chiamanda} alt="Chiamanda" class="w-44 h-56 rounded-2xl object-cover mx-auto    min-[450px]:ml-0  md:mr-0           md:ml-auto" />
                              <img src={noble} alt="Noble" class="w-44 h-56 rounded-2xl object-cover md:-mt-20  mx-auto           min-[450px]:mr-0  md:mx-auto" />
                              <img src={kambili} alt="Kambili" class="w-44 h-56 rounded-2xl object-cover mx-auto    min-[450px]:ml-0  md:mr-0" />
                              <img src={chidebelu} alt="Chidebelu" class="w-44 h-56 rounded-2xl object-cover md:-mt-20 mx-auto min-[450px]:mr-0 md:mx-auto col-start-2" />
                          </div>
                      </div>
                  </div>
              </div>
          </section>
                                            
          {/* <div class="flex flex-wrap items-center -mx-4 mb-16">
            <div class="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
              <h1 class="font-heading text-4xl sm:text-6xl md:text-7xl tracking-sm mb-6">Join our team</h1>
              <p class="text-lg text-gray-700">Our philosophy is simple – make the world a greener place. </p>
            </div>
            <div class="w-full lg:w-1/2 px-4"><img class="block" src="fauna-assets/career/team-members-photos.png" alt=""/></div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default SmartWasteManagement;
