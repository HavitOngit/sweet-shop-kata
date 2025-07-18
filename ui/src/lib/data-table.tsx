import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createSweetShop } from "@core/index"; // Assuming this function initializes the sweet shop data
import { EllipsisVertical, Trash2Icon, Package } from "lucide-react";
import { useMemo, useState } from "react";
import { DashboardMetrics } from "./dashboard-overview";
import { dummySweets } from "./dummy-data";

interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export default function SweetShopDashboard() {
  const [shop, setShop] = useState(createSweetShop());
  const [sweets, setSweets] = useState(shop.getAllSweets());
  const [searchQuery, setSearchQuery] = useState("");

  // State for Add Sweet form
  const [newSweetName, setNewSweetName] = useState("");
  const [newSweetCategory, setNewSweetCategory] = useState("");
  const [newSweetPrice, setNewSweetPrice] = useState("");
  const [newSweetQuantity, setNewSweetQuantity] = useState("");
  const [isAddSweetDialogOpen, setIsAddSweetDialogOpen] = useState(false);

  // State for Restock/Purchase forms
  const [restockAmount, setRestockAmount] = useState(50);
  const [purchaseAmount, setPurchaseAmount] = useState(1);

  // State for Edit Sweet form
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [editSweetName, setEditSweetName] = useState("");
  const [editSweetCategory, setEditSweetCategory] = useState("");
  const [editSweetPrice, setEditSweetPrice] = useState("");
  const [editSweetQuantity, setEditSweetQuantity] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredSweets = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return sweets.filter((sweet) => {
      return (
        sweet.name.toLowerCase().includes(query) ||
        sweet.category.toLowerCase().includes(query) ||
        sweet.quantity.toString().includes(query)
      );
    });
  }, [sweets, searchQuery]);

  function handleAddSweet() {
    const data = {
      id: crypto.randomUUID(),
      name: newSweetName,
      category: newSweetCategory,
      price: Number.parseFloat(newSweetPrice),
      quantity: Number.parseInt(newSweetQuantity),
    };
    shop.addSweet(data);
    setSweets(shop.getAllSweets());
    // Reset form fields
    setNewSweetName("");
    setNewSweetCategory("");
    setNewSweetPrice("");
    setNewSweetQuantity("");
    setIsAddSweetDialogOpen(false); // Close dialog
  }

  function handleDeleteSweet(id: string) {
    shop.deleteSweet(id);
    setSweets(shop.getAllSweets());
  }

  function handleRestockSweet(id: string) {
    shop.restockSweet(id, restockAmount);
    setSweets(shop.getAllSweets());
    setRestockAmount(50); // Reset restock amount
  }

  function handlePurchaseSweet(id: string) {
    shop.purchaseSweet(id, purchaseAmount);
    setSweets(shop.getAllSweets());
    setPurchaseAmount(1); // Reset purchase amount
  }

  function handleEditSweet() {
    if (editingSweet) {
      const updatedSweet = {
        ...editingSweet,
        name: editSweetName,
        category: editSweetCategory,
        price: Number.parseFloat(editSweetPrice),
        quantity: Number.parseInt(editSweetQuantity),
      };
      shop.updateSweet(updatedSweet.id, updatedSweet); // Assuming a shop.updateSweet method exists
      setSweets(shop.getAllSweets());
      setIsEditDialogOpen(false); // Close dialog
      setEditingSweet(null); // Clear editing state
    }
  }

  // Function to prepare data for editing
  function openEditDialog(sweet: Sweet) {
    setEditingSweet(sweet);
    setEditSweetName(sweet.name);
    setEditSweetCategory(sweet.category);
    setEditSweetPrice(sweet.price.toString());
    setEditSweetQuantity(sweet.quantity.toString());
    setIsEditDialogOpen(true);
  }

  // Function to add dummy data
  function handleAddDummyData() {
    dummySweets.forEach((dummySweet) => {
      // Generate a new UUID for each dummy sweet to avoid ID conflicts
      const sweetData = {
        ...dummySweet,
        id: crypto.randomUUID(),
      };
      shop.addSweet(sweetData);
    });
    setSweets(shop.getAllSweets());
  }

  return (
    <div className="w-full p-4">
      <DashboardMetrics sweets={sweets} />

      <div className="flex items-center py-4">
        <Input
          placeholder="Search by name, category, or stock..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="ml-4 flex gap-2">
          <Dialog
            open={isAddSweetDialogOpen}
            onOpenChange={setIsAddSweetDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant={"outline"}>Add Sweet</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Sweet</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new sweet.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newSweetName}
                    onChange={(e) => setNewSweetName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Input
                    id="category"
                    value={newSweetCategory}
                    onChange={(e) => setNewSweetCategory(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newSweetPrice}
                    onChange={(e) => setNewSweetPrice(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newSweetQuantity}
                    onChange={(e) => setNewSweetQuantity(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddSweet}>
                  Add Sweet
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="secondary"
            onClick={handleAddDummyData}
            className="flex items-center gap-2"
          >
            <Package size={16} />
            Add Dummy Data
          </Button>
        </div>
      </div>
      <Table>
        <TableCaption>Sweet Shop Dashboard</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Name</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSweets.map((sweet) => (
            <TableRow key={sweet.id}>
              <TableCell className="font-medium text-left">
                {sweet.name}
              </TableCell>
              <TableCell>{sweet.category}</TableCell>
              <TableCell>₹{Number(sweet.price.toFixed(2))}</TableCell>
              <TableCell>{sweet.quantity}</TableCell>
              <TableCell>
                <Badge variant={sweet.quantity > 0 ? "outline" : "destructive"}>
                  {sweet.quantity > 0 ? "Available" : "Out of Stock"}
                </Badge>
              </TableCell>
              <TableCell className="text-right justify-self-end gap-2 items-center flex">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Restock
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Restock {sweet.name}</AlertDialogTitle>
                      <AlertDialogDescription>
                        Enter the amount to restock:
                        <Input
                          type="number"
                          value={restockAmount}
                          onChange={(e) =>
                            setRestockAmount(
                              Number.parseInt(e.target.value) || 0,
                            )
                          }
                          className="mt-2"
                        />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleRestockSweet(sweet.id)}
                      >
                        Restock
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="default" size="sm">
                      Buy
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Purchase {sweet.name}</AlertDialogTitle>
                      <AlertDialogDescription>
                        Enter the quantity to purchase:
                        <Input
                          type="number"
                          value={purchaseAmount}
                          onChange={(e) =>
                            setPurchaseAmount(
                              Number.parseInt(e.target.value) || 0,
                            )
                          }
                          className="mt-2"
                        />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handlePurchaseSweet(sweet.id)}
                      >
                        Purchase
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Popover>
                  <PopoverTrigger>
                    <EllipsisVertical className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col max-w-min gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                      onClick={() => openEditDialog(sweet)}
                    >
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2Icon />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete{" "}
                            <span className="font-bold">{sweet.name}</span> from
                            your sweet shop.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteSweet(sweet.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Sweet Dialog */}
      {editingSweet && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit {editingSweet.name}</DialogTitle>
              <DialogDescription>
                Make changes to the sweet details here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editSweetName}
                  onChange={(e) => setEditSweetName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Category
                </Label>
                <Input
                  id="edit-category"
                  value={editSweetCategory}
                  onChange={(e) => setEditSweetCategory(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Price
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={editSweetPrice}
                  onChange={(e) => setEditSweetPrice(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  value={editSweetQuantity}
                  onChange={(e) => setEditSweetQuantity(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleEditSweet}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
