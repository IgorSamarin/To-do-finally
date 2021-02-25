const orderButtons = [...document.querySelectorAll("input[name=order]")];

const completenessButtons = [
  ...document.querySelectorAll("input[name=completeness]"),
];

[...orderButtons, ...completenessButtons].forEach((button) => {
  button.addEventListener("click", () => {
    if (button.name === "order") {
      if (orderButtons.indexOf(button) === orderButtons.length - 1) {
        clearAll(orderButtons);
        orderButtons[0].checked = true;
      } else {
        clearAll(orderButtons);
        orderButtons[orderButtons.indexOf(button) + 1].checked = true;
      }
    }
    if (button.name === "completeness") {
      if (
        completenessButtons.indexOf(button) ===
        completenessButtons.length - 1
      ) {
        clearAll(completenessButtons);
        completenessButtons[0].checked = true;
      } else {
        clearAll(completenessButtons);
        completenessButtons[
          completenessButtons.indexOf(button) + 1
        ].checked = true;
      }
    }
    checkFilters();
  });
});

const clearAll = (array) => {
  array.forEach((element) => {
    element.checked = false;
  });
};

const checkFilters = () => {
  let filters = {};
  [...orderButtons, ...completenessButtons].forEach((button) => {
    if (button.checked) {
      filters[button.name] = button.id;
    }
  });
  GetItems(filters);
};

checkFilters()