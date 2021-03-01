import React from 'react'

export default function FilterBtns() {
    return (
        <div className="filterBtns">
  <div className="orderArea">
    <input type="radio" name="order" id="normal" defaultChecked />
    <label htmlFor="normal">normal</label>
    <input type="radio" name="order" id="reverse" />
    <label htmlFor="reverse">reverse</label>
  </div>
  <div className="completenessArea">
    <input type="radio" name="completeness" id="all" defaultChecked />
    <label htmlFor="all">all</label>
    <input type="radio" name="completeness" id="true" />
    <label htmlFor="true">done</label>
    <input type="radio" name="completeness" id="false" />
    <label htmlFor="false">undone</label>
  </div>
</div>

    )
}
