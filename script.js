const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieList = document.getElementById('movie');
const count = document.getElementById('count');
const totalPrice = document.getElementById('total');

let price = +movieList.value;

movieList.addEventListener('change', e => {
  price = +e.target.value;
  updateSelectedPrice();
});

function updateSelectedPrice() {
  const selectedSeats = container.querySelectorAll('.seat.selected');
  const totalSeats = selectedSeats.length;

  count.innerText = totalSeats;
  totalPrice.innerText = price * totalSeats;
}

container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedPrice();
  }
});
