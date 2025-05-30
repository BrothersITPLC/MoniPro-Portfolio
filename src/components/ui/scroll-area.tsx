import React from "react";

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  className,
  onScroll,
  children,
  ...props
}) => {
  return (
    <div
      className={`overflow-y-auto ${className} custom-scrollbar`}
      onScroll={onScroll}
      {...props}
    >
      {children}
      <style>{`
        .custom-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  );
};
