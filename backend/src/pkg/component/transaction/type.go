package transaction

type TransactionType int

const (
	TypeRegular TransactionType = iota
	TypeBatch
	TypeFastTrack
)
