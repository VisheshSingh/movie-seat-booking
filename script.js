const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieList = document.getElementById('movie');
const count = document.getElementById('count');
const totalPrice = document.getElementById('total');

let price = +movieList.value;

populateUI();

function setMovieData(movieIndex, price) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', price);
}

function updateSelectedCount() {
  const selectedSeats = container.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatCount = selectedSeats.length;
  console.log(price);
  count.innerText = selectedSeatCount;
  totalPrice.innerText = price * selectedSeatCount;
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats.length > 0 && selectedSeats !== null) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieList.selectedIndex = selectedMovieIndex;
  }
}

movieList.addEventListener('change', e => {
  price = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

updateSelectedCount();
