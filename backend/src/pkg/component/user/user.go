package user

import (
	"github.com/kevinkorrol/Wise2025/pkg/component/country"
	"github.com/kevinkorrol/Wise2025/pkg/component/currency"
)

type User struct {
	ID                 uint64
	Email              string
	FullName           string
	OriginatingCountry country.Country
	AccountCurrencies  []currency.Money
}

type HashedPassword struct {
	User           *User
	Salt           string
	HashedPassword []byte
}
