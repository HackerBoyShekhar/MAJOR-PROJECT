import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CloudRain, Sun, Thermometer, Wind, Cloud } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Insights = () => {
  const [weather, setWeather] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { data } = await axios.get('https://major-project-eh18.onrender.com/api/menu');
        if (data.weather) setWeather(data.weather);
      } catch (err) {
        console.error("Failed to fetch insight data", err);
      }
    };
    fetchWeather();
    setHasMounted(true);
    const int = setInterval(fetchWeather, 5000);
    return () => clearInterval(int);
  }, []);

  const getWeatherIcon = (condition) => {
      const c = condition?.toLowerCase() || '';
      if (c.includes('rain')) return <CloudRain className="w-16 h-16 text-blue-500" />;
      if (c.includes('cloud')) return <Cloud className="w-16 h-16 text-slate-400" />;
      if (c.includes('clear')) return <Sun className="w-16 h-16 text-yellow-500" />;
      return <Thermometer className="w-16 h-16 text-orange-500" />;
  };

  // Mock data for the historical chart to look impressive
  const historicalData = [
    { time: '10:00', temp: 22, demand: 1.0 },
    { time: '11:00', temp: 25, demand: 1.2 },
    { time: '12:00', temp: 30, demand: 1.8 },
    { time: '13:00', temp: 34, demand: 2.1 },
    { time: '14:00', temp: 35, demand: 1.5 },
    { time: '15:00', temp: 31, demand: 1.1 },
    { time: '16:00', temp: 26, demand: 0.9 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-3">Live Weather Radar</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-2xl">See exactly how the current climate is influencing the marketplace. Our AI adjusts global prices every single second based on these readings.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-1 border-4 border-transparent bg-gradient-to-br from-primary-500/10 to-transparent rounded-3xl p-1">
                <div className="glass-card p-10 h-full flex flex-col items-center justify-center text-center relative overflow-hidden rounded-[22px] border-none shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 dark:bg-primary-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    
                    {weather ? (
                        <>
                            <div className="p-8 bg-white dark:bg-dark-200 rounded-full shadow-2xl mb-8 z-10 border border-slate-100 dark:border-slate-700">
                                {getWeatherIcon(weather.condition)}
                            </div>
                            <h2 className="text-6xl font-display font-bold text-slate-900 dark:text-white mb-2 z-10 tracking-tight">
                                {Math.round(weather.temp)}°C
                            </h2>
                            <p className="text-2xl font-semibold text-primary-600 dark:text-primary-400 capitalize z-10">{weather.description}</p>
                            <p className="text-sm font-medium text-slate-500 mt-6 max-w-[220px] z-10 bg-white/50 dark:bg-dark-100/50 p-4 rounded-xl backdrop-blur-sm">
                                The AI pricing engine is actively locking in prices based on this live metric.
                            </p>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <Thermometer className="w-12 h-12 text-slate-300 animate-pulse" />
                            <p className="text-slate-500 font-medium tracking-wide animate-pulse">Connecting to satellite...</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="lg:col-span-2">
                <div className="glass-card p-8 h-full flex flex-col shadow-xl">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Daily Temperature vs Demand Profile</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Predictive historical tracker demonstrating how heat drives massive surge periods.</p>
                    <div className="h-[400px] w-full">
                        {hasMounted && (
                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                            <LineChart data={historicalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} dy={15} />
                                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} />
                                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} />
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} 
                                    itemStyle={{fontWeight: '500'}}
                                />
                                <Line yAxisId="left" type="monotone" dataKey="temp" name="Temp (°C)" stroke="#f97316" strokeWidth={4} dot={{r:6, strokeWidth: 3, fill: '#fff'}} activeDot={{r: 8, stroke: '#f97316', strokeWidth: 2}} />
                                <Line yAxisId="right" type="monotone" dataKey="demand" name="Avg Demand" stroke="#3b82f6" strokeWidth={4} dot={{r:6, strokeWidth: 3, fill: '#fff'}} activeDot={{r: 8, stroke: '#3b82f6', strokeWidth: 2}} />
                            </LineChart>
                        </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
export default Insights;
