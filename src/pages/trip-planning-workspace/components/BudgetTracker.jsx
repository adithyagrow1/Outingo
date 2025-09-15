import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetTracker = ({ budget, expenses, onUpdateBudget }) => {
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [newBudgetAmount, setNewBudgetAmount] = useState(budget?.total);

  const categories = [
    { key: 'accommodation', label: 'Accommodation', icon: 'Bed', color: 'bg-blue-500' },
    { key: 'transportation', label: 'Transportation', icon: 'Car', color: 'bg-green-500' },
    { key: 'dining', label: 'Dining', icon: 'Utensils', color: 'bg-orange-500' },
    { key: 'activities', label: 'Activities', icon: 'MapPin', color: 'bg-purple-500' },
    { key: 'shopping', label: 'Shopping', icon: 'ShoppingBag', color: 'bg-pink-500' },
    { key: 'other', label: 'Other', icon: 'DollarSign', color: 'bg-gray-500' }
  ];

  const totalSpent = Object.values(expenses)?.reduce((sum, amount) => sum + amount, 0);
  const remaining = budget?.total - totalSpent;
  const spentPercentage = (totalSpent / budget?.total) * 100;

  const handleSaveBudget = () => {
    onUpdateBudget(parseFloat(newBudgetAmount) || 0);
    setIsEditingBudget(false);
  };

  const getProgressColor = (percentage) => {
    if (percentage <= 50) return 'bg-success';
    if (percentage <= 80) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="PiggyBank" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Budget Tracker</h2>
              <p className="text-sm text-muted-foreground">Monitor your trip expenses</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditingBudget(!isEditingBudget)}
          >
            <Icon name="Settings" size={16} />
          </Button>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Budget Overview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Total Budget</span>
            {isEditingBudget ? (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={newBudgetAmount}
                  onChange={(e) => setNewBudgetAmount(e?.target?.value)}
                  className="w-24 px-2 py-1 text-sm border border-border rounded"
                  placeholder="0"
                />
                <Button variant="ghost" size="sm" onClick={handleSaveBudget}>
                  <Icon name="Check" size={14} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsEditingBudget(false)}>
                  <Icon name="X" size={14} />
                </Button>
              </div>
            ) : (
              <span className="text-lg font-semibold text-foreground">
                ${budget?.total?.toFixed(2)}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Spent</span>
              <span className="font-medium text-foreground">${totalSpent?.toFixed(2)}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(spentPercentage)}`}
                style={{ width: `${Math.min(spentPercentage, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {spentPercentage?.toFixed(1)}% used
              </span>
              <span className={`font-medium ${remaining >= 0 ? 'text-success' : 'text-error'}`}>
                ${Math.abs(remaining)?.toFixed(2)} {remaining >= 0 ? 'remaining' : 'over budget'}
              </span>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Spending by Category</h3>
          <div className="space-y-3">
            {categories?.map((category) => {
              const amount = expenses?.[category?.key] || 0;
              const percentage = budget?.total > 0 ? (amount / budget?.total) * 100 : 0;
              
              return (
                <div key={category?.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${category?.color}`} />
                      <span className="text-sm font-medium text-foreground">
                        {category?.label}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      ${amount?.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${category?.color}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{percentage?.toFixed(1)}% of budget</span>
                    {amount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-xs"
                        onClick={() => console.log(`View ${category?.label} details`)}
                      >
                        View details
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => console.log('Add expense')}
            >
              Add Expense
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={() => console.log('Export budget')}
            >
              Export
            </Button>
          </div>
        </div>

        {/* Budget Alerts */}
        {spentPercentage > 80 && (
          <div className={`p-3 rounded-lg border ${
            spentPercentage > 100 
              ? 'bg-error/10 border-error text-error' :'bg-warning/10 border-warning text-warning'
          }`}>
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} />
              <span className="text-sm font-medium">
                {spentPercentage > 100 
                  ? 'Budget Exceeded!' :'Budget Alert!'}
              </span>
            </div>
            <p className="text-xs mt-1">
              {spentPercentage > 100 
                ? `You've exceeded your budget by $${Math.abs(remaining)?.toFixed(2)}. Consider adjusting your spending or increasing your budget.`
                : `You've used ${spentPercentage?.toFixed(1)}% of your budget. Only $${remaining?.toFixed(2)} remaining.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetTracker;