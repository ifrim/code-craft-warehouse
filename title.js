class Title {
  constructor(title, artist) {
    this.title = title;
    this.artist = artist;
    this.reviews = [];
  }

  addReview(review) {
    this.reviews.push(review);
  }

  getTotalReviews() {
    return this.reviews.length;
  }
}

export default Title;