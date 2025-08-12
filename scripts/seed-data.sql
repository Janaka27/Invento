-- Seed Data for Invento Database
-- This script populates the database with initial test data

BEGIN;

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description) VALUES
('default_currency', 'USD', 'string', 'Default currency for the system'),
('default_timezone', 'UTC', 'string', 'Default timezone for the system'),
('low_stock_threshold', '10', 'integer', 'Default low stock threshold percentage'),
('auto_backup_enabled', 'true', 'boolean', 'Enable automatic database backups'),
('session_timeout_minutes', '30', 'integer', 'User session timeout in minutes'),
('company_name', 'Invento Demo Company', 'string', 'Company name for reports and invoices'),
('company_address', '123 Business Street, Colombo, Sri Lanka', 'string', 'Company address'),
('tax_rate', '8.5', 'decimal', 'Default tax rate percentage');

-- Insert default admin user (password: admin123)
INSERT INTO users (username, email, password_hash, full_name, role, is_active) VALUES
('admin', 'admin@invento.com', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'System Administrator', 'admin', true),
('manager1', 'manager@invento.com', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'John Manager', 'manager', true),
('staff1', 'staff@invento.com', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'Jane Staff', 'staff', true),
('cashier1', 'cashier@invento.com', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'Mike Cashier', 'cashier', true);

-- Insert product categories
INSERT INTO product_categories (category_name, description) VALUES
('Electronics', 'Electronic devices and accessories'),
('Furniture', 'Office and home furniture'),
('Stationery', 'Office supplies and stationery items'),
('Clothing', 'Apparel and accessories'),
('Books', 'Books and educational materials'),
('Tools', 'Hardware tools and equipment'),
('Food & Beverages', 'Food items and beverages'),
('Health & Beauty', 'Health and beauty products'),
('Tea', 'Tea products'),
('Spices', 'Spice products'),
('Oils', 'Oil products');

-- Insert units of measure
INSERT INTO units_of_measure (uom_name, abbreviation, description) VALUES
('Pieces', 'pcs', 'Individual items or pieces'),
('Kilograms', 'kg', 'Weight in kilograms'),
('Liters', 'L', 'Volume in liters'),
('Meters', 'm', 'Length in meters'),
('Boxes', 'box', 'Items sold in boxes'),
('Dozens', 'doz', 'Items sold in dozens'),
('Pairs', 'pair', 'Items sold in pairs'),
('Sets', 'set', 'Items sold as sets');

-- Insert warehouses
INSERT INTO warehouses (warehouse_name, location, address, capacity, manager_id, is_active) VALUES
('Main Warehouse', 'Colombo', '123 Industrial Road, Colombo 01, Sri Lanka', 10000, 2, true),
('Warehouse B', 'Kandy', '456 Storage Avenue, Kandy, Sri Lanka', 5000, 2, true),
('Warehouse C', 'Galle', '789 Distribution Center, Galle, Sri Lanka', 7500, 2, true),
('Outlet Store', 'Colombo', '321 Retail Street, Colombo 03, Sri Lanka', 2000, 3, true),
('Main Warehouse Colombo', 'Colombo', '123 Industrial Road, Colombo 01, Sri Lanka', 10000, 2, true),
('Kandy Distribution Center', 'Kandy', '456 Storage Avenue, Kandy, Sri Lanka', 5000, 2, true);

-- Insert suppliers
INSERT INTO suppliers (supplier_name, contact_person, email, phone, address, payment_terms, is_active) VALUES
('Tech Solutions Ltd', 'David Wilson', 'david@techsolutions.com', '+94-11-1234567', '100 Tech Park, Colombo', 'Net 30', true),
('Office Furniture Co', 'Sarah Johnson', 'sarah@officefurniture.com', '+94-11-2345678', '200 Furniture Street, Kandy', 'Net 15', true),
('Global Electronics', 'Michael Chen', 'michael@globalelectronics.com', '+94-11-3456789', '300 Electronics Hub, Galle', 'Net 45', true),
('Stationery Plus', 'Emma Brown', 'emma@stationeryplus.com', '+94-11-4567890', '400 Supply Road, Colombo', 'Net 30', true);

