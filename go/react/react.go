package react

import "fmt"

type ReactorContext struct{}

type CellContext struct {
	value         int
	preValue      int
	computedCells []*CellContext // cells which will computed base on this cell
	computeFunc   func() int
	callback      []*CellCallback
}

type CellCallback struct {
	cb   func(int)
	cell *CellContext
}

func (c *CellContext) Value() int {
	return c.value
}

func updateComputedValue(c *CellContext) {
	for _, cell := range c.computedCells {
		cell.preValue = cell.value
		cell.value = cell.computeFunc()
	}
	// breadth first for computed cells
	for _, cell := range c.computedCells {
		updateComputedValue(cell)
	}
}

func triggerCallback(c *CellContext) {
	if c.preValue != c.value {
		c.preValue = c.value
		for _, cb := range c.callback {
			cb.cb(c.value)
		}
	}

	for _, cell := range c.computedCells {
		triggerCallback(cell)
	}
}

func (c *CellContext) SetValue(v int) {
	c.preValue = c.value
	c.value = v
	updateComputedValue(c)
	triggerCallback(c)
}

func (c *CellContext) AddCallback(cb func(int)) Canceler {
	cellCb := CellCallback{cb, c}
	c.callback = append(c.callback, &cellCb)
	return Canceler(&cellCb)
}

func (cellCb *CellCallback) Cancel() {
	idx := -1
	cbLen := len(cellCb.cell.callback)
	if cbLen <= 0 {
		fmt.Println("callback is empty")
		return
	}
	for i, cb := range cellCb.cell.callback {
		if cb == cellCb {
			idx = i
			break
		}
	}
	if idx < 0 {
		fmt.Println("callback do not exist")
		return
	}
	cellCb.cell.callback[idx] = cellCb.cell.callback[cbLen-1]
	cellCb.cell.callback = cellCb.cell.callback[:cbLen-1]
}

func New() Reactor {
	return &ReactorContext{}
}

func (r *ReactorContext) CreateInput(v int) InputCell {
	ci := CellContext{}
	ci.value = v
	ci.preValue = ci.value
	return &ci
}

func (r *ReactorContext) CreateCompute1(c Cell, computeFunc func(int) int) ComputeCell {
	f := func() int {
		return computeFunc(c.Value())
	}
	newCi := CellContext{}
	newCi.computeFunc = f
	newCi.value = f()
	newCi.preValue = newCi.value
	inputCell := c.(*CellContext)
	inputCell.computedCells = append(inputCell.computedCells, &newCi)
	return &newCi
}

func (r *ReactorContext) CreateCompute2(c1 Cell, c2 Cell, computeFunc func(int, int) int) ComputeCell {
	f := func() int {
		return computeFunc(c1.Value(), c2.Value())
	}
	newCi := CellContext{}
	newCi.computeFunc = f
	newCi.value = f()
	newCi.preValue = newCi.value
	inputCell1 := c1.(*CellContext)
	inputCell2 := c2.(*CellContext)
	inputCell1.computedCells = append(inputCell1.computedCells, &newCi)
	inputCell2.computedCells = append(inputCell2.computedCells, &newCi)
	return &newCi
}
