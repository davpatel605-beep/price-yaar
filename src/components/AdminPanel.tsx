import { useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  ArrowLeft, 
  Search,
  LayoutGrid,
  Tag,
  DollarSign,
  TrendingUp,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product, ProductPrice } from '@/types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

interface AdminPanelProps {
  products: Product[];
  productPrices: ProductPrice[];
  categories: string[];
  onBack: () => void;
  onAddProduct: (product: Product, prices: ProductPrice[]) => void;
  onEditProduct: (product: Product, prices: ProductPrice[]) => void;
  onDeleteProduct: (id: string) => void;
}

interface PriceInput {
  platform_name: string;
  price: string;
  link: string;
  is_best_seller: boolean;
}

// Mock analytics data
const analyticsData = [
  { name: 'Mon', views: 1200, clicks: 450 },
  { name: 'Tue', views: 1800, clicks: 680 },
  { name: 'Wed', views: 2400, clicks: 920 },
  { name: 'Thu', views: 2100, clicks: 780 },
  { name: 'Fri', views: 2800, clicks: 1100 },
  { name: 'Sat', views: 3200, clicks: 1350 },
  { name: 'Sun', views: 2900, clicks: 1200 },
];

export function AdminPanel({ 
  products, 
  productPrices, 
  categories, 
  onBack, 
  onAddProduct, 
  onEditProduct, 
  onDeleteProduct 
}: AdminPanelProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [prices, setPrices] = useState<PriceInput[]>([
    { platform_name: 'Amazon', price: '', link: '', is_best_seller: false },
    { platform_name: 'Flipkart', price: '', link: '', is_best_seller: false },
  ]);

  const platforms = ['Amazon', 'Flipkart', 'Myntra', 'Tata Cliq', 'Nykaa'];

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategory('');
    setImage('');
    setPrices([
      { platform_name: 'Amazon', price: '', link: '', is_best_seller: false },
      { platform_name: 'Flipkart', price: '', link: '', is_best_seller: false },
    ]);
    setEditingProduct(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setCategory(product.category);
    setImage(product.image);
    
    const existingPrices = productPrices.filter(p => p.product_id === product.id);
    if (existingPrices.length > 0) {
      setPrices(existingPrices.map(p => ({
        platform_name: p.platform_name,
        price: p.price.toString(),
        link: p.link,
        is_best_seller: p.is_best_seller,
      })));
    }
    
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!name || !description || !category || !image) return;

    const validPrices = prices
      .filter(p => p.price && p.link)
      .map(p => ({
        platform_name: p.platform_name,
        price: parseFloat(p.price),
        link: p.link,
        is_best_seller: p.is_best_seller,
      }));

    if (editingProduct) {
      onEditProduct(
        { ...editingProduct, name, description, category, image },
        validPrices.map((p, i) => ({
          ...p,
          id: productPrices.find(pp => pp.product_id === editingProduct.id && pp.platform_name === p.platform_name)?.id || `new-${i}`,
          product_id: editingProduct.id,
          created_at: new Date().toISOString(),
        })) as ProductPrice[]
      );
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name,
        description,
        category,
        image,
      };
      // Add product_id to prices for new product
      const pricesWithProductId = validPrices.map((p, i) => ({
        ...p,
        id: `price-${Date.now()}-${i}`,
        product_id: newProduct.id,
        created_at: new Date().toISOString(),
      })) as ProductPrice[];
      onAddProduct(newProduct, pricesWithProductId);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      onDeleteProduct(id);
    }
  };

  const addPriceRow = () => {
    setPrices([...prices, { platform_name: 'Amazon', price: '', link: '', is_best_seller: false }]);
  };

  const removePriceRow = (index: number) => {
    setPrices(prices.filter((_, i) => i !== index));
  };

  const updatePrice = (index: number, field: keyof PriceInput, value: string | boolean) => {
    const newPrices = [...prices];
    newPrices[index] = { ...newPrices[index], [field]: value };
    setPrices(newPrices);
  };

  // Calculate total interactions (dummy)
  const totalViews = 16400;
  const totalClicks = 6480;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-14 z-30 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back</span>
              </button>
              <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
            </div>
            <Button
              onClick={openAddDialog}
              size="sm"
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {[
            { label: 'Products', value: products.length, icon: LayoutGrid, color: 'blue' },
            { label: 'Categories', value: categories.length, icon: Tag, color: 'green' },
            { label: 'Price Entries', value: productPrices.length, icon: DollarSign, color: 'amber' },
            { label: 'Views', value: totalViews.toLocaleString(), icon: Eye, color: 'purple' },
            { label: 'Clicks', value: totalClicks.toLocaleString(), icon: TrendingUp, color: 'pink' },
          ].map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-9 h-9 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Chart */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Activity Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Views"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Clicks"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 h-10 bg-white border-gray-200 rounded-lg"
          />
        </div>

        {/* Products Table */}
        <Card className="border-0 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Prices</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => {
                  const prices = productPrices.filter(p => p.product_id === product.id);
                  const lowestPrice = prices.length > 0 ? Math.min(...prices.map(p => p.price)) : 0;
                  
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</p>
                            <p className="text-xs text-gray-500 line-clamp-1">{product.description.slice(0, 40)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">
                            ₹{lowestPrice.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">({prices.length})</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditDialog(product)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">No products found</p>
            </div>
          )}
        </Card>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] p-0">
          <DialogHeader className="px-4 py-3 border-b border-gray-100">
            <DialogTitle className="text-base">{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription className="text-xs">
              Fill in the details below to {editingProduct ? 'update' : 'add'} a product.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[calc(90vh-140px)]">
            <div className="p-4 space-y-4">
              {/* Basic Info */}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name" className="text-xs">Product Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    className="mt-1 h-9 text-sm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-xs">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                    className="mt-1 text-sm min-h-[60px]"
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="category" className="text-xs">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="mt-1 h-9 text-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat} className="text-sm">{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="image" className="text-xs">Image URL</Label>
                    <Input
                      id="image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="Image URL"
                      className="mt-1 h-9 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Prices Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-xs">Platform Prices</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addPriceRow} className="h-7 text-xs">
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {prices.map((price, index) => (
                    <div key={index} className="p-2.5 bg-gray-50 rounded-lg space-y-2">
                      {/* Platform & Best Seller */}
                      <div className="flex items-center gap-2">
                        <Select
                          value={price.platform_name}
                          onValueChange={(value) => updatePrice(index, 'platform_name', value)}
                        >
                          <SelectTrigger className="h-8 text-sm flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {platforms.map((p) => (
                              <SelectItem key={p} value={p} className="text-sm">{p}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <label className="flex items-center gap-1.5 text-xs whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={price.is_best_seller}
                            onChange={(e) => updatePrice(index, 'is_best_seller', e.target.checked)}
                            className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600"
                          />
                          Best Seller
                        </label>
                        
                        {prices.length > 1 && (
                          <button
                            onClick={() => removePriceRow(index)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      
                      {/* Price & Link */}
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="number"
                          value={price.price}
                          onChange={(e) => updatePrice(index, 'price', e.target.value)}
                          placeholder="Price (₹)"
                          className="h-8 text-sm"
                        />
                        <Input
                          value={price.link}
                          onChange={(e) => updatePrice(index, 'link', e.target.value)}
                          placeholder="Product link"
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50">
            <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              {editingProduct ? 'Update' : 'Add'} Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