-- Insert products
INSERT INTO products (sku, product_name, description, category_id, uom_id, unit_price, min_stock_level, max_stock_level, is_active, created_by) VALUES
('LAP-001', 'Gaming Laptop Pro', 'High-performance gaming laptop with RTX graphics', 1, 1, 1299.99, 10, 100, true, 1),
('CHR-002', 'Office Chair Deluxe', 'Ergonomic office chair with lumbar support', 2, 1, 299.99, 15, 50, true, 1),
('MOU-003', 'Wireless Mouse', 'Bluetooth wireless mouse with precision tracking', 1, 1, 49.99, 20, 200, true, 1),
('MON-004', '4K Monitor 27"', 'Ultra HD 4K monitor 27 inch display', 1, 1, 399.99, 8, 40, true, 1),
('DSK-005', 'Standing Desk', 'Height-adjustable standing desk', 2, 1, 599.99, 5, 25, true, 1),
('PEN-006', 'Ballpoint Pen Set', 'Set of 12 premium ballpoint pens', 3, 6, 24.99, 50, 500, true, 1),
('NOT-007', 'Notebook A4', 'Spiral-bound A4 notebook 200 pages', 3, 1, 8.99, 100, 1000, true, 1),
('TAB-008', 'Tablet 10 inch', 'Android tablet with 10 inch display', 1, 1, 249.99, 12, 60, true, 1),
('CAB-009', 'Filing Cabinet', '4-drawer metal filing cabinet', 2, 1, 189.99, 8, 30, true, 1),
('PRN-010', 'Laser Printer', 'Monochrome laser printer for office use', 1, 1, 199.99, 6, 25, true, 1),
('CBT001', 'Ceylon Black Tea', 'Tea products', 9, 1, 1500.00, 500, 500, true, 1),
('CS002', 'Cinnamon Sticks', 'Spice products', 10, 1, 2500.00, 200, 200, true, 1),
('CO003', 'Coconut Oil', 'Oil products', 11, 1, 800.00, 300, 300, true, 1);

-- Insert initial warehouse inventory
INSERT INTO warehouse_inventory (product_id, warehouse_id, quantity_on_hand, reserved_quantity) VALUES
-- Main Warehouse
(1, 1, 45, 0),  -- Gaming Laptop Pro
(2, 1, 25, 0),  -- Office Chair Deluxe
(3, 1, 150, 0), -- Wireless Mouse
(4, 1, 23, 0),  -- 4K Monitor
(5, 1, 12, 0),  -- Standing Desk
(6, 1, 200, 0), -- Ballpoint Pen Set
(7, 1, 500, 0), -- Notebook A4
(8, 1, 18, 0),  -- Tablet
(9, 1, 15, 0),  -- Filing Cabinet
(10, 1, 12, 0), -- Laser Printer
(11, 1, 500, 0), -- Ceylon Black Tea
(12, 1, 200, 0), -- Cinnamon Sticks
(13, 1, 300, 0), -- Coconut Oil

-- Warehouse B
(1, 2, 20, 0),
(2, 2, 8, 0),   -- Low stock
(3, 2, 0, 0),   -- Out of stock
(4, 2, 15, 0),
(5, 2, 8, 0),
(6, 2, 100, 0),
(7, 2, 300, 0),
(8, 2, 10, 0),
(9, 2, 6, 0),
(10, 2, 8, 0),

-- Warehouse C
(1, 3, 30, 0),
(2, 3, 18, 0),
(3, 3, 80, 0),
(4, 3, 12, 0),
(5, 3, 5, 0),
(6, 3, 150, 0),
(7, 3, 400, 0),
(8, 3, 15, 0),
(9, 3, 10, 0),
(10, 3, 5, 0);

