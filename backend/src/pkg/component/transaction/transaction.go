package transaction

import (
	"github.com/kevinkorrol/Wise2025/pkg/component/currency"
	"github.com/kevinkorrol/Wise2025/pkg/component/user"
	"time"
)

type TransferCurrencies struct {
	SourceCurrency      currency.Currency
	DestinationCurrency currency.Currency
}
type Transaction struct {
	ID                 uint64
	Owner              *user.User
	MinimumAmount      currency.Money
	TransferCurrencies *TransferCurrencies
	Timestamp          time.Time
}
