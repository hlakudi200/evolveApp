'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Result } from 'antd';

const PaymentSuccess = () => {
  const router = useRouter();

  const handleDoneClick = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Result
        status="success"
        title="Payment Successful"
        extra={
          <Button 
            type="primary" 
            size="large"
            onClick={handleDoneClick}
          >
            Done
          </Button>
        }
      />
    </div>
  );
};

export default PaymentSuccess;