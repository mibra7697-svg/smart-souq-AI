import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../../src/components/products/ProductCard';

const mockProduct = {
  id: 1,
  name: 'iPhone 15 Pro Max',
  originalPrice: 1299,
  discountedPrice: 1199,
  discountPercent: 8,
  store: 'Amazon',
  commission: 4.5,
  rating: 4.8,
  sales: 1245,
  affiliateUrl: 'https://amazon.com/test'
};

// Mock window.open
const mockWindowOpen = jest.fn();
window.open = mockWindowOpen;

// Mock tracking service
jest.mock('../../../src/services/tracking/trackingService', () => ({
  trackAffiliateClick: jest.fn()
}));

describe('ProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument();
    expect(screen.getByText('$1299')).toBeInTheDocument(); // Original price
    expect(screen.getByText('$1199')).toBeInTheDocument(); // Discounted price
    expect(screen.getByText('خصم 8%')).toBeInTheDocument();
    expect(screen.getByText('Amazon')).toBeInTheDocument();
    expect(screen.getByText('⭐ 4.8')).toBeInTheDocument();
    expect(screen.getByText('عمولة: 4.5%')).toBeInTheDocument();
  });

  test('calculates commission correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    const commission = (1199 * 4.5 / 100).toFixed(2);
    expect(screen.getByText(`شراء وربح $${commission}`)).toBeInTheDocument();
  });

  test('opens affiliate link on buy button click', () => {
    render(<ProductCard product={mockProduct} />);
    
    const buyButton = screen.getByText(/شراء وربح/);
    fireEvent.click(buyButton);
    
    expect(mockWindowOpen).toHaveBeenCalledWith('https://amazon.com/test', '_blank');
  });

  test('shows watch button functionality', () => {
    render(<ProductCard product={mockProduct} />);
    
    const watchButton = screen.getByText('👁️ مراقبة السعر');
    expect(watchButton).toBeInTheDocument();
    
    fireEvent.click(watchButton);
    // Add specific test for watch functionality when implemented
  });

  test('handles missing discount gracefully', () => {
    const productWithoutDiscount = { ...mockProduct, discountPercent: 0 };
    render(<ProductCard product={productWithoutDiscount} />);
    
    expect(screen.queryByText('خصم 0%')).not.toBeInTheDocument();
  });
});