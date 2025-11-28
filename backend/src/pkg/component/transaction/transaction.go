package transaction

import (
	"github.com/kevinkorrol/Wise2025/pkg/component/currency"
	"github.com/kevinkorrol/Wise2025/pkg/component/user"
	"time"
)

type Transaction struct {
	ID             uint64
	Name           string
	Owner          *user.User
	Amount         currency.Money
	Type           TransactionType
	TargetCurrency currency.Currency
	Timestamp      time.Time
	Completed      bool
}
