
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { 
  Activity, 
  Calendar, 
  Settings, 
  FileText, 
  AlertTriangle,
  Plus
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigationItems = [
  { title: 'Dashboard', url: '/', icon: Activity },
  { title: 'Installations', url: '/installations', icon: Plus },
  { title: 'Service Visits', url: '/services', icon: Settings },
  { title: 'AMC/CMC Tracker', url: '/contracts', icon: FileText },
  { title: 'Alerts', url: '/alerts', icon: AlertTriangle },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-blue-100 text-blue-700 font-medium hover:bg-blue-100" 
      : "text-gray-700 hover:bg-gray-100";

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <Sidebar className="border-r border-gray-200 bg-white">
            <SidebarContent>
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-800">MedDevice CRM</h1>
                <p className="text-sm text-gray-600">Inventory Management</p>
              </div>
              
              <SidebarGroup>
                <SidebarGroupLabel className="text-gray-500 font-medium">
                  Navigation
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.url}
                            end
                            className={getNavClassName}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <div className="flex-1 flex flex-col">
            <header className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <SidebarTrigger className="lg:hidden" />
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    Welcome back, Admin
                  </div>
                </div>
              </div>
            </header>
            
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
