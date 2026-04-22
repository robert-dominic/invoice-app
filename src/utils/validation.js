export function validateInvoice(form) {
  const e = {};

  if (!form.billFrom.street) e.billFromStreet = "can't be empty";
  if (!form.billFrom.city) e.billFromCity = "can't be empty";
  if (!form.billFrom.postCode) e.billFromPostCode = "can't be empty";
  if (!form.billFrom.country) e.billFromCountry = "can't be empty";

  if (!form.clientName) e.clientName = "can't be empty";
  if (!form.clientEmail) e.clientEmail = "can't be empty";
  else if (!/\S+@\S+\.\S+/.test(form.clientEmail)) e.clientEmail = "invalid email";

  if (!form.billTo.street) e.billToStreet = "can't be empty";
  if (!form.billTo.city) e.billToCity = "can't be empty";
  if (!form.billTo.postCode) e.billToPostCode = "can't be empty";
  if (!form.billTo.country) e.billToCountry = "can't be empty";

  if (!form.description) e.description = "can't be empty";

  if (form.items.length === 0) e.items = "An item must be added";

  form.items.forEach((item, i) => {
    if (!item.name) e[`itemName${i}`] = "can't be empty";
    if (item.quantity <= 0) e[`itemQty${i}`] = "invalid";
    if (item.price <= 0) e[`itemPrice${i}`] = "invalid";
  });

  return e;
}