import { ratingStarsContainer, ratingStars } from "./shared-dom-refs.js";

const handleRatingStarEvents = (event) => {
  // Event listeners are added below
  if (!event.target.classList.contains("rating-star")) {
    return;
  }

  const eventType = event.type;
  const starValue = Number(event.target.dataset.ratingValue);

  if (eventType === "mouseover") {
    ratingStars.forEach((star) => {
      const currentStarValue = Number(star.dataset.ratingValue);
      if (currentStarValue <= starValue) {
        star.setAttribute("name", "star");
      }
    });
  } else if (eventType === "mouseout") {
    ratingStars.forEach((star) => {
      if (!star.classList.contains("selected")) {
        star.setAttribute("name", "star-outline");
      }
    });
  } else if (eventType === "click") {
    ratingStars.forEach((star) => {
      const currentStarValue = Number(star.dataset.ratingValue);
      if (currentStarValue <= starValue) {
        star.setAttribute("name", "star");
        star.classList.add("selected");
      } else {
        star.setAttribute("name", "star-outline");
        star.classList.remove("selected");
      }
    });
  }
};

ratingStarsContainer.addEventListener("mouseover", handleRatingStarEvents);

ratingStarsContainer.addEventListener("mouseout", handleRatingStarEvents);

ratingStarsContainer.addEventListener("click", handleRatingStarEvents);
