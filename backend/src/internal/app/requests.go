package app

import (
	"github.com/kevinkorrol/Wise2025/pkg/component/currency"
	"github.com/kevinkorrol/Wise2025/pkg/component/transaction"
	"time"
)

// POST /transaction
type MakeTransactionRequest struct {
	UserID          uint64
	Name            string
	Amount          currency.Money
	TargetCurrency  currency.Currency
	TransactionType transaction.TransactionType
}

// DELETE /transaction
type DeleteTransactionRequest struct {
	TransactionID uint64
}

// GET /transaction?user_id=1
type GetTransactionsResponse struct {
	Transactions []*transaction.Transaction
}

// PUT /transaction
type UpdateTransactionRequest struct {
	TransactionID   uint64
	TransactionType transaction.TransactionType
}

// GET /batch
type GetBatchInfoRequest struct {
	ID             uint64
	CurrentAmount  currency.Money
	MinimumAmount  currency.Money
	TargetCurrency currency.Currency
	StartTime      time.Time
}
