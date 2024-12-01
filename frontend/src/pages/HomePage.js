import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Form, Input, Modal, Select } from 'antd'

const HomePage = () => {
    const [showModal, setShowModal] = useState(false)
    const handleSubmit = (values) => {
        console.log(values)
    }
    return (
        <Layout>
            <div className="home-container">
                <div className="dashboard-header">
                    <h2>Financial Dashboard</h2>
                    <button
                        className="add-button"
                        onClick={() => setShowModal(true)}
                    >
                        <i className="fas fa-plus"></i>
                        Add Transaction
                    </button>
                </div>

                <div className="analytics-cards">
                    <div className="stat-card income">
                        <div className="stat-icon">
                            <i className="fas fa-arrow-down"></i>
                        </div>
                        <div className="stat-details">
                            <h3>Total Income</h3>
                            <p>₹2,500.00</p>
                        </div>
                    </div>

                    <div className="stat-card expense">
                        <div className="stat-icon">
                            <i className="fas fa-arrow-up"></i>
                        </div>
                        <div className="stat-details">
                            <h3>Total Expense</h3>
                            <p>₹1,800.00</p>
                        </div>
                    </div>
                </div>

                <div className="transactions-section">
                    <h3>Recent Transactions</h3>
                    <div className="transactions-content">
                        {/* Your transactions list will go here */}
                    </div>
                </div>
            </div>

            <Modal
                title={
                    <div className="modal-title">
                        <i className="fas fa-plus-circle"></i>
                        <span>Add New Transaction</span>
                    </div>
                }
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={null}
                className="transaction-modal"
            >
                <Form layout="vertical" onFinish={handleSubmit} className="transaction-form">
                    <Form.Item
                        name="amount"
                        label="Amount"
                        rules={[{ required: true, message: 'Please enter amount' }]}
                    >
                        <Input
                            prefix={<i className="fas fa-rupee-sign"></i>}
                            type="number"
                            placeholder="Enter amount"
                        />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[{ required: true, message: 'Please select type' }]}
                    >
                        <Select placeholder="Select type">
                            <Select.Option value="income">
                                <i className="fas fa-arrow-down"></i> Income
                            </Select.Option>
                            <Select.Option value="expense">
                                <i className="fas fa-arrow-up"></i> Expense
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please select category' }]}
                    >
                        <Select placeholder="Select category">
                            <Select.Option value="salary"><i className="fas fa-briefcase"></i> Salary</Select.Option>
                            <Select.Option value="tip"><i className="fas fa-gift"></i> Tip</Select.Option>
                            <Select.Option value="project"><i className="fas fa-laptop-code"></i> Project</Select.Option>
                            <Select.Option value="movie"><i className="fas fa-film"></i> Movie</Select.Option>
                            <Select.Option value="bills"><i className="fas fa-file-invoice"></i> Bills</Select.Option>
                            <Select.Option value="medical"><i className="fas fa-hospital"></i> Medical</Select.Option>
                            <Select.Option value="fees"><i className="fas fa-university"></i> Fees</Select.Option>
                            <Select.Option value="tax"><i className="fas fa-receipt"></i> Tax</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[{ required: true, message: 'Please select date' }]}
                    >
                        <Input
                            type="date"
                            prefix={<i className="fas fa-calendar"></i>}
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input.TextArea
                            placeholder="Add a reference note"
                            rows={3}
                        />
                    </Form.Item>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="submit-button">
                            Add Transaction
                        </button>
                    </div>
                </Form>
            </Modal>
        </Layout>
    );

}

export default HomePage
