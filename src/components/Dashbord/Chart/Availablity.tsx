import React, { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';

type HostStatus = "UP" | "DOWN";

interface HistoricalHost {
  name: string;
  ip: string;
  status: HostStatus;
  timestamp: Date;
  uptime: number;
}

// Create mock historical data
const generateHistoricalData = (): Record<string, HistoricalHost[]> => {
  const baseHosts = [
    { name: "Router 1", ip: "192.168.1.1" },
    { name: "Switch 1", ip: "192.168.1.2" },
    { name: "Web Server", ip: "10.0.0.10" },
    { name: "Database Server", ip: "10.0.0.20" },
    { name: "Load Balancer", ip: "10.0.0.5" },
    { name: "Storage Server", ip: "10.0.0.30" },
  ];

  const now = new Date();
  
  // Helper to create a date for a specific day in the past
  const daysAgo = (days: number) => {
    const date = new Date(now);
    date.setDate(date.getDate() - days);
    return date;
  };

  // Generate random status for a host based on its typical reliability
  const getRandomStatus = (hostName: string): HostStatus => {
    const reliabilityMap: Record<string, number> = {
      "Router 1": 0.95,
      "Switch 1": 0.85,
      "Web Server": 0.98,
      "Database Server": 0.9,
      "Load Balancer": 0.97,
      "Storage Server": 0.88,
    };
    
    const reliability = reliabilityMap[hostName] || 0.9;
    return Math.random() < reliability ? "UP" : "DOWN";
  };

  // Generate random uptime percentage
  const getRandomUptime = (status: HostStatus): number => {
    if (status === "DOWN") {
      return Math.floor(Math.random() * 30) + 60; // 60-90% for DOWN status
    } else {
      return Math.floor(Math.random() * 10) + 90; // 90-100% for UP status
    }
  };

  return {
    "Today": baseHosts.map(host => ({
      ...host,
      status: getRandomStatus(host.name),
      timestamp: new Date(now.setHours(Math.floor(Math.random() * 12))),
      uptime: getRandomUptime(getRandomStatus(host.name)),
    })),
    "Yesterday": baseHosts.map(host => ({
      ...host,
      status: getRandomStatus(host.name),
      timestamp: daysAgo(1),
      uptime: getRandomUptime(getRandomStatus(host.name)),
    })),
    "Last Week": baseHosts.slice(0, 4).map(host => ({
      ...host,
      status: getRandomStatus(host.name),
      timestamp: daysAgo(Math.floor(Math.random() * 7) + 3),
      uptime: getRandomUptime(getRandomStatus(host.name)),
    })),
    "Last Month": baseHosts.slice(2, 5).map(host => ({
      ...host,
      status: getRandomStatus(host.name),
      timestamp: daysAgo(Math.floor(Math.random() * 20) + 10),
      uptime: getRandomUptime(getRandomStatus(host.name)),
    })),
    "3 Months Ago": baseHosts.slice(1, 4).map(host => ({
      ...host,
      status: getRandomStatus(host.name),
      timestamp: daysAgo(Math.floor(Math.random() * 30) + 60),
      uptime: getRandomUptime(getRandomStatus(host.name)),
    })),
  };
};

const historicalData = generateHistoricalData();

const getStatusColor = (status: HostStatus) => {
  return status === "UP" ? "var(--primary, #6366f1)" : "#e11d48"; // red for DOWN
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const Availablity: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Today": true,
    "Yesterday": true,
    "Last Week": false,
    "Last Month": false,
    "3 Months Ago": false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Define styles for light and dark mode
  const containerStyle = {
    backgroundColor: "var(--background)", // Use CSS variable for background
    color: "var(--foreground)", // Use CSS variable for text color
  };

  return (
    <div style={{ ...styles.container, ...containerStyle }}>
      <h1 style={styles.title}>Availability Dashboard</h1>
      
      {Object.entries(historicalData).map(([period, hosts]) => (
        <div key={period} style={styles.historySection}>
          <div 
            style={{ ...styles.sectionHeader, backgroundColor: "var(--card)" }} // Use CSS variable for card background
            onClick={() => toggleSection(period)}
          >
            <h2 style={styles.sectionTitle}>{period}</h2>
            <button style={styles.expandButton}>
              {expandedSections[period] ? 
                <ChevronUp size={20} /> : 
                <ChevronDown size={20} />
              }
            </button>
          </div>
          
          {expandedSections[period] && (
            <div style={styles.grid}>
              {hosts.map((host, index) => (
                <div 
                  key={`${period}-${index}`} 
                  style={{ 
                    ...styles.card, 
                    backgroundColor: "var(--card)", // Use CSS variable for card background
                    borderLeftColor: getStatusColor(host.status),
                    transform: `translateY(${expandedSections[period] ? '0' : '20px'})`,
                    opacity: expandedSections[period] ? 1 : 0,
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  <div style={styles.cardHeader}>
                    <h2 style={styles.hostName}>{host.name}</h2>
                    <span style={styles.timestamp}>{formatDate(host.timestamp)}</span>
                  </div>
                  <p style={styles.ip}>{host.ip}</p>
                  <div style={styles.statusRow}>
                    <p style={{ ...styles.status, color: getStatusColor(host.status) }}>
                      {host.status}
                    </p>
                    <div style={styles.uptimeContainer}>
                      <div style={styles.uptimeLabel}>Uptime</div>
                      <div style={styles.uptimeWrapper}>
                        <div 
                          style={{
                            ...styles.uptimeBar,
                            width: `${host.uptime}%`,
                            backgroundColor: host.uptime > 95 
                              ? 'var(--primary)' 
                              : host.uptime > 80 
                                ? '#f59e0b' 
                                : '#e11d48'
                          }}
                        ></div>
                      </div>
                      <div style={styles.uptimeValue}>{host.uptime}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div style={styles.divider}></div>
        </div>
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    fontFamily: "sans-serif",
    minHeight: "100vh",
 
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "var(--primary, #6366f1)",
  },
  historySection: {
    marginBottom: "1.5rem",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 1rem",
    backgroundColor: "white",
    
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    marginBottom: "1rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#f9fafb",
    },
  },
  sectionTitle: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1f2937",
  },
  expandButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#6b7280",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.25rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1rem",
    marginBottom: "1rem",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    padding: "1.25rem",
    borderLeft: "8px solid",
    transition: "transform 0.3s, opacity 0.3s, box-shadow 0.2s",
    ":hover": {
      boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
      transform: "translateY(-5px)",
    },
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "0.5rem",
  },
  hostName: {
    margin: 0,
    fontSize: "1.2rem",
    color: "var(--secondary, #4b5563)",
    fontWeight: "600",
  },
  timestamp: {
    fontSize: "0.875rem",
    color: "#6b7280",
    fontWeight: "500",
  },
  ip: {
    margin: "0.5rem 0",
    color: "#4b5563",
    fontSize: "0.95rem",
  },
  statusRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem",
  },
  status: {
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  uptimeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "0.25rem",
  },
  uptimeLabel: {
    fontSize: "0.75rem",
    color: "#6b7280",
  },
  uptimeWrapper: {
    width: "100px",
    height: "6px",
    backgroundColor: "#e5e7eb",
    borderRadius: "9999px",
    overflow: "hidden",
  },
  uptimeBar: {
    height: "100%",
    borderRadius: "9999px",
  },
  uptimeValue: {
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "#4b5563",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "1rem 0",
  },
};