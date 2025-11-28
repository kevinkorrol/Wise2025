package database

import (
	"errors"
	"github.com/kevinkorrol/Wise2025/pkg/component/currency"
	"github.com/kevinkorrol/Wise2025/pkg/component/transaction"
	"github.com/kevinkorrol/Wise2025/pkg/component/user"
	"time"
)

type InMemoryDB struct {
	transactions []*transaction.Transaction
	users        []*user.User
	batches      []*transaction.Batch
}

func NewInMemoryDB() *InMemoryDB {
	db := &InMemoryDB{
		transactions: make([]*transaction.Transaction, 0),
		users:        make([]*user.User, 0),
		batches:      make([]*transaction.Batch, 0),
	}

	return db
}

func (db *InMemoryDB) AddUser(u *user.User) error {
	db.users = append(db.users, u)
	return nil
}

func (db *InMemoryDB) GetUserByID(ID uint64) (*user.User, error) {
	for _, u := range db.users {
		if u.ID == ID {
			return u, nil
		}
	}
	return nil, nil
}

func (db *InMemoryDB) AddTransaction(transaction *transaction.Transaction) error {
	db.transactions = append(db.transactions, transaction)
	return nil
}

func (db *InMemoryDB) GetTransactionByID(transactionID uint64) (*transaction.Transaction, error) {
	for _, t := range db.transactions {
		if t.ID == transactionID {
			return t, nil
		}
	}
	return nil, nil
}

func (db *InMemoryDB) GetUserTransactionsByID(userID uint64) ([]*transaction.Transaction, error) {
	var transactions []*transaction.Transaction
	for _, t := range db.transactions {
		if t.Owner.ID == userID {
			transactions = append(transactions, t)
		}
	}

	return transactions, nil
}

func (db *InMemoryDB) RemoveTransactionByID(transactionID uint64) error {
	b, err := db.GetBatchTransactionIsPartOfByID(transactionID)
	if err != nil {
		return err
	}

	if b != nil {
		err = db.RemoveTransactionFromBatchByID(b.ID, transactionID)
		if err != nil {
			return err
		}
	}

	for idx, t := range db.transactions {
		if t.ID == transactionID {
			db.transactions = remove(db.transactions, idx)
		}
	}

	return nil
}

func (db *InMemoryDB) CompleteTransactionByID(transactionID uint64) error {
	t, err := db.GetTransactionByID(transactionID)
	if err != nil {
		return err
	}

	if t == nil {
		return errors.New("unknown transaction ID")
	}

	b, err := db.GetBatchTransactionIsPartOfByID(transactionID)
	if err != nil {
		return err
	}

	if b != nil {
		err = db.RemoveTransactionFromBatchByID(b.ID, transactionID)
		if err != nil {
			return err
		}
	}

	t.Completed = true
	return nil
}

func (db *InMemoryDB) AddBatchTransaction(batch *transaction.Batch) error {
	db.batches = append(db.batches, batch)
	return nil
}

func (db *InMemoryDB) GetBatchTransactionByID(batchID uint64) (*transaction.Batch, error) {
	for _, b := range db.batches {
		if b.ID == batchID {
			return b, nil
		}
	}

	return nil, nil
}

func (db *InMemoryDB) AddTransactionToBatchByID(batchID, transactionID uint64) error {
	b, err := db.GetBatchTransactionByID(batchID)
	if err != nil {
		return err
	}
	t, err := db.GetTransactionByID(transactionID)
	if err != nil {
		return err
	}

	b.Transactions = append(b.Transactions, t)
	return nil
}

func (db *InMemoryDB) RemoveTransactionFromBatchByID(batchID, transactionID uint64) error {
	b, err := db.GetBatchTransactionByID(batchID)
	if err != nil {
		return err
	}

	for idx, t := range b.Transactions {
		if t.ID == transactionID {
			b.Transactions = remove(b.Transactions, idx)
			break
		}
	}
	return nil
}

func (db *InMemoryDB) GetBatchTransactionIsPartOfByID(transactionID uint64) (*transaction.Batch, error) {
	for _, b := range db.batches {
		for _, t := range b.Transactions {
			if t.ID == transactionID {
				return b, nil
			}
		}
	}

	return nil, nil
}

func (db *InMemoryDB) GetExistingBatchTransactionForCurrency(fromCurrency, toCurrency currency.Currency) (*transaction.Batch, error) {
	for _, b := range db.batches {
		if b.CompleteTime.Compare(b.StartTime) == 1 || b.IsFull() {
			continue // batch is complete
		}
		if b.MinimumAmount.Currency == fromCurrency && b.TargetCurrency == toCurrency {
			return b, nil
		}
	}
	return nil, nil
}

func (db *InMemoryDB) CompleteBatch(batchID uint64, completeTime time.Time) error {
	b, err := db.GetBatchTransactionByID(batchID)
	if err != nil {
		return err
	}

	b.CompleteTime = completeTime
	for _, t := range b.Transactions {
		t.Completed = true
	}
	return nil
}

func (db *InMemoryDB) GetBatches() ([]*transaction.Batch, error) {
	return db.batches, nil
}

func remove[T any](slice []T, s int) []T {
	return append(slice[:s], slice[s+1:]...)
}