-- Insert customers
INSERT INTO customers (customer_code, customer_name, customer_type, email, phone, billing_address, credit_limit, current_balance, is_active) VALUES
('CUST-001', 'ABC Corporation', 'corporate', 'accounts@abccorp.com', '+94-11-1111111', '100 Business Ave, Colombo', 50000.00, 2500.00, true),
('CUST-002', 'John Smith', 'individual', 'john.smith@email.com', '+94-77-1234567', '25 Residential Road, Kandy', 5000.00, 0.00, true),
('CUST-003', 'XYZ Enterprises', 'corporate', 'billing@xyzent.com', '+94-11-2222222', '200 Corporate Street, Galle', 75000.00, 15000.00, true),
('CUST-004', 'Jane Doe', 'individual', 'jane.doe@email.com', '+94-76-9876543', '50 Home Lane, Colombo', 3000.00, 500.00, true),
('CUST-005', 'Tech Startup Ltd', 'corporate', 'finance@techstartup.com', '+94-11-3333333', '300 Innovation Hub, Colombo', 25000.00, 8000.00, true);

-- Insert sample purchase orders
INSERT INTO purchase_orders (po_number, supplier_id, warehouse_id, order_date, expected_delivery_date, status, total_amount, created_by) VALUES
('PO-2024-001', 1, 1, '2024-01-10', '2024-01-20', 'completed', 15599.88, 2),
('PO-2024-002', 2, 1, '2024-01-12', '2024-01-22', 'pending', 5999.85, 2),
('PO-2024-003', 3, 2, '2024-01-15', '2024-01-25', 'approved', 8999.75, 2);

-- Insert purchase order items
INSERT INTO purchase_order_items (po_id, product_id, quantity_ordered, quantity_received, unit_price) VALUES
-- PO-2024-001 (completed)
(1, 1, 12, 12, 1299.99),  -- Gaming Laptop Pro
(1, 4, 6, 6, 399.99),     -- 4K Monitor

-- PO-2024-002 (pending)
(2, 2, 20, 0, 299.99),    -- Office Chair Deluxe

-- PO-2024-003 (approved)
(3, 3, 50, 0, 49.99),     -- Wireless Mouse
(3, 8, 15, 0, 249.99),    -- Tablet
(3, 10, 8, 0, 199.99);    -- Laser Printer

-- Insert sample stock transfers
INSERT INTO stock_transfers (transfer_number, from_warehouse_id, to_warehouse_id, transfer_date, status, requested_by, notes) VALUES
('TRF-2024-001', 1, 2, '2024-01-15', 'pending', 3, 'Restock Warehouse B with popular items'),
('TRF-2024-002', 1, 3, '2024-01-14', 'approved', 3, 'Transfer excess inventory to Warehouse C'),
('TRF-2024-003', 2, 1, '2024-01-13', 'completed', 3, 'Return damaged items to main warehouse'),
('TRF-2024-004', 3, 2, '2024-01-12', 'rejected', 3, 'Transfer request denied due to insufficient stock');

-- Insert stock transfer items
INSERT INTO stock_transfer_items (transfer_id, product_id, quantity_requested, quantity_transferred, notes) VALUES
-- TRF-2024-001 (pending)
(1, 1, 10, 0, 'High demand item'),
(1, 3, 25, 0, 'Restock wireless mice'),

-- TRF-2024-002 (approved)
(2, 2, 5, 0, 'Transfer office chairs'),
(2, 4, 8, 0, 'Transfer monitors'),

-- TRF-2024-003 (completed)
(3, 3, 15, 15, 'Completed transfer'),
(3, 7, 50, 50, 'Notebook transfer completed'),

-- TRF-2024-004 (rejected)
(4, 1, 20, 0, 'Insufficient stock at source warehouse');

-- Insert sample sales orders
INSERT INTO sales_orders (order_number, customer_id, warehouse_id, order_date, status, subtotal, tax_amount, total_amount, payment_method, payment_status, created_by) VALUES
('INV-2024-001', 1, 1, '2024-01-15', 'completed', 1649.97, 140.25, 1790.22, 'card', 'paid', 4),
('INV-2024-002', 2, 1, '2024-01-15', 'completed', 299.99, 25.50, 325.49, 'cash', 'paid', 4),
('INV-2024-003', 3, 2, '2024-01-14', 'pending', 449.98, 38.25, 488.23, 'card', 'pending', 4),
('INV-2024-004', 4, 1, '2024-01-14', 'completed', 58.98, 5.01, 63.99, 'cash', 'paid', 4),
('INV-2024-005', 5, 1, '2024-01-13', 'shipped', 1949.96, 165.75, 2115.71, 'card', 'paid', 4);

