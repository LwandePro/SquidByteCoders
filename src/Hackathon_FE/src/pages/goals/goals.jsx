import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar, 
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  Save,
  X,
} from 'lucide-react';

// Import the new Sidetag and HeaderNav components
import Sidetag from '../common/sidetag';
import HeaderNav from '../common/headernav';

const GoalTrackerPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('goals');
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Emergency Fund',
      targetAmount: 100000,
      currentAmount: 67500,
      deadline: '2025-12-31',
      category: 'Safety',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Vacation to Europe',
      targetAmount: 35000,
      currentAmount: 18500,
      deadline: '2025-06-15',
      category: 'Travel',
      createdDate: '2024-02-01'
    },
    {
      id: 3,
      name: 'New Car Down Payment',
      targetAmount: 50000,
      currentAmount: 12000,
      deadline: '2025-09-30',
      category: 'Transport',
      createdDate: '2024-03-10'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
    category: 'Other'
  });

  const [editingGoal, setEditingGoal] = useState(null);

  const categories = ['Safety', 'Travel', 'Transport', 'Investment', 'Education', 'Home', 'Other'];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.targetAmount || !formData.deadline) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingGoal) {
      setGoals(prev => prev.map(goal => 
        goal.id === editingGoal.id 
          ? { ...goal, ...formData, targetAmount: parseFloat(formData.targetAmount) }
          : goal
      ));
      setEditingGoal(null);
    } else {
      const newGoal = {
        id: Date.now(),
        name: formData.name,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: 0,
        deadline: formData.deadline,
        category: formData.category,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setGoals(prev => [...prev, newGoal]);
    }

    setFormData({
      name: '',
      targetAmount: '',
      deadline: '',
      category: 'Other'
    });
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setFormData({
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      deadline: goal.deadline,
      category: goal.category
    });
  };

  const handleCancelEdit = () => {
    setEditingGoal(null);
    setFormData({
      name: '',
      targetAmount: '',
      deadline: '',
      category: 'Other'
    });
  };

  const handleDelete = (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
    }
  };

  const updateGoalProgress = (goalId, newAmount) => {
    setGoals(prev => prev.map(goal =>
      goal.id === goalId
        ? { ...goal, currentAmount: parseFloat(newAmount) || 0 }
        : goal
    ));
  };

  const getStatusBadge = (goal) => {
    const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
    const daysRemaining = getDaysRemaining(goal.deadline);
    
    if (progress >= 100) {
      return { text: 'Completed', class: 'bg-success', icon: CheckCircle };
    } else if (daysRemaining < 0) {
      return { text: 'Overdue', class: 'bg-danger', icon: Clock };
    } else if (daysRemaining <= 30) {
      return { text: 'Due Soon', class: 'bg-warning', icon: Clock };
    } else {
      return { text: 'On Track', class: 'bg-primary', icon: TrendingUp };
    }
  };

  return (
    <>
      {/* Bootstrap CSS */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      
      <div className="d-flex" style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', minHeight: '100vh'}}>
        
        {/* Use the Sidetag component */}
        <Sidetag 
          sidebarCollapsed={sidebarCollapsed} 
          setSidebarCollapsed={setSidebarCollapsed} 
          activeMenuItem={activeMenuItem} 
          setActiveMenuItem={setActiveMenuItem} 
        />

        {/* Main Content Area */}
        <div 
          className="flex-grow-1"
          style={{
            marginLeft: sidebarCollapsed ? '80px' : '250px',
            transition: 'margin-left 0.3s ease'
          }}
        >
          {/* Use the HeaderNav component */}
          <HeaderNav />

          {/* Page Content */}
          <div className="bg-light min-vh-100">
            {/* Page Header */}
            <section className="bg-white border-bottom">
              <div className="container-fluid py-4">
                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                  <div>
                    <h2 className="h3 fw-bold text-dark mb-2">Financial Goals</h2>
                    <p className="text-muted mb-0">Set, track, and achieve your financial objectives</p>
                  </div>
                  
                  <div className="d-flex gap-2 mt-3 mt-md-0">
                    <div className="d-flex align-items-center gap-3">
                      <div className="text-center">
                        <div className="fw-bold text-primary">{goals.length}</div>
                        <small className="text-muted">Total Goals</small>
                      </div>
                      <div className="text-center">
                        <div className="fw-bold text-success">{goals.filter(g => calculateProgress(g.currentAmount, g.targetAmount) >= 100).length}</div>
                        <small className="text-muted">Completed</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="container-fluid py-4">
              {/* Goal Form */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-primary text-white">
                      <div className="d-flex align-items-center gap-2">
                        <Plus size={20} />
                        <h5 className="card-title mb-0 fw-semibold">
                          {editingGoal ? 'Edit Goal' : 'Create New Goal'}
                        </h5>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label className="form-label fw-medium">Goal Name *</label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g., Emergency Fund"
                          />
                        </div>
                        
                        <div className="col-md-3">
                          <label className="form-label fw-medium">Target Amount *</label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light">R</span>
                            <input
                              type="number"
                              className="form-control"
                              name="targetAmount"
                              value={formData.targetAmount}
                              onChange={handleInputChange}
                              placeholder="0"
                              min="1"
                            />
                          </div>
                        </div>
                        
                        <div className="col-md-3">
                          <label className="form-label fw-medium">Deadline *</label>
                          <input
                            type="date"
                            className="form-control form-control-lg"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="col-md-2">
                          <label className="form-label fw-medium">Category</label>
                          <select
                            className="form-select form-select-lg"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                          >
                            {categories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="d-flex gap-2 mt-4">
                        <button 
                          onClick={handleSubmit}
                          className="btn btn-primary btn-lg d-flex align-items-center gap-2"
                        >
                          <Save size={18} />
                          {editingGoal ? 'Update Goal' : 'Create Goal'}
                        </button>
                        {editingGoal && (
                          <button
                            onClick={handleCancelEdit}
                            className="btn btn-outline-secondary btn-lg d-flex align-items-center gap-2"
                          >
                            <X size={18} />
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Goals List */}
              <div className="row">
                <div className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-0">
                      <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title fw-semibold mb-0 d-flex align-items-center gap-2">
                          <Target size={20} />
                          Your Goals
                        </h5>
                        <small className="text-muted">{goals.length} goal{goals.length !== 1 ? 's' : ''} total</small>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      {goals.length === 0 ? (
                        <div className="text-center py-5">
                          <Target size={48} className="text-muted opacity-50 mb-3" />
                          <h6 className="fw-medium mb-2">No Goals Yet</h6>
                          <p className="text-muted mb-0">Create your first financial goal to get started on your journey.</p>
                        </div>
                      ) : (
                        <div className="list-group list-group-flush">
                          {goals.map((goal, index) => {
                            const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
                            const daysRemaining = getDaysRemaining(goal.deadline);
                            const status = getStatusBadge(goal);
                            const StatusIcon = status.icon;
                            
                            return (
                              <div key={goal.id} className="list-group-item border-0 p-4">
                                <div className="row align-items-center">
                                  <div className="col-lg-4">
                                    <div className="d-flex align-items-center gap-3">
                                      <div className="bg-primary bg-opacity-10 p-2 rounded">
                                        <Target className="text-primary" size={20} />
                                      </div>
                                      <div>
                                        <h6 className="fw-semibold mb-1">{goal.name}</h6>
                                        <div className="d-flex align-items-center gap-2">
                                          <span className={`badge ${status.class} d-flex align-items-center gap-1`}>
                                            <StatusIcon size={12} />
                                            {status.text}
                                          </span>
                                          <small className="text-muted">{goal.category}</small>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="col-lg-4 mt-3 mt-lg-0">
                                    <div className="mb-2">
                                      <div className="d-flex justify-content-between align-items-center mb-1">
                                        <small className="text-muted">Progress</small>
                                        <small className="fw-medium">{progress.toFixed(1)}%</small>
                                      </div>
                                      <div className="progress" style={{height: '8px'}}>
                                        <div 
                                          className={`progress-bar ${progress >= 100 ? 'bg-success' : 'bg-primary'}`}
                                          style={{width: `${Math.min(progress, 100)}%`}}
                                        ></div>
                                      </div>
                                    </div>
                                    <div className="d-flex justify-content-between text-sm">
                                      <div>
                                        <input
                                          type="number"
                                          className="form-control form-control-sm"
                                          style={{width: '120px', display: 'inline-block'}}
                                          value={goal.currentAmount}
                                          onChange={(e) => updateGoalProgress(goal.id, e.target.value)}
                                          min="0"
                                          max={goal.targetAmount}
                                        />
                                      </div>
                                      <small className="text-muted align-self-center">of {formatCurrency(goal.targetAmount)}</small>
                                    </div>
                                  </div>
                                  
                                  <div className="col-lg-2 mt-3 mt-lg-0 text-center">
                                    <div className="d-flex align-items-center gap-1 justify-content-center mb-1">
                                      <Calendar size={14} className="text-muted" />
                                      <small className="text-muted">{formatDate(goal.deadline)}</small>
                                    </div>
                                    <small className={`fw-medium ${daysRemaining < 0 ? 'text-danger' : daysRemaining <= 30 ? 'text-warning' : 'text-success'}`}>
                                      {daysRemaining < 0 
                                        ? `${Math.abs(daysRemaining)} days overdue`
                                        : `${daysRemaining} days left`
                                      }
                                    </small>
                                  </div>
                                  
                                  <div className="col-lg-2 mt-3 mt-lg-0">
                                    <div className="d-flex gap-2 justify-content-end">
                                      <button
                                        onClick={() => handleEdit(goal)}
                                        className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                                      >
                                        <Edit2 size={14} />
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => handleDelete(goal.id)}
                                        className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                                      >
                                        <Trash2 size={14} />
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalTrackerPage;