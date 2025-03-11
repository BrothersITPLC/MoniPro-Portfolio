import React from 'react';
import { Activity, Server, Cloud, Code } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold">MonitorPro</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{user?.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl">
            <Activity className="h-8 w-8 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Network Status</h2>
            <p className="text-gray-400">All systems operational</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <Server className="h-8 w-8 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Server Health</h2>
            <p className="text-gray-400">98% uptime</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <Cloud className="h-8 w-8 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Cloud Resources</h2>
            <p className="text-gray-400">Optimal utilization</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <Code className="h-8 w-8 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Applications</h2>
            <p className="text-gray-400">All services running</p>
          </div>
        </div>
      </main>
    </div>
  );
}