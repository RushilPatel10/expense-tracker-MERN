import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { Form, Input, message, Modal, Select, Table, DatePicker } from 'antd'
import axios from 'axios'
import Spinner from '../components/Spinner'

axios.defaults.baseURL = 'http://localhost:8080';

const { RangePicker } = DatePicker;

const HomePage = () => {
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [frequency, setFrequency] = useState('7')
    const [selectedDate, setSelectedDate] = useState([]);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text) => <span>{new Date(text).toLocaleDateString()}</span>
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            render: (text) => <span>₹{text}</span>
        },
        {
            title: 'Type',
            dataIndex: 'type',
            render: (text) => (
                <span className={`badge ${text === 'income' ? 'bg-success' : 'bg-danger'}`}>
                    {text.toUpperCase()}
                </span>
            )
        },
        { title: 'Category', dataIndex: 'category' },
        { title: 'Description', dataIndex: 'description' },
        { title: 'Reference', dataIndex: 'refrence' },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
                <div className="d-flex">
                    <button className="btn btn-sm btn-danger">Delete</button>
                </div>
            )
        }
    ]

    const handleDateChange = (dates) => {
        setSelectedDate(dates);
        setFrequency('custom');
    };

    useEffect(() => {
        const getAllTransection = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                if (!user || !user._id) {
                    message.error('User not found, please login again')
                    return
                }

                const requestData = {
                    userId: user._id,
                    frequency,
                    ...(frequency === 'custom' && selectedDate.length === 2 && {
                        startDate: selectedDate[0].format('YYYY-MM-DD'),
                        endDate: selectedDate[1].format('YYYY-MM-DD')
                    })
                }
                console.log('Request payload:', requestData)

                setLoading(true)
                const res = await axios.post('/api/v1/transection/get-transection', requestData)
                console.log('Raw API Response:', res)
                console.log('Transaction data:', res.data)
                setLoading(false)
                setTransactions(res.data)

            } catch (error) {
                console.error('Detailed API Error:', {
                    message: error.message,
                    response: error.response,
                    request: error.request
                })
                setLoading(false)
                message.error('Failed to fetch transactions: ' + error.message)
            }
        }
        getAllTransection()
    }, [frequency, selectedDate])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log('Current user:', user)
    }, [])

    const handleSubmit = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            setLoading(true)
            await axios.post('http://localhost:8080/api/v1/transection/add-transection', { ...values, userId: user._id })
            setLoading(false)
            message.success('Transection created successfully')
            setShowModal(false)
        } catch (error) {
            setLoading(false)
            message.error('Failed to add transaction: ' + error.message)
        }
    }
    return (
        <Layout>
            {loading && <Spinner />}
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
                    <div className='filters'>
                        <div>
                            <h6>Select Frequency</h6>
                            <Select 
                                value={frequency} 
                                onChange={(value) => {
                                    setFrequency(value)
                                    if (value !== 'custom') {
                                        setSelectedDate([])
                                    }
                                }}
                            >
                                <Select.Option value="7">Last 1 week</Select.Option>
                                <Select.Option value="30">Last 1 month</Select.Option>
                                <Select.Option value="365">Last 1 year</Select.Option>
                                <Select.Option value="custom">Custom Range</Select.Option>
                            </Select>
                        </div>
                        
                        {frequency === 'custom' && (
                            <div className="custom-date-range">
                                <h6>Select Date Range</h6>
                                <RangePicker 
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    format="YYYY-MM-DD"
                                />
                            </div>
                        )}
                    </div>
                    <div className="transactions-content">
                        <Table
                            columns={columns}
                            dataSource={transactions}
                            className="custom-table"
                            rowKey="_id"
                            pagination={{
                                pageSize: 10,
                                position: ['bottomCenter']
                            }}
                        />
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
                            placeholder="Add a Description note"
                            rows={3}
                        />
                    </Form.Item>

                    <Form.Item
                        name="refrence"
                        label="Refrence"
                    >
                        <Input.TextArea
                            placeholder="Add a reference note"
                            rows={2}
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