-- Insert sales order items
INSERT INTO sales_order_items (order_id, product_id, quantity, unit_price, discount_percent) VALUES
-- INV-2024-001
(1, 1, 1, 1299.99, 0),    -- Gaming Laptop Pro
(1, 3, 7, 49.99, 0),      -- Wireless Mouse

-- INV-2024-002
(2, 2, 1, 299.99, 0),     -- Office Chair Deluxe

-- INV-2024-003
(3, 3, 2, 49.99, 0),      -- Wireless Mouse
(3, 4, 1, 399.99, 10),    -- 4K Monitor with 10% discount

-- INV-2024-004
(4, 6, 1, 24.99, 0),      -- Ballpoint Pen Set
(4, 7, 4, 8.99, 5),       -- Notebook A4 with 5% discount

-- INV-2024-005
(5, 1, 1, 1299.99, 0),    -- Gaming Laptop Pro
(5, 5, 1, 599.99, 0),     -- Standing Desk
(5, 3, 1, 49.99, 0);      -- Wireless Mouse

-- Insert sample inventory transactions (audit trail)
INSERT INTO inventory_transactions (product_id, warehouse_id, transaction_type, reference_type, reference_id, quantity_change, quantity_before, quantity_after, unit_cost, notes, created_by) VALUES
-- Initial stock receipts
(1, 1, 'receipt', 'purchase_order', 1, 12, 33, 45, 1299.99, 'Initial stock from PO-2024-001', 2),
(4, 1, 'receipt', 'purchase_order', 1, 6, 17, 23, 399.99, 'Initial stock from PO-2024-001', 2),

-- Sales transactions
(1, 1, 'sale', 'sales_order', 1, -1, 45, 44, 1299.99, 'Sale to ABC Corporation', 4),
(3, 1, 'sale', 'sales_order', 1, -7, 157, 150, 49.99, 'Sale to ABC Corporation', 4),
(2, 1, 'sale', 'sales_order', 2, -1, 26, 25, 299.99, 'Sale to John Smith', 4),

-- Stock adjustments
(3, 2, 'adjustment', 'adjustment', NULL, -5, 5, 0, 49.99, 'Damaged items written off', 3),
(7, 1, 'adjustment', 'adjustment', NULL, 10, 490, 500, 8.99, 'Found additional stock during count', 3);

-- Insert sample inventory movements
INSERT INTO inventory_movements (product_id, warehouse_id, movement_type, quantity) VALUES
(1, 1, 'inbound', 500),
(2, 1, 'inbound', 200),
(3, 2, 'inbound', 300),
(1, 1, 'outbound', 50);

-- Create some sample audit log entries
INSERT INTO audit_log (user_id, action, table_name, record_id, new_values, ip_address, user_agent) VALUES
(1, 'CREATE', 'products', 1, '{"sku": "LAP-001", "product_name": "Gaming Laptop Pro"}', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
(2, 'UPDATE', 'warehouse_inventory', 1, '{"quantity_on_hand": 44}', '192.168.1.101', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
(4, 'CREATE', 'sales_orders', 1, '{"order_number": "INV-2024-001", "total_amount": 1790.22}', '192.168.1.102', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
(3, 'CREATE', 'stock_transfers', 1, '{"transfer_number": "TRF-2024-001", "status": "pending"}', '192.168.1.103', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

COMMIT;

-- Display summary of inserted data
SELECT 'Data seeding completed successfully!' as status;
SELECT 'Users created: ' || COUNT(*) as summary FROM users;
SELECT 'Products created: ' || COUNT(*) as summary FROM products;
SELECT 'Warehouses created: ' || COUNT(*) as summary FROM warehouses;
SELECT 'Suppliers created: ' || COUNT(*) as summary FROM suppliers;
SELECT 'Customers created: ' || COUNT(*) as summary FROM customers;
SELECT 'Purchase Orders created: ' || COUNT(*) as summary FROM purchase_orders;
SELECT 'Sales Orders created: ' || COUNT(*) as summary FROM sales_orders;
SELECT 'Stock Transfers created: ' || COUNT(*) as summary FROM stock_transfers;
SELECT 'Inventory Movements created: ' || COUNT(*) as summary FROM inventory_movements;
