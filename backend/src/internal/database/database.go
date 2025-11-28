package database

import (
	"github.com/kevinkorrol/Wise2025/pkg/component/currency"
	"github.com/kevinkorrol/Wise2025/pkg/component/transaction"
	"github.com/kevinkorrol/Wise2025/pkg/component/user"
	"time"
)

type Database interface {
	AddUser(u *user.User) error
	GetUserByID(ID uint64) (*user.User, error)

	AddTransaction(transaction *transaction.Transaction) error
	GetTransactionByID(transactionID uint64) (*transaction.Transaction, error)
	GetUserTransactionsByID(userID uint64) ([]*transaction.Transaction, error)
	RemoveTransactionByID(transactionID uint64) error
	CompleteTransactionByID(transactionID uint64) error

	AddBatchTransaction(batch *transaction.Batch) error
	GetBatchTransactionByID(batchID uint64) (*transaction.Batch, error)
	AddTransactionToBatchByID(batchID, transactionID uint64) error
	RemoveTransactionFromBatchByID(batchID, transactionID uint64) error
	GetBatchTransactionIsPartOfByID(transactionID uint64) (*transaction.Batch, error)
	GetExistingBatchTransactionForCurrency(fromCurrency, toCurrency currency.Currency) (*transaction.Batch, error)
	CompleteBatch(batchID uint64, completeTime time.Time) error
	GetBatches() ([]*transaction.Batch, error)
}
