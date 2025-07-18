import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface DashboardMetricsProps {
  sweets: Sweet[];
}

interface HeroProps {
  title: string;
  description?: string;
}

export function Hero({ title, description }: HeroProps) {
  return (
    <div className="mb-6 text-left">
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{title}</h1>
      {description && (
        <p className="mt-2 text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export function DashboardMetrics({ sweets }: DashboardMetricsProps) {
  const totalQuantity = sweets.reduce((sum, sweet) => sum + sweet.quantity, 0);
  const totalMoneyValue = sweets.reduce(
    (sum, sweet) => sum + sweet.price * sweet.quantity,
    0,
  );
  const outOfStock = sweets.filter((sweet) => sweet.quantity === 0).length;
  const availableItems = sweets.filter((sweet) => sweet.quantity > 0).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Quantity</CardTitle>
          <PackageIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalQuantity}</div>
          <p className="text-xs text-muted-foreground">
            Total sweets across all categories
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Inventory Value
          </CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹{totalMoneyValue.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Estimated value of all stock
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Out of Stock Items
          </CardTitle>
          <AlertCircleIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{outOfStock}</div>
          <p className="text-xs text-muted-foreground">
            Sweets with zero quantity
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Items</CardTitle>
          <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{availableItems}</div>
          <p className="text-xs text-muted-foreground">
            Sweets currently in stock
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function PackageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.274 6.25 2.813a1 1 0 0 0 .75 0l6.25-2.813M12 2v20M2 10h20M6 14h12" />
      <path d="m7.5 4.274 6.25 2.813a1 1 0 0 0 .75 0l6.25-2.813" />
      <path d="m7.5 4.274-5.5 2.475v9.502l5.5 2.475" />
      <path d="M12 2v20" />
      <path d="M2 10h20" />
      <path d="M6 14h12" />
      <path d="m16.5 4.274 5.5 2.475v9.502l-5.5 2.475" />
    </svg>
  );
}

function DollarSignIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function AlertCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
