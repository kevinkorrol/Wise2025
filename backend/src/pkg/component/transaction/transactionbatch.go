package transaction

import (
	"github.com/kevinkorrol/Wise2025/pkg/component/currency"
	"time"
)

func MinimumAmountToTransferForCheaperRate(fromCurrency, toCurrency currency.Currency) (currency.Money, error) {
	money := currency.Money{
		Currency: fromCurrency,
		Sum:      22000.0,
	}
	return money, nil
}

type Batch struct {
	ID             uint64
	Transactions   []*Transaction
	MinimumAmount  currency.Money
	TargetCurrency currency.Currency
	StartTime      time.Time
	CompleteTime   time.Time
}

func (b *Batch) IsFull() bool {

	if b.CurrentSum().Sum >= b.MinimumAmount.Sum {
		return true
	}
	return false
}

func (b *Batch) CurrentSum() currency.Money {
	var sum float64 = 0
	for _, transaction := range b.Transactions {
		sum += transaction.Amount.Sum
	}
	return currency.Money{
		Currency: b.MinimumAmount.Currency,
		Sum:      sum,
	}
}
