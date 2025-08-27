import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomObject {
  id: string;
  name: string;
  type: string;
  description: string;
  status: "active" | "inactive";
  createdAt: string;
  recordCount: number;
}

const mockObjects: CustomObject[] = [
  {
    id: "1",
    name: "Gaming Laptop Pro",
    type: "Products",
    description: "High-performance gaming laptop with RTX graphics",
    status: "active",
    createdAt: "2024-01-15",
    recordCount: 45,
  },
  {
    id: "2", 
    name: "Web Development Service",
    type: "Services",
    description: "Full-stack web development consulting",
    status: "active",
    createdAt: "2024-02-01",
    recordCount: 12,
  },
  {
    id: "3",
    name: "Summer Campaign 2024",
    type: "Campaigns", 
    description: "Q2 marketing campaign for product launches",
    status: "inactive",
    createdAt: "2024-03-10",
    recordCount: 8,
  },
];

export function CustomObjects() {
  const [objects, setObjects] = useState<CustomObject[]>(mockObjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newObject: CustomObject = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      description: formData.description,
      status: "active",
      createdAt: new Date().toISOString().split('T')[0],
      recordCount: 0,
    };

    setObjects([...objects, newObject]);
    setFormData({ name: "", type: "", description: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Success!",
      description: "Custom object created successfully.",
    });
  };

  const handleDelete = (id: string) => {
    setObjects(objects.filter(obj => obj.id !== id));
    toast({
      title: "Deleted",
      description: "Custom object has been deleted.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Custom Objects</h2>
          <p className="text-muted-foreground">Manage your HubSpot custom objects</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary-glow shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Create Object
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Custom Object</DialogTitle>
              <DialogDescription>
                Add a new custom object to your HubSpot integration.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter object name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="e.g., Products, Services, Campaigns"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter object description"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Object</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Objects Overview</CardTitle>
          <CardDescription>
            View and manage all your custom objects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {objects.map((object) => (
                <TableRow key={object.id}>
                  <TableCell className="font-medium">{object.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{object.type}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{object.description}</TableCell>
                  <TableCell>
                    <Badge variant={object.status === "active" ? "default" : "secondary"}>
                      {object.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{object.recordCount}</TableCell>
                  <TableCell>{object.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(object.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}