package database

import (
	"github.com/kevinkorrol/Wise2025/pkg/component/transaction"
	"github.com/kevinkorrol/Wise2025/pkg/component/user"
)

type Database interface {
	AddUser(user *user.User) error
	GetUserByPassword(password *user.HashedPassword) (*user.User, error)

	AddTransaction(transaction *transaction.Transaction) error
	GetUserTransactionsByID(userID uint64) ([]*transaction.Transaction, error)
	RemoveTransactionByID(transactionID uint64) error

	AddTransactionToBatchByID(batchID, transactionID uint64) error
	RemoveTransactionFromBatchByID(batchID, transactionID uint64) error
	GetBatchTransactionByID(batchID uint64) (*transaction.Batch, error)
	GetBatchTransactionIsPartOfByID(transactionID uint64) (*transaction.Batch, error)

	AddCompletedBatch(batch *transaction.CompletedBatch) error
	GetAllCompletedBatches() ([]*transaction.CompletedBatch, error)
}
