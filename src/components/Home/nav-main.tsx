import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect, useState } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      key?: string;
      isActive?: boolean;
    }[];
  }[];
}) {
  const organizationData = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();
  const [activeItems, setActiveItems] = useState<{[key: string]: boolean}>({});

  // Update active state based on current URL
  useEffect(() => {
    const newActiveItems: {[key: string]: boolean} = {};
    
    items.forEach(item => {
      // Only mark as active if it's an exact URL match (not just startsWith)
      const mainItemActive = item.url === location.pathname;
      
      newActiveItems[item.title] = mainItemActive || item.isActive || false;
      
      // Check if any sub-items are active
      if (item.items) {
        item.items.forEach(subItem => {
          const subItemActive = subItem.url === location.pathname;
          if (subItemActive) {
            newActiveItems[item.title] = true; // Parent should be active if child is active
            newActiveItems[`${item.title}-${subItem.title}`] = true;
          }
        });
      }
    });
    
    setActiveItems(newActiveItems);
  }, [location.pathname, items]);

  const shouldShowMenuItem = (title: string) => {
    switch (title) {
      case "Team":
        return !organizationData?.is_private && organizationData?.is_admin;
      // Add more cases for other conditional items
      default:
        return true;
    }
  };

  return (
    <SidebarGroup className="px-4">
      <SidebarGroupLabel className="text-[var(--primary)] dark:text-[var(--primary-dark)] text-base font-semibold mb-6 uppercase tracking-wider">
        Platform
      </SidebarGroupLabel>
      <SidebarMenu className="space-y-2">
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={activeItems[item.title] || item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="hover:bg-[var(--light)] dark:hover:bg-[var(--dark-accent)] 
                           text-[var(--text-heading)] dark:text-[var(--text-heading-dark)]
                           hover:text-[var(--primary)] dark:hover:text-[var(--primary-dark)]
                           data-[active=true]:bg-[var(--light)] dark:data-[active=true]:bg-[var(--neutral-bg)]
                           data-[active=true]:text-[var(--primary)] dark:data-[active=true]:text-[var(--primary-dark)]
                           rounded-lg transition-all duration-200 py-3 px-4
                           hover:shadow-sm dark:hover:shadow-none"
                  isActive={activeItems[item.title] || item.isActive}
                >
                  {item.icon && (
                    <item.icon
                      className={`size-6 ${
                        activeItems[item.title] || item.isActive 
                          ? "text-[var(--primary)] dark:text-[var(--primary-dark)]" 
                          : "text-[var(--secondary)] dark:text-[var(--secondary-dark)]"
                      }`}
                    />
                  )}
                  <span
                    className={`font-medium text-[15px] ml-3 ${
                      activeItems[item.title] || item.isActive 
                        ? "text-[var(--primary)] dark:text-[var(--primary-dark)]" 
                        : ""
                    }`}
                  >
                    {item.title}
                  </span>
                  <ChevronRight
                    className={`ml-auto size-5 transition-transform duration-300 
                              group-data-[state=open]/collapsible:rotate-90 ${
                                activeItems[item.title] || item.isActive
                                  ? "text-[var(--primary)] dark:text-[var(--primary-dark)]"
                                  : "text-[var(--secondary)] dark:text-[var(--secondary-dark)]"
                              }`}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="ml-8 mt-2 border-l-2 border-[var(--accent)] dark:border-[var(--accent-dark)] pl-4">
                  {item.items
                    ?.filter((subItem) => shouldShowMenuItem(subItem.title))
                    .map((subItem) => (
                      <SidebarMenuSubItem
                        key={subItem.key || `${subItem.title}-${subItem.url}`}
                        className="mb-1"
                      >
                        <SidebarMenuSubButton
                          asChild
                          isActive={activeItems[`${item.title}-${subItem.title}`] || subItem.isActive}
                        >
                          <Link
                            to={subItem.url}
                            className="flex items-center py-2.5 px-3 text-[14px] font-medium
                                   text-[var(--text-muted)] dark:text-[var(--text-muted-dark)]
                                   hover:text-[var(--primary)] dark:hover:text-[var(--primary-dark)]
                                   rounded-md
                                   hover:bg-[var(--light)] dark:hover:bg-[var(--dark-accent)]
                                   transition-all duration-200
                                   data-[active=true]:text-[var(--primary)] dark:data-[active=true]:text-[var(--primary-dark)]
                                   data-[active=true]:bg-[var(--light)] dark:data-[active=true]:bg-[var(--neutral-bg)]
                                   data-[active=true]:font-semibold
                                   hover:shadow-sm dark:hover:shadow-none"
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
