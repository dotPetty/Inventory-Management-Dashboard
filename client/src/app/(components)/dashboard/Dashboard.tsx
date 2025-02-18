'use client'
import React from 'react';
import PopularProductsCard from './PopularProductsCard';
import PurchaseSummaryCard from './PurchaseSummaryCard';
import SalesSummaryCard from './SalesSummaryCard';
import ExpenseSummaryCard from './ExpenseSummaryCard';

const Dashboard = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows'>
      <PopularProductsCard />
      <SalesSummaryCard />
      <PurchaseSummaryCard />
      <ExpenseSummaryCard />
    </div>
  )
}

export default Dashboard
