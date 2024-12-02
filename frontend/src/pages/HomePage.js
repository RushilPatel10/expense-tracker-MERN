import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { Form, Input, message, Modal, Select, Table, DatePicker } from 'antd'
import axios from 'axios'
import Spinner from '../components/Spinner'
import moment from 'moment'

axios.defaults.baseURL = 'http://localhost:8080';

const { RangePicker } = DatePicker;

const HomePage = () => {
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [frequency, setFrequency] = useState('7')
    const [selectedDate, setSelectedDate] = useState([]);
    const [type, setType] = useState('all')

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text) => <span>{text ? new Date(text).toLocaleDateString() : 'N/A'}</span>
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            render: (text) => <span>₹{text || 0}</span>
        },
        {
            title: 'Type',
            dataIndex: 'type',
            render: (text) => (
                <span className={`badge ${text === 'income' ? 'bg-success' : 'bg-danger'}`}>
                    {text ? text.toUpperCase() : 'N/A'}
                </span>
            )
        },
        {
            title: 'Category',
            dataIndex: 'category',
            render: (text) => <span>{text || 'N/A'}</span>
        },
        {
            title: 'Description',
            dataIndex: 'description',
            render: (text) => <span>{text || 'N/A'}</span>
        },
        {
            title: 'Reference',
            dataIndex: 'refrence',
            render: (text) => <span>{text || 'N/A'}</span>
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
                    userId: user._id
                }

                setLoading(true)

                const res = await axios.post('/api/v1/transection/get-transection', {
                    requestData,
                    type
                })
                // Handle the response data
                const transactionData = Array.isArray(res.data) ? res.data : []

                setTransactions(transactionData)
                setLoading(false)

            } catch (error) {
                console.error('API Error:', error)
                setLoading(false)
                message.error('Failed to fetch transactions')
            }
        }
        getAllTransection()
    }, [type])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        // console.log('Current user:', user)
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
                            <h6>Select type</h6>
                            <Select
                                value={type}
                                onChange={(values) => setType(values)}
                            >
                                <Select.Option value="all">All</Select.Option>
                                <Select.Option value="income">Income</Select.Option>
                                <Select.Option value="expense">Expense</Select.Option>
                            </Select>
                        </div>
                    </div>
                    <div className="transactions-content">
                        <p>Total transactions: {transactions?.length || 0}</p>
                        <Table
                            columns={columns}
                            dataSource={transactions}
                            className="custom-table"
                            rowKey="_id"
                            pagination={{
                                pageSize: 10,
                                position: ['bottomCenter']
                            }}
                            locale={{
                                emptyText: 'No transactions found'
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
