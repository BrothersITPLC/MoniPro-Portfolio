import { useState } from 'react';
import { Activity, Server, MemoryStick as Memory, Network, Shield, Clock, Box, Database } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Time interval options
const timeIntervals = [
  { label: 'Last 5 minutes', value: '5m' },
  { label: 'Last 15 minutes', value: '15m' },
  { label: 'Last 30 minutes', value: '30m' },
  { label: 'Last 1 hour', value: '1h' },
  { label: 'Last 3 hours', value: '3h' },
  { label: 'Last 6 hours', value: '6h' },
  { label: 'Last 12 hours', value: '12h' },
  { label: 'Last 1 day', value: '1d' },
  { label: 'Today', value: 'today' },
  { label: 'This week', value: 'week' },
  { label: 'This month', value: 'month' }
];

// Mock data for demonstration
const generateTimeData = (interval: string) => {
  const now = new Date();
  const points = interval.includes('m') ? 60 : 24;
  return Array.from({ length: points }, (_, i) => {
    const time = new Date(now.getTime() - (points - i) * (60000));
    return {
      time: time.toLocaleTimeString(),
      usage: Math.floor(Math.random() * 40) + 30,
      used: Math.floor(Math.random() * 30) + 40,
      free: Math.floor(Math.random() * 20) + 10,
      incoming: Math.floor(Math.random() * 100),
      outgoing: Math.floor(Math.random() * 80),
    };
  });
};

// Mock Docker containers data
const dockerContainers = [
  { name: 'nginx-proxy', status: 'running', ports: '80:80, 443:443', cpu: '0.5%', memory: '128MB' },
  { name: 'mongodb', status: 'running', ports: '27017:27017', cpu: '1.2%', memory: '512MB' },
  { name: 'redis-cache', status: 'running', ports: '6379:6379', cpu: '0.3%', memory: '256MB' }
];

function MetricCard({ title, icon: Icon, value, subtitle }: { title: string; icon: any; value: string; subtitle?: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-2">
        <Icon className="w-6 h-6 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}

function TimeIntervalSelector({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {timeIntervals.map((interval) => (
        <option key={interval.value} value={interval.value}>
          {interval.label}
        </option>
      ))}
    </select>
  );
}

function DockerContainersTable() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Box className="w-5 h-5 text-indigo-600" />
        Docker Containers
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Container</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ports</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memory</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dockerContainers.map((container) => (
              <tr key={container.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{container.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {container.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{container.ports}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{container.cpu}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{container.memory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ZabbixHosts() {
  const [timeInterval, setTimeInterval] = useState('1h');
  const data = generateTimeData(timeInterval);

  return (
    <div className="min-h-screen  p-8">
      <div className="">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">System Performance Dashboard</h1>
          <TimeIntervalSelector value={timeInterval} onChange={setTimeInterval} />
        </div>
        
        <div className="grid grid-cols-1  md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Server}
            title="CPU Cores"
            value="8"
            subtitle="Physical Cores"
          />
          <MetricCard
            icon={Memory}
            title="Total Memory"
            value="32 GB"
            subtitle="DDR4 RAM"
          />
          <MetricCard
            icon={Database}
            title="OS Type"
            value="Ubuntu 22.04 LTS"
            subtitle="Linux x86_64"
          />
          <MetricCard
            icon={Clock}
            title="System Uptime"
            value="15 days"
            subtitle="Last reboot: March 1, 2024"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* CPU Usage Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              CPU Utilization
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="usage" stroke="#4f46e5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Memory Usage Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Memory className="w-5 h-5 text-indigo-600" />
              Memory Usage
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="used" stackId="1" stroke="#4f46e5" fill="#818cf8" />
                  <Area type="monotone" dataKey="free" stackId="1" stroke="#10b981" fill="#34d399" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Network Traffic Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Network className="w-5 h-5 text-indigo-600" />
              Network Traffic
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="incoming" stroke="#4f46e5" strokeWidth={2} />
                  <Line type="monotone" dataKey="outgoing" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Security Overview */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-600" />
              Security Overview
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Failed Login Attempts (24h)</span>
                  <span className="text-red-600 font-semibold">3</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Successful Logins (24h)</span>
                  <span className="text-green-600 font-semibold">42</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Docker Containers Section */}
        <DockerContainersTable />
      </div>
    </div>
  );
}
