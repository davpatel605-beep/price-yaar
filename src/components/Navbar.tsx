import { useState } from 'react';
import { Search, ShoppingCart, Check, User, LogOut, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User as UserType } from '@/types';

interface NavbarProps {
  user: UserType | null;
  onLogin: () => void;
  onLogout: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ user, onLogin, onLogout, onSearch, searchQuery, onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#FEF9E7] border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                <Check className="w-2 h-2 text-white" strokeWidth={3} />
              </div>
            </div>
            <span className="text-lg font-bold hidden sm:block">
              <span className="text-orange-500">Price</span>
              <span className="text-blue-800">Yaar</span>
            </span>
          </button>

          {/* Search Bar - Center */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-3 sm:mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 h-9 text-sm bg-white border-amber-200 rounded-full focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
              />
            </div>
          </form>

          {/* Right Side - Auth */}
          <div className="flex items-center gap-1">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1.5 p-1 rounded-full hover:bg-amber-100/50 transition-colors">
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="hidden sm:block text-sm font-medium text-gray-700">{user.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  {user.is_admin && (
                    <DropdownMenuItem onClick={() => onNavigate('admin')}>
                      <User className="w-4 h-4 mr-2" />
                      Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={onLogin}
                className="text-sm font-light text-gray-600 hover:text-blue-600 transition-colors lowercase tracking-wide px-2"
              >
                get started
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-amber-100/50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-200 bg-[#FEF9E7]">
          <div className="px-4 py-2 space-y-1">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg hover:bg-amber-100/50 text-gray-700 text-sm"
            >
              Home
            </button>
            {user?.is_admin && (
              <button
                onClick={() => {
                  onNavigate('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-lg hover:bg-amber-100/50 text-gray-700 text-sm"
              >
                Admin Panel
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
