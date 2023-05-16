import React from 'react';
import ExpenseItem from './ExpenseItem';
import {MdDelete} from 'react-icons/md'

const ExpenseList = ({expenses, setExpenses, handleDelete, handleEdit}) => {
  return (
    <>
       <ul className='list'>
          {expenses.map(expense => {
             return <ExpenseItem 
                        handleDelete={handleDelete} 
                        handleEdit={handleEdit} 
                        expense={expense} 
                        key={expense.id} />
          })}   
       </ul>
       {expenses.length > 0 && (<button className='btn' onClick={() => setExpenses([])}>
        clear expenses
        <MdDelete className='btn-icon' />
        </button>)}
    </>
  )
}

export default ExpenseList

