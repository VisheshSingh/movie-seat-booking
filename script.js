const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieList = document.getElementById('movie');
const count = document.getElementById('count');
const totalPrice = document.getElementById('total');

let price = +movieList.value;

function selectedMovie(movieIndex, price) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', price);
}

movieList.addEventListener('change', e => {
  price = +e.target.value;
  selectedMovie(e.target.selectedIndex, e.target.value);
  updateSelectedPrice();
});

function updateSelectedPrice() {
  const selectedSeats = container.querySelectorAll('.seat.selected');
  const totalSeats = selectedSeats.length;

  const selectedIndex = [...selectedSeats].map(seat =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem('selectedIndex', JSON.stringify(selectedIndex));
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
