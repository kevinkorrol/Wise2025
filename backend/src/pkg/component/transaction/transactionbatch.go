package transaction

import (
	"github.com/kevinkorrol/Wise2025/pkg/component/currency"
	"time"
)

type Batch struct {
	ID                 uint64
	Transactions       []*Transaction
	MinimumAmount      currency.Money
	TransferCurrencies *TransferCurrencies
	StartTime          time.Time
}

type CompletedBatch struct {
	Batch        *Batch
	CompleteTime time.Time
}
