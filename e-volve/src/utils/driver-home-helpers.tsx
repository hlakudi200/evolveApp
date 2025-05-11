import { IDriver } from "@/providers/interfaces";

// Calculate today's earnings for a driver
export const calculateTodaysEarnings = (driver?: IDriver): number => {
    if (!driver?.payments || !Array.isArray(driver.payments)) {
      return 0;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    
    const todaysPayments = driver.payments.filter(payment => {
      // Only count successful payments
      if (payment.status !== 'successful' && payment.status !== 'completed') {
        return false;
      }
      
      const paymentDate = new Date(payment.paymentDate);
      paymentDate.setHours(0, 0, 0, 0); // Set to beginning of payment day
      return paymentDate.getTime() === today.getTime();
    });
    
    return todaysPayments.reduce((total, payment) => total + payment.amount, 0);
  };
  
  // Get driver stats based on available data
  export const getDriverStats = (driver?: IDriver): { label: string; value: string | number; icon: string } => {
    if (!driver) {
      return {
        label: "Total Trips",
        value: 0,
        icon: "car"
      };
    }
    
    // Calculate trips count if available
    if (driver.payments && Array.isArray(driver.payments)) {
      return {
        label: "Total Trips",
        value: driver.payments.length,
        icon: "car"
      };
    }
    
    // If driver has an association, show association name
    if (driver.AssociationName || driver.association?.name) {
      return {
        label: "Association",
        value: driver.AssociationName || driver.association?.name || "Unknown",
        icon: "users"
      };
    }
    
    // Show license type as fallback
    if (driver.licenseType) {
      return {
        label: "License Type",
        value: driver.licenseType,
        icon: "id-card"
      };
    }
    
    // Default fallback
    return {
      label: "Account Status",
      value: driver.isActive ? "Active" : "Inactive",
      icon: "activity"
    };
  };
  
  // Calculate days until license expires
  export const getDaysUntilLicenseExpiry = (driver?: IDriver): number | null => {
    if (!driver?.licenseExpiryDate) {
      return null;
    }
    
    const today = new Date();
    const expiryDate = new Date(driver.licenseExpiryDate);
    
    // Calculate difference in days
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  // Interface for Payment

  
  // Interface for Association (inferred from your code)
