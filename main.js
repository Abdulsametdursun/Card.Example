//! HTML'den gelenler
const addBtn = document.getElementById("add-btn");
const priceInp = document.getElementById("price-inp");
const titleInp = document.querySelector("#title-inp");
const checkbox = document.querySelector("#checked");
const list = document.querySelector("#list");
const totalSpan = document.querySelector("#price-info");
const select = document.querySelector("select");
const userInp = document.querySelector("#user-inp");

//! Olay Izleyici
addBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleUpdate);
select.addEventListener("change", handleFilter);
userInp.addEventListener("change", saveUser);
document.addEventListener("DOMContentLoaded", getUser);

// toplam fiyat bilgisi
let totalPrice = 0;

function updateTotal(price) {
  totalPrice += price;

  totalSpan.innerText = totalPrice;
}

//! Fonksiyonlar
function addExpense(event) {
  event.preventDefault();

  const title = titleInp.value;
  const price = priceInp.valueAsNumber;

  //! Kosullar
  if (!title | !price) {
    alert("Lutfen formu doldurunuz");
    return;
  }
  //div olusturma
  const expenseDiv = document.createElement("div");
  //class ekleme
  expenseDiv.classList.add("expense");

  if (checkbox.checked === true) {
    expenseDiv.classList.add("paid");
  }

  //div'in icerigini belirleme
  expenseDiv.innerHTML = `
          <h2 id="title">${title}</h2>
          <h2 id="price">${price}</h2>
          <div class="btns">
            <i id="update"class="bi bi-cash-coin"></i>
            <i id="delete"class="bi bi-trash-fill"></i>
          </div>
  `;

  //olusan karti html'e gonderme
  list.appendChild(expenseDiv);

  updateTotal(price);

  titleInp.value = "";
  priceInp.value = "";
  checkbox.checked = false;
}

// harcamayi siler / gunceller
function handleUpdate(event) {
  const ele = event.target;

  const parent = ele.parentElement.parentElement;

  if (ele.id === "delete") {
    const price = Number(parent.children[1].innerText);

    updateTotal(-price);

    parent.remove();
  }
  if ((ele.id = "update")) {
    parent.classList.toggle("paid");
  }
}

//listeyi filtreler
function handleFilter(event) {
  const selected = event.target.value;
  const items = list.childNodes;

  items.forEach((item) => {
    switch (selected) {
      case "all":
        //console.log("hepsi secildi");
        item.style.display = "flex";
        break;
      case "paid":
        //console.log("odenenler secildi");
        if (item.classList.contains("paid")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "not-paid":
        //console.log("odenmeyenler secildi");
        if (!item.classList.contains("paid")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
  // secilen degere gore yapilacak isleme karar vermek
}

//kullaniciyi kaydet
function saveUser(event) {
  localStorage.setItem("username", event.target.value);
}

//kullaniciyi localden alip inputa yazdir
function getUser() {
  const username = localStorage.getItem("username") || "";
  userInp.value = username;
}
