export let isTrailerPlayed: boolean;

export function playTrailer() {
  isTrailerPlayed = true;
  window.onscroll = function () {
    // disable window scroll
    window.scrollTo(
      window.pageYOffset || document.documentElement.scrollTop,
      window.pageXOffset || document.documentElement.scrollLeft
    );
  };
}

export function closeTrailer() {
  isTrailerPlayed = false;
  window.onscroll = function () {}; // undisable window scroll
}
