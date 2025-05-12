'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Result } from 'antd';

const PaymentFailed = () => {
  const router = useRouter();

  const handleTryAgainClick = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Result
        status="error"
        title="Payment Failed"
        extra={
          <Button 
            type="primary" 
            size="large" 
            danger
            onClick={handleTryAgainClick}
          >
            Try Again
          </Button>
        }
      />
    </div>
  );
};

export default PaymentFailed;