if (
  localStorage.getItem("hidePopup") === "true" ||
  document.URL.includes("?hidePopup=true")
) {
  document.documentElement.classList.add("no-blur");
} else {
  document.querySelector("#popup-modal").showModal();
}
