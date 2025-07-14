import React from "react";

interface DataNode {
  id: string;
  x: number;
  y: number;
  size: number;
  type: "server" | "database" | "api" | "monitor" | "ai";
  pulseDelay: number;
}

interface Connection {
  from: DataNode;
  to: DataNode;
  strength: number;
  animationDelay: number;
}

export const AnimatedBackground: React.FC = () => {
  // Generate monitoring infrastructure nodes
  const generateNodes = (): DataNode[] => {
    const nodes: DataNode[] = [];
    const types: DataNode["type"][] = [
      "server",
      "database",
      "api",
      "monitor",
      "ai",
    ];

    for (let i = 0; i < 20; i++) {
      nodes.push({
        id: `node-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        type: types[Math.floor(Math.random() * types.length)],
        pulseDelay: Math.random() * 4,
      });
    }
    return nodes;
  };

  const generateConnections = (nodes: DataNode[]): Connection[] => {
    const connections: Connection[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].x - nodes[j].x, 2) +
            Math.pow(nodes[i].y - nodes[j].y, 2)
        );

        // Only connect nearby nodes
        if (distance < 25 && Math.random() > 0.7) {
          connections.push({
            from: nodes[i],
            to: nodes[j],
            strength: Math.random(),
            animationDelay: Math.random() * 3,
          });
        }
      }
    }
    return connections;
  };

  const nodes = React.useMemo(() => generateNodes(), []);
  const connections = React.useMemo(() => generateConnections(nodes), [nodes]);

  const getNodeColor = (type: DataNode["type"]) => {
    switch (type) {
      case "ai":
        return "fill-primary";
      case "monitor":
        return "fill-chart-1";
      case "server":
        return "fill-chart-2";
      case "database":
        return "fill-chart-3";
      case "api":
        return "fill-chart-4";
      default:
        return "fill-muted";
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Animated grid background */}
        <defs>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path
              d="M 5 0 L 0 0 0 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.1"
              className="text-border opacity-30"
            />
          </pattern>

          {/* Gradient for connections */}
          <linearGradient
            id="connectionGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" className="stop-color-primary stop-opacity-0" />
            <stop offset="50%" className="stop-color-primary stop-opacity-60" />
            <stop offset="100%" className="stop-color-primary stop-opacity-0" />
          </linearGradient>
        </defs>

        {/* Grid background */}
        <rect width="100" height="100" fill="url(#grid)" />

        {/* Connections between nodes */}
        {connections.map((connection, index) => (
          <line
            key={`connection-${index}`}
            x1={connection.from.x}
            y1={connection.from.y}
            x2={connection.to.x}
            y2={connection.to.y}
            stroke="url(#connectionGradient)"
            strokeWidth="0.2"
            className="animate-pulse"
            style={{
              animationDelay: `${connection.animationDelay}s`,
              animationDuration: "3s",
            }}
          />
        ))}

        {/* Data flow particles */}
        {connections.map((connection, index) => (
          <circle key={`particle-${index}`} r="0.3" className="fill-primary">
            <animateMotion
              dur={`${3 + Math.random() * 2}s`}
              repeatCount="indefinite"
              begin={`${connection.animationDelay}s`}
            >
              <mpath href={`#path-${index}`} />
            </animateMotion>
          </circle>
        ))}

        {/* Hidden paths for particle animation */}
        {connections.map((connection, index) => (
          <path
            key={`path-${index}`}
            id={`path-${index}`}
            d={`M ${connection.from.x} ${connection.from.y} L ${connection.to.x} ${connection.to.y}`}
            fill="none"
            stroke="none"
          />
        ))}

        {/* Infrastructure nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Node glow effect */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size * 1.5}
              className="fill-primary opacity-10 animate-pulse"
              style={{
                animationDelay: `${node.pulseDelay}s`,
                animationDuration: "2s",
              }}
            />

            {/* Main node */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              className={`${getNodeColor(
                node.type
              )} transition-all duration-1000`}
            />

            {/* AI nodes get special treatment */}
            {node.type === "ai" && (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size * 0.6}
                className="fill-primary-foreground animate-pulse"
                style={{
                  animationDelay: `${node.pulseDelay + 0.5}s`,
                  animationDuration: "1.5s",
                }}
              />
            )}
          </g>
        ))}

        {/* Floating data packets */}
        {Array.from({ length: 8 }).map((_, index) => (
          <rect
            key={`packet-${index}`}
            width="1"
            height="0.5"
            className="fill-accent opacity-60"
            rx="0.1"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0,${10 + index * 10}; 100,${10 + index * 10}; 0,${
                10 + index * 10
              }`}
              dur={`${5 + index}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}

        {/* Monitoring waves */}
        <circle
          cx="20"
          cy="80"
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
          className="text-primary opacity-30"
        >
          <animate
            attributeName="r"
            values="15;25;15"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.1;0.3"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>

        <circle
          cx="80"
          cy="20"
          r="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
          className="text-chart-1 opacity-30"
        >
          <animate
            attributeName="r"
            values="12;20;12"
            dur="3s"
            repeatCount="indefinite"
            begin="1s"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.1;0.3"
            dur="3s"
            repeatCount="indefinite"
            begin="1s"
          />
        </circle>
      </svg>
    </div>
  );
};
