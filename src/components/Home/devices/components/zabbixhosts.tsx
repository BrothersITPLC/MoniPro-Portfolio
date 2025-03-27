import { useState, useEffect } from 'react';
import { zabbixApi } from '@/components/Auth/zabbix';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';  // Import the CategoryScale

Chart.register(CategoryScale);  // Register the CategoryScale

export function ZabbixHosts() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [selectedHostId, setSelectedHostId] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const { data: hosts } = zabbixApi.useZabbixGetHostsQuery(authToken, {
    skip: !authToken,
  });

  const { data: items } = zabbixApi.useZabbixGetItemsQuery(
    { authToken, hostids: selectedHostId },
    { skip: !authToken || !selectedHostId }
  );

  const { data: historicalData, isLoading: isDataLoading } = zabbixApi.useZabbixGetRealTimeDataQuery(
    { authToken, itemids: selectedItemId },
    { skip: !authToken || !selectedItemId }
  );

  // Prepare data for Chart.js
  const chartData = {
    labels: historicalData?.map(data => new Date(data.clock * 1000).toLocaleTimeString()) || [],
    datasets: [
      {
        label: 'Historical Data',
        data: historicalData?.map(data => parseFloat(data.value)) || [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const [zabbixLogin] = zabbixApi.useZabbixLoginMutation();

  useEffect(() => {
    const getZabbixAuth = async () => {
      try {
        const result = await zabbixLogin().unwrap();
        setAuthToken(result);
      } catch (error) {
        console.error('Zabbix auth failed:', error);
      }
    };

    getZabbixAuth();
  }, [zabbixLogin]);

  if (!hosts) return <div>Loading hosts...</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-4">Hosts</h2>
              {hosts.map(host => (
                <div 
                  key={host.hostid}
                  className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors ${selectedHostId === host.hostid ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                  onClick={() => setSelectedHostId(host.hostid)}
                >
                  <h3 className="font-medium">{host.name}</h3>
                  <p className="text-sm opacity-80">Status: {host.status}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedHostId && items && (
            <Card>
              <CardContent className="p-4">
                <Tabs defaultValue="items">
                  <TabsList>
                    <TabsTrigger value="items">Items</TabsTrigger>
                    <TabsTrigger value="details">Host Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="items" className="mt-4">
                    <div className="grid gap-4">
                      {items?.map(item => (
                        <div 
                          key={item.itemid} 
                          className="border rounded-lg p-4"
                          onClick={() => setSelectedItemId(item.itemid)}
                        >
                          <h4 className="font-medium mb-2">{item.name}</h4>
                          {selectedItemId === item.itemid && (
                            <div className="mt-2">
                              {isDataLoading ? (
                                <div>Loading data...</div>
                              ) : historicalData ? (
                                <Line data={chartData} />
                              ) : (
                                <div>No data available</div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="details">
                    <div className="space-y-2">
                      {hosts.find(h => h.hostid === selectedHostId)?.interfaces?.map((iface: any, index: number) => (
                        <div key={index} className="p-2 border rounded">
                          <p>IP: {iface.ip}</p>
                          <p>DNS: {iface.dns}</p>
                          <p>Type: {iface.type}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
