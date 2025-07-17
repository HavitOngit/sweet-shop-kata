# Sweet Shop Management System

A TypeScript-based inventory management system for sweet shops built following Test-Driven Development (TDD) principles. This system allows users to manage sweet inventory, handle purchases, and perform inventory operations with full CRUD functionality.

## Features

### Core Operations

- **Add Sweets**: Add new sweets with unique ID, name, category, price, and stock quantity
- **Update Sweets**: Modify existing sweet details
- **Delete Sweets**: Remove sweets from inventory
- **View Sweets**: Display all available sweets in the shop

### Search & Filter

- **Search by Name**: Find sweets by their name
- **Filter by Category**: Browse sweets by category (chocolate, candy, pastry)
- **Price Range Filter**: Search sweets within specific price ranges

### Inventory Management

- **Purchase Sweets**: Decrease stock quantity with validation
- **Restock Sweets**: Increase stock quantity
- **Stock Validation**: Prevent purchases when insufficient stock available
- **Error Handling**: Appropriate error messages for stock issues

## Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **Testing**: Built-in test runner
- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Husky for pre-commit validation
- **CI/CD**: GitHub Actions for automated releases

## Project Structure

```
sweet-shop-management-system/
├── src/
│   ├── models/          # Data models and interfaces
│   ├── repositories/    # Data access layer
│   ├── services/        # Business logic layer
│   ├── errors/          # Custom error classes
│   ├── sweet.ts         # Main sweet entity
│   ├── sweet.test.ts    # Sweet entity tests
│   └── util.ts          # Utility functions
├── tests/               # Test files organized by layer
├── .github/workflows/   # CI/CD configuration
├── .husky/             # Git hooks
└── package.json
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sweet-shop-management-system
```

2. Install dependencies:

```bash
bun install
```

3. Run tests:

```bash
bun test
```

4. Start development:

```bash
bun run dev
```

## Development Workflow

This project follows **Test-Driven Development (TDD)** principles:

1. **Red**: Write a failing test
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve code while keeping tests green

### Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run specific test file
bun test src/sweet.test.ts

# Generate coverage report
bun test --coverage
```

### Test Coverage

![Test Coverage Report](test-report.png)

Current test coverage: **95.16%** overall coverage with comprehensive testing across all layers.

### Code Quality

```bash
# Lint code
bun run lint

# Format code
bun run format

# Type check
bun run type-check
```

## API Reference

### Sweet Model

```typescript
interface Sweet {
  id: string;
  name: string;
  category: "chocolate" | "candy" | "pastry";
  price: number;
  quantity: number;
}
```

### Core Methods

```typescript
// Add a new sweet
addSweet(sweet: Sweet): void

// Update existing sweet
updateSweet(id: string, updates: Partial<Sweet>): void

// Delete sweet
deleteSweet(id: string): void

// Get all sweets
getAllSweets(): Sweet[]

// Search sweets
searchSweets(query: string): Sweet[]

// Filter by category
filterByCategory(category: string): Sweet[]

// Purchase sweet (decrease stock)
purchaseSweet(id: string, quantity: number): void

// Restock sweet (increase stock)
restockSweet(id: string, quantity: number): void
```

## Error Handling

The system includes custom error classes for various scenarios:

- `InsufficientStockError`: When attempting to purchase more than available stock
- `SweetNotFoundError`: When trying to access non-existent sweet
- `InvalidInputError`: When provided data is invalid

## Testing Strategy

- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test component interactions
- **Error Scenarios**: Test error handling and edge cases
- **High Coverage**: Aim for comprehensive test coverage

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Follow TDD principles: Write tests first, then implementation
4. Ensure all tests pass: `bun test`
5. Commit with meaningful messages
6. Push to your fork and create a Pull Request

## AI Usage

This project encourages the use of AI tools in the Software Development Life Cycle (SDLC). AI-assisted commits are marked separately for transparency.

---
